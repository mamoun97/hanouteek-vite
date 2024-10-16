import { Link, useLocation } from "react-router-dom";
import Container from "../Container";
import { FiShoppingCart } from "react-icons/fi";
import { MdMenu, MdOutlineFavoriteBorder } from "react-icons/md";
import React, { useEffect, useState } from "react";
import MenuAnimation from "../MenuAnimation";
import IconButton from "../TailwindComponent/IconButton";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Store";
import { Cart, openCart } from "../../Store/cartSlice";
import CartView from "../Cart";
import { ThemeSetting } from "../../Types/ThemeSetting";
import ApiConfig from "../../Api/ApiConfig";
import { useTranslation } from "react-i18next";
import Currency from "../../Constants/Currency";
import NavbarResturant from "./indexResturant";
import LoginButton from "./LoginButton";
import LangButton from "../../Admin/components/LangButton";
import images from "../../assets";

// import { useSelector } from "react-redux";
// import { ThemeSetting } from "../../Types/ThemeSetting";

type LinkOp = {
    text: string,
    src: string,
    image?: string
}
export default function Navbar() {
    const theme = useSelector<ThemeSetting>(state => state.theme) as ThemeSetting
    const location = useLocation()
    const type = (
        theme.theme.templateType == "restaurant" &&
        theme.theme.HomePage.HomePageSections.length &&
        theme.theme.HomePage.HomePageSections[0].type == "slider"
    ) &&
        !ApiConfig.isHanouteek ? "restaurant" : "store";

    return (type == "restaurant" && location.pathname == "/") ? <NavbarResturant slider={theme.theme.HomePage.HomePageSections[0]} /> : <NavbarDefault />
    // return <NavbarDefault/>
}
function NavbarDefault() {
    const { t, i18n } = useTranslation();
    const links = [
        {
            text: t("home"),
            src: "/"
        },
        {
            text: t("categs"),
            src: "/categories"
        },
        // {
        //     text: t("contact"),
        //     src: "#"
        // },
        ...ApiConfig.categPrv&&ApiConfig.isHanouteek?[{
            text: 'Hanouteek Private',
            src: "/private-category/"+ApiConfig.categPrv,
            image: images.hanouteekPrivate
        }]:[],
        {
            text: t("tracking_title"),
            src: "/tracking"
        },

        // {
        //     text: t("product_exchange"),
        //     src: "/order-exchange"
        // },
        ...ApiConfig.isHanouteek?[{
            text: t("our_shops"),
            src: "/our-shops"
        }]:[],
    ]
    // const [openCart, setOpenCart] = useState(false)
    const cart = useSelector<RootState>(state => state.cart) as Cart
    const theme = useSelector<RootState>(state => state.theme) as ThemeSetting

    const dispatch: AppDispatch = useDispatch();
    const getSubTotal = (dt: ProductCart) => {
        return dt.price * dt.qte +
            (dt.checkData.addon?.reduce((a, b) => { return a + b.price * b.qte }, 0) ?? 0)
    }
    const getTotal = () => {
        let s = 0;
        for (let i = 0; i != cart.items.length; i++)
            s += getSubTotal(cart.items[i])
        return s
    }
    const [fixed, setFixed] = useState(false);
    useEffect(() => {
        window.addEventListener("scroll", () => {
            setFixed(window.scrollY > 40)
        })
    }, [])


    const clr = i18n.language != "ar" ? "right-0 translate-x-1/4" : "left-0 -translate-x-1/4"
    return (<>
        <div className={"bg-white border-b border-gray-100 min-h-[98px]  "}>
            <Container className="flex justify-end items-center h-10" onClick={() => {

            }}>

                <div className="flex items-center">
                    {/* <img src={langsicon(i18n?.language ?? images.img_dz)} alt="" className="h-4 max-h-4 min-h-[16px]" /> */}
                    <LangButton />


                </div>
                <div className="grow"></div>
                <IconButton className={"relative "}>
                    {cart.faverites.length ? <div className={clr + " w-5 font-bold h-5 text-[11px] absolute flex items-center justify-center rounded-full top-0  -translate-y-[10%] text-white bg-primary"}>
                        {cart.faverites.length}
                    </div> : ""}
                    <MdOutlineFavoriteBorder className="text-lg" />
                </IconButton>
                {!!cart.faverites.length && <div className="me-2"></div>}
                <span className="text-[13px] uppercase font-semibold">{t("faves")}</span>

            </Container>
            <Container className="p-0">
                <div className="border-b border-gray-100"></div>
            </Container>
            <div className={fixed ? "z-10 top-0 left-0 right-0 shadow-sm bg-white fixed" : ""}>
                <Container className={"flex items-center h-14 mx-auto  relative "}>
                    <Link to={"/"}>
                        <img src={ApiConfig.rootUrl + "/" + theme.theme.Logo}
                            className="h-6 max-[986px]:h-5 max-md:h-5 max-[400px]:hidden" alt="" />
                        <img src={ApiConfig.rootUrl + "/" + theme.theme.favicon}
                            className="hidden h-8 max-[400px]:block" alt="" />
                    </Link>

                    <div className="grow"></div>
                    <MenuDesktop links={links} />

                    <div className="grow"></div>

                    <Link to="javascript:void(0)" onClick={() => dispatch(openCart(true))} className="flex items-center text-base font-bold">
                        <span>{getTotal().toFixed(2)} <small className=""> <Currency /> </small> </span>

                        <div className="me-2"></div>
                        <IconButton className="relative">
                            {cart.items.length ? <div className={clr + " w-5 h-5 text-[11px] absolute flex items-center justify-center rounded-full top-0 -translate-y-1/4  text-white bg-primary"}>
                                {cart.items.length}
                            </div> : ""}
                            <FiShoppingCart className={"text-xl " + (i18n.language == "ar" ? "[transform:rotateY(180deg)]" : "")} />
                        </IconButton>

                    </Link>

                    {
                        fixed && <IconButton className={"relative "}>
                            {cart.faverites.length ? <div className={clr + " w-5 font-bold h-5 text-[11px] absolute flex items-center justify-center rounded-full top-0  -translate-y-1/4  text-white bg-primary"}>
                                {cart.faverites.length}
                            </div> : ""}
                            <MdOutlineFavoriteBorder className="text-lg" />
                        </IconButton>
                    }
                    {ApiConfig.isJoomla && <LoginButton />}
                    <MenuMobile links={links} />
                </Container>
            </div>

            {cart.cartOpen && <CartView onClose={() => dispatch(openCart(false))} />}
        </div>

        {/* https://patiotime.loftocean.com/wp-content/uploads/2022/03/louis-hansel-Sj8rgEu7jcM-unsplash.jpg */}
    </>
    )
}
function MenuDesktop({ links, className = "" }: {
    links: LinkOp[], className?: string
}) {


    return <div className={"flex justify-center items-center max-[866px]:hidden h-full absolute  left-1/2   -translate-x-1/2  " + className}>
        {
            links?.map((el, k) => {
                return <React.Fragment key={k} >

                    <LinkSS to={el.src} className="max-[940px]:text-sm">
                        {
                            el.image ? <img src={el.image} className="h-[26px] min-w-[90px] w-auto cursor-pointer" alt="" /> : el.text
                        }
                        {/* {
                             el.image?<div className="text-orange-500 font-bold relative">
                                Hanouteek
                                <span className="absolute top-full right-0"></span>
                             </div>:el.text
                        } */}

                    </LinkSS>
                    {k < links.length - 1 && <div className="me-4"></div>}
                </React.Fragment>
            })
        }

    </div>
}
function MenuMobile({ links }: {
    links: Array<any>
}) {
    const [open, setOpen] = useState(false)

    return <>
        <div className="me-2"></div>
        <IconButton className="  text-base font-bold hidden max-[866px]:flex " onClick={() => setOpen(!open)}>
            <MdMenu className="text-2xl" />
        </IconButton>
        {open && <MenuAnimation childClassName='overflow-hidden hidden max-md:block max-w-xs' onClose={() => setOpen(false)}>
            <div className="p-4 px-6 flex flex-col">
                <div className="flex items-center my-3">
                    <div className="grow"></div>
                    <IconButton className=" " onClick={() => setOpen(false)}>
                        <IoClose className="text-2xl" />
                    </IconButton>
                </div>
                {
                    links?.map((el, k) => {
                        return <React.Fragment key={k}>
                            <LinkSS to={el.src} className="py-3 " onClick={() => setOpen(!open)}>
                                {/* {el.text} */}
                                {
                            el.image ? <img src={el.image} className="h-[26px] min-w-[80px] w-auto cursor-pointer" alt="" /> : el.text
                        }
                            </LinkSS>
                            {k < links.length - 1 && <div className=""></div>}
                        </React.Fragment>
                    })
                }

            </div>
        </MenuAnimation>}
    </>
}
function LinkSS({ to, children, onClick = () => { }, className = "" }: { to: string, onClick?: React.MouseEventHandler, children: React.ReactNode, className?: string }) {

    const location = useLocation()
    const active = location.pathname == "/" ? to == "/" : (to != "/" ? location.pathname.includes(to) : false);
    return <Link onClick={onClick} className={`text-base h-full ${ApiConfig.isJoomla ? "" : "uppercase"} flex items-center relative 
    font-medium group whitespace-nowrap
    ${className} `}
        to={to}>

        {children}
        <div className={`
        ${active ? "after:!scale-x-100" : ""}
        absolute bottom-0 transition-all right-0 left-0 scale-x-0 group-hover:scale-x-100 h-[2px] bg-primary 
        `} ></div>
    </Link>
}
