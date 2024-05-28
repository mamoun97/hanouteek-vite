import {
    useEffect, useState
    // , useState 
} from 'react'
import { AppDispatch, RootState } from '../Store'
import { useDispatch, useSelector } from 'react-redux'

import OfferApi from '../Api/Offer'
import { Cart, updateCartFull } from '../Store/cartSlice'
// import { Loader } from 'rizzui'
// import { Modal } from 'rizzui'

export default function UpdatePrices() {
    // const [open, setOpen] = useState<ProductCart[] | null>(null);
    const cart = useSelector<RootState>(state => state.cart) as Cart
    const dispatch: AppDispatch = useDispatch();
    const [loading, setLoading] = useState(false)
    const getPrice = (p: ProductCart) => {
        return p.oldPrice ?? p.price
    }
    const updatePrices = () => {
        let c = cart.items.map((el) => {
            return {
                price_total: getPrice(el) * el.qte,
                price_item: getPrice(el),
                qte: el.qte,
                color: el.checkData.color?.value ?? "",
                size: el.checkData.size?.value ?? "",
                product: {
                    id: el.id
                }
            }
        })
        setLoading(true)
        OfferApi.existing(
            {
                data: c
            }
        ).then(res => {
            // validOffer(c,res)
            dispatch(updateCartFull(cart.items.map(el => {
                return {
                    ...el,
                    price: res.find(item => item.product.id == el.id)?.price_item ?? getPrice(el)
                }
            })))
            setLoading(false)
        }).catch(_ => {
            setLoading(false)
        })
    }
    // const validOffer=(oldc:ExistingOfferProps[],newc:ExistingOfferProps[])=>{
    //     // let a=[]
    //     for(let i=0;i!=oldc.length;i++){
    //         if(oldc[i].price_item<newc[i].price_item)
    //             setOpen(cart.items)
    //     }

    // }

    useEffect(() => {
        updatePrices()
    }, [cart.items.length, cart.items.reduce((a, b) => a + b.qte, 0)])

    return <>
        {
            loading && <div className='fixed flex items-center justify-center top-0 left-0 right-0 bottom-0 z-[1000] bg-white/40'>
                {/* <Loader  size='lg' className='w-16 h-16' color='primary'/> */}
            </div>
        }
        {/* <Modal
            isOpen={open != null}
            onClose={() => setOpen(null)}
            overlayClassName="backdrop-blur"
            containerClassName="!max-w-4xl !shadow-2xl"
        >
            <div className="m-auto px-7 pt-6 pb-8">
                <p>
                    Vous avez supprimé l'un des trois produits spécifiés dans notre offre de réduction. Nous vous prévenons que cela signifie que les prix des produits restants reviendront à leurs prix d'origine.
                    Si vous souhaitez profiter de la vente, assurez-vous d'ajouter les trois produits à votre panier.
                </p>
            </div>
        </Modal> */}

    </>
}
