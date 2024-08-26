
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
      ...t.theme.templateType == "restaurant" ? [
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
        path: "/abandoned-carts",
        element: <LayoutAdmin><AbandonedCarts /></LayoutAdmin>,
      },
      {
        path: "/products/edit/:id",
        element: <LayoutAdmin><AddProduct /></LayoutAdmin>,
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
      ...t.Pages.map(el=>{
        return {
          path: "/"+el.slug,
          element: <Layout><DynamicPage page={el} /></Layout>,
        }
      }),
      
    ]
  }