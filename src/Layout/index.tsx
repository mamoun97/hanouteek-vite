import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import Navbar from "../Views/Navbar"
import Footer from "../Views/Footer"
import CartViewResturant from "../Views/Cart/CartViewResturant"
import { useDispatch, useSelector } from "react-redux";
import { Cart, openCart } from "../Store/cartSlice";
import { RootState } from "../Store"
import { ThemeSetting } from "../Types/ThemeSetting"
import UpdatePrices from "../hoock/UpdatePrices"
import { ThemeProvider } from "../utils/ThemeProvider"
export default function Layout({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch()
  const cart = useSelector<RootState>(state => state.cart) as Cart
  const theme = useSelector<RootState>(state => state.theme) as ThemeSetting
  const location = useLocation()
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
