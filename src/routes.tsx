
import Home from "./Pages/Home";
import Layout from "./Layout";
import Product from "./Pages/Product";
import Checkout from "./Pages/Checkout";
import Categories from "./Pages/Categories";
import { ThemeSetting } from "./Types/ThemeSetting";
import LayoutAdmin from "./Admin/Layout";
import Login from "./Admin/Pages/Login";
import Dashboard from "./Admin/Pages/Dashboard";
import Orders from "./Admin/Pages/Orders";
import AddOrder from "./Admin/Pages/AddOrder";
import Tracking from "./Pages/Tracking";
import CategoriesResturant from "./Pages/CategoriesResturant";
import Catalog from "./Pages/Catalog";
import Offer from "./Pages/Offer";
import AddOrderPos from "./Admin/Pages/AddOrderPos";
import LayoutTheme from "./Admin/LayoutTheme";
import ProductBuy from "./Pages/ProductBuy";
import DynamicPage from "./Pages/DynamicPage";
import AddProduct from "./Admin/Pages/AddProduct";
import Products from "./Admin/Pages/Products";
import Users from "./Admin/Pages/Users";
import OrderExchange from "./Pages/OrderExchange";
import OurShops from "./Pages/OurShops";
import AbandonedCarts from "./Admin/Pages/AbandonedCarts";
import AddOrderDrop from "./Admin/Pages/AddOrderDrop";
import ApiConfig from "./Api/ApiConfig";
import JoomlaCategs from "./Pages/JoomlaCategs";
import LayoutAdminJoomla from "./AdminJoomla/Layout";

import DashboardJoomla from "./AdminJoomla/Pages/Dashboard";
import OrdersJoomla from "./AdminJoomla/Pages/Orders";
import ProductsJoomla from "./AdminJoomla/Pages/Products";
import AddProductJoomla from "./AdminJoomla/Pages/AddProduct";
import PrivateCategory from "./Pages/PrivateCategory";
 import LoginJoomla from "./AdminJoomla/Pages/Login"
 import RegisterJoomla from "./AdminJoomla/Pages/Register"
import JoomlaOrders from "./Pages/JoomlaOrders";
import ContactSupport from "./Admin/Pages/ContactSupport";
import FAQ from "./Admin/Pages/FAQ";
import Profile from "./Pages/Profile";
import ForgetPassword from "./AdminJoomla/Pages/ForgetPassword";

export default function getRoutes(t:ThemeSetting) {
    return [
      {
        path: "/",
        element: <Layout><Home /></Layout>,
      },
      {
        path: "/catalog",
        element: <Catalog />,
      },
      {
        path: "/product/:slug",
        element: <Layout><Product /></Layout>,
      },
      {
        path: "/product-buy/:slug",
        element: <Layout><ProductBuy /></Layout>,
      },
      {
        path: "/offer/:id",
        element: <Layout><Offer /></Layout>,
      },
      
      {
        path: "/product/:slug/:index",
        element: <Layout><Product /></Layout>,
      },
      {
        path: "/checkout",
        element: <Layout><Checkout /></Layout>
      },
      {
        path: "/private-category/:id",
        element: <Layout><PrivateCategory /></Layout>
      },
      ...
      ApiConfig.isJoomla?[
        {
          path: "/categories",
          element: <Layout><JoomlaCategs /></Layout>,
        },
        {
          path: "/categories/:id",
          element: <Layout><JoomlaCategs /></Layout>,
        },
        {
          path: "/categories/:id/:idSub",
          element: <Layout><JoomlaCategs /></Layout>,
        },
      ]:
      t.theme.templateType == "restaurant" ? [
        {
          path: "/categories",
          element: <Layout><CategoriesResturant /></Layout>,
        },
        {
          path: "/categories/:id",
          element: <Layout><CategoriesResturant /></Layout>,
        },
        {
          path: "/categories/:id/:idSub",
          element: <Layout><CategoriesResturant /></Layout>,
        },
      ] : [
        {
          path: "/categories/:id",
          element: <Layout><Categories /></Layout>,
        },
        {
          path: "/categories/:id/:idSub",
          element: <Layout><Categories /></Layout>,
        },
        {
          path: "/categories",
          element: <Layout><Categories /></Layout>,
        },
      ],
      {
        path: "/tracking",
        element: <Layout><Tracking /></Layout>,
      },
      {
        path: "/our-shops",
        element: <Layout><OurShops /></Layout>,
      },
      {
        path: "/order-exchange",
        element: <Layout><OrderExchange /></Layout>,
      },
      {
        path: "/admin",
        element: <Login />,
      },
      {
        path: "/dashboard",
        element: <LayoutAdmin><Dashboard /></LayoutAdmin>,
      },
      {
        path: "/orders",
        element: <LayoutAdmin key={"order_D"}><Orders  /></LayoutAdmin>,
      },
      {
        path: "/orders/:state",
        element: <LayoutAdmin key={"order_S"}><Orders  /></LayoutAdmin>,
      },
      {
        path: "/failed-orders",
        element: <LayoutAdmin key={"order_F"}><Orders  type={"failed"}/></LayoutAdmin>,
      },
      {
        path: "/return",
        element: <LayoutAdmin key={"order_R"}><Orders  type={"return"}/></LayoutAdmin>,
      },
      {
        path: "/products",
        element: <LayoutAdmin><Products /></LayoutAdmin>,
      },
      {
        path: "/users",
        element: <LayoutAdmin><Users /></LayoutAdmin>,
      },
      {
        path: "/products/create",
        element: <LayoutAdmin><AddProduct update={false}/></LayoutAdmin>,
      },
      {
        path: "/faq",
        element: <LayoutAdmin><FAQ/></LayoutAdmin>,
      },
      {
        path: "/abandoned-carts",
        element: <LayoutAdmin><AbandonedCarts /></LayoutAdmin>,
      },
      {
        path: "/products/edit/:id",
        element: <LayoutAdmin><AddProduct /></LayoutAdmin>,
      },
      {
        path: "/contact-and-support",
        element: <LayoutAdmin><ContactSupport /></LayoutAdmin>,
      },
  
      {
        path: "/order/create",
        element: <LayoutAdmin><AddOrder update={false} /></LayoutAdmin>,
      },
      {
        path: "/order/create-drop",
        element: <LayoutAdmin><AddOrderDrop /></LayoutAdmin>,
      },
      {
        path: "/pos/order/create",
        element: <LayoutTheme>
          <div className="p-4"><AddOrderPos  /></div>
        </LayoutTheme>,
      },
      {
        path: "/order/edit/:id",
        element: <LayoutAdmin><AddOrder /></LayoutAdmin>,
      },

      {
        path: "/joomla-orders",
        element: <Layout><JoomlaOrders/></Layout>,
      },
      {
        path: "/joomla/profile",
        element: <Layout><Profile/></Layout>,
      },
      {
        path: "/joomla-admin/dashboard",
        element: <LayoutAdminJoomla><DashboardJoomla /></LayoutAdminJoomla>,
      },
      {
        path: "/joomla-admin/orders",
        element: <LayoutAdminJoomla><OrdersJoomla /></LayoutAdminJoomla>,
      },
      {
        path: "/joomla-admin/products",
        element: <LayoutAdminJoomla><ProductsJoomla /></LayoutAdminJoomla>,
      },
      {
        path: "/joomla-admin/add-product",
        element: <LayoutAdminJoomla><AddProductJoomla update={false} /></LayoutAdminJoomla>,
      },
      {
        path: "/joomla-admin/products/edit/:id",
        element: <LayoutAdminJoomla><AddProductJoomla isJoomla={true}  update={true} /></LayoutAdminJoomla>,
      },
      {
        path: "/joomla-auth/",
        element: <LoginJoomla/>,
      },
      {
        path: "/joomla-auth/register",
        element: <RegisterJoomla/>,
      },
      {
        path: "/joomla-auth/forget_password",
        element: <ForgetPassword/>,
      },



      ...t.Pages.map(el=>{
        return {
          path: "/"+el.slug,
          element: <Layout><DynamicPage page={el} /></Layout>,
        }
      }),

      
    ]
  }