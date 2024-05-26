import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home";
import Layout from "./Layout";
import { useDispatch, useSelector } from "react-redux";
import { changeTheme } from "./Store/themeSlice";
import Product from "./Pages/Product";
import { useThemeService } from "./Api/Services";
import Checkout from "./Pages/Checkout";
import Categories from "./Pages/Categories";
import { ThemeSetting } from "./Types/ThemeSetting";
import ApiConfig from "./Api/ApiConfig";
import "./i18n";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import styled from "styled-components";
import LayoutAdmin from "./Admin/Layout";
import Login from "./Admin/Pages/Login";
import Dashboard from "./Admin/Pages/Dashboard";
import Orders from "./Admin/Pages/Orders";
import AddOrder from "./Admin/Pages/AddOrder";
import Tracking from "./Pages/Tracking";
import CategoriesResturant from "./Pages/CategoriesResturant";
import Catalog from "./Pages/Catalog";
import Offer from "./Pages/Offer";
declare namespace NodeJS {
  export interface ProcessEnv {
    REACT_APP_SEC_KEY: string;
  }
}
const DivC = styled.div`
.customHover:hover{
  background-color:${props => props.theme?.Primary}
}
.customPrimary{
  background-color:${props => props.theme?.Primary}
}
.cardProd:hover .buttonProd{
  background-color:${props => props.theme?.Secondary}
}
.cardProd .buttonProd:hover {
  background-color:${props => props.theme?.Primary}
}

`
declare global {
  interface Window {
    fbq?: Function;
    tailwindcssConfiguration?: any
  }
}
const router=(t:ThemeSetting) => createBrowserRouter(getRoutes(t));
function getRoutes(t:ThemeSetting) {
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
      path: "/admin",
      element: <Login />,
    },
    {
      path: "/dashboard",
      element: <LayoutAdmin><Dashboard /></LayoutAdmin>,
    },
    {
      path: "/orders",
      element: <LayoutAdmin><Orders /></LayoutAdmin>,
    },
    {
      path: "/order/create",
      element: <LayoutAdmin><AddOrder /></LayoutAdmin>,
    },
    {
      path: "/order/edit/:id",
      element: <LayoutAdmin><AddOrder /></LayoutAdmin>,
    },
  ]
}

function App() {
  const dispatch = useDispatch();
  const theme = useSelector<ThemeSetting>((state) => state.theme) as ThemeSetting
  const { data } = useThemeService()
  const { i18n } = useTranslation();




  if (data) {
    // dispatch(changeTheme({
    //   ...data,
    //   theme:{
    //     ...data.theme,
    //     templateType:"restaurant"
    //   }
    // }))
    dispatch(changeTheme(data))
    if (window.fbq) {
      window?.fbq('init', data.pixelId);
      window?.fbq('track', 'PageView');
    }
    let icon = document.getElementById(
      'faveiconRiseCart',
    ) as HTMLLinkElement | null;
    if (icon) {
      icon.href = ApiConfig.rootUrl + "/" + data.theme.favicon
    }
    document.documentElement.style.setProperty('--primary-color', data.theme.Primary);
    document.documentElement.style.setProperty('--secondary-color', data.theme.Secondary);
  }

  useEffect(() => {
    // process.env.REACT_APP_API_KEY;
    document.body.dir = i18n.language == "ar" ? "rtl" : "ltr"

  }, [i18n.language])

  return (
    <>

      <DivC theme={theme?.theme}>
        {
          theme != null && <RouterProvider router={router(theme)} />
        }


      </DivC>
    </>
  )
}

export default App
