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
import images from "../../assets";
import { Classes } from "../../Constants";
import NavbarResturant from "./indexResturant";
import LoginButton from "./LoginButton";

// import { useSelector } from "react-redux";
// import { ThemeSetting } from "../../Types/ThemeSetting";

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
        {
            text: t("contact"),
            src: "#"
        },
        {
            text: t("tracking"),
            src: "/tracking"
        },
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
    const langsicon = (l: any) =>
        l == "fr" && images.img_fr ||
        l == "en" && images.img_en ||
        l == "dz" && images.img_dz || images.img_dz

    const clr = i18n.language != "ar" ? "right-0 translate-x-1/4" : "left-0 -translate-x-1/4"
    return (<>
        <div className={"bg-white border-b border-gray-100 min-h-[98px]  "}>
            <Container className="flex justify-end items-center h-10" onClick={() => {

            }}>

                <div className="flex items-center">
                    <img src={langsicon(i18n?.language ?? images.img_dz)} alt="" className="h-4 max-h-4 min-h-[16px]" />
                    <select className={`${Classes.input} h-12 group
                    min-w-[100px] !border-transparent outline-none !shadow-none p-1 focus:ring-0
                        `}
                        onChange={(e) => {
                            i18n.changeLanguage(e.target.value)
                        }}
                    >
                        <option value="ar">العربية</option>
                        <option value="fr">Français</option>
                        <option value="en">English</option>
                    </select>


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
                <Container className={"flex items-center h-14 mx-auto  "}>
                    <Link to={"/"}>
                        <img src={ApiConfig.rootUrl + "/" + theme.theme.Logo}
                            className="h-7 max-md:h-5 max-[400px]:hidden" alt="" />
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
                    {ApiConfig.isJoomla&&<LoginButton/>}
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
    links: Array<any>, className?: string
}) {


    return <div className={"flex items-center max-md:hidden h-full " + className}>
        {
            links?.map((el, k) => {
                return <React.Fragment key={k}>
                    <LinkSS to={el.src} >
                        {el.text}
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
        <IconButton className="  text-base font-bold hidden max-md:flex " onClick={() => setOpen(!open)}>
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
                                {el.text}
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
    return <Link onClick={onClick} className={`text-base h-full uppercase flex items-center relative 
    font-medium group
    ${className} ${active ? "after:scale-x-100" : ""}`}
        to={to}>

        {children}
        <div className={`
        absolute bottom-0 transition-all right-0 left-0 scale-x-0 group-hover:scale-x-100 h-[2px] bg-primary 
        `} ></div>
    </Link>
}
