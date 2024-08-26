import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeTheme } from "./Store/themeSlice";
import { useThemeService } from "./Api/Services";
import { ThemeSetting } from "./Types/ThemeSetting";
import ApiConfig from "./Api/ApiConfig";
import "./i18n";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import styled from "styled-components";
import getRoutes from "./routes";

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


function App() {
  const dispatch = useDispatch();
  const theme = useSelector<ThemeSetting>((state) => state.theme) as ThemeSetting
  const { data } = useThemeService()
  const { i18n } = useTranslation();




  if (data) {
    
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
