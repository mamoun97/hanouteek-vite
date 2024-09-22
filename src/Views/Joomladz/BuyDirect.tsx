


const data = [
    {
        image: "https://s.alicdn.com/@img/imgextra/i1/O1CN01Lcuxd21Gs6zkRBFHe_!!6000000000677-2-tps-920-920.png",
        title: "Commandez des échantillons"
    },
    {
        image: "https://s.alicdn.com/@img/imgextra/i3/O1CN01blSupV1NpY5ZcwvIj_!!6000000001619-2-tps-920-920.png",
        title: "Visitez des usines en direct"
    },
    {
        image: "https://s.alicdn.com/@img/imgextra/i1/O1CN01twP5Jv1tjCIiCOQAv_!!6000000005937-2-tps-920-920.png",
        title: "Contactez les meilleurs fournisseurs"
    },
    {
        image: "https://s.alicdn.com/@img/imgextra/i4/O1CN01lCkjYn1wPuaaWc8IY_!!6000000006301-0-tps-672-920.jpg",
        title: "Classement des fournisseurs"
    },
]
export default function BuyDirect() {
    return (
        <div className='p-6 py-10'>
            <div className=' flex items-center justify-center flex-col mb-10'>
                <h1 className='text-3xl text-center md:max-w-[80%] font-semibold'>
                    Approvisionnez-vous directement auprès de l'usine

                </h1>

            </div>
            <div className="grid grid-cols-4 gap-6 max-sm:grid-cols-2 max-sm:gap-2 max-[494px]:grid-cols-1 ">
                {
                    data.map((el, k) => {
                        return <div className='relative pt-[140%] rounded-xl overflow-hidden bg-card bg-image' key={k} style={{
                            backgroundImage:"url('"+el.image+"')"
                        }}>
                            <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-b from-black/30 via-transparent to-black/30 p-4 py-6">
                                <h1 className='text-xl font-bold text-white'>{el.title}</h1>
                                <h1 className='text-lg  underline text-white'>Voir plus</h1>
                            </div>
                        </div>

                    })
                }
            </div>
        </div>
    )
}

