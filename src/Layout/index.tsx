import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import Navbar from "../Views/Navbar"
import Footer from "../Views/Footer"
import CartViewResturant from "../Views/Cart/CartViewResturant"
import { useDispatch, useSelector } from "react-redux";
import { Cart, openCart } from "../Store/cartSlice";
import { RootState } from "../Store"
import { ThemeSetting } from "../Types/ThemeSetting"
import UpdatePrices from "../hoock/UpdatePrices"
import ApiConfig from "../Api/ApiConfig"
// import { useTranslation } from "react-i18next"
// import { ThemeProvider } from "../utils/ThemeProvider"
export default function Layout({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch()
  const navigate=useNavigate()
  const cart = useSelector<RootState>(state => state.cart) as Cart
  const theme = useSelector<RootState>(state => state.theme) as ThemeSetting
  const location = useLocation()
  if(ApiConfig.isDrop){
    window.location.href="/admin"
    return ""
  }
  useEffect(() => {
    
    window.scrollTo(0, 0)

  }, [location.pathname])
  

  return (
    // <ThemeProvider>
      <div className="min-h-[100vh] bg-white">
        <UpdatePrices />
        <Navbar />
        {children}
        <Footer />
        {/* {cart.cartOpen && <CartViewResturant onClose={() => dispatch(openCart(false))} />} */}
        {theme.theme.templateType == "restaurant" && cart.items.length != 0 && <CartViewResturant onClose={() => dispatch(openCart(false))} />}
      </div>
    // </ThemeProvider>

  )
}
