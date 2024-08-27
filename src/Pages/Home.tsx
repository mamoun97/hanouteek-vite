import { useSelector } from "react-redux";
import { ThemeSetting } from "../Types/ThemeSetting";
import SectionRoot from "../Views/Sections/SectionRoot";
import Container from "../Views/Container";
import HomeHanouteek from "../Views/HomeHanouteek";
import ApiConfig from "../Api/ApiConfig";
import HomeJoomla from "../Views/Joomladz/Home";
import JoomlaHeader from "../Views/Joomladz/JoomlaHeader";
import Template1 from "../Views/Template1";
import Template2 from "../Views/Template2";
import HomeJoomlaOld from "../Views/Joomladz/HomeOld";


export default function Home() {
  const theme = useSelector<ThemeSetting>((state) => state.theme) as ThemeSetting
  const isRes = theme.theme.templateType == "restaurant" ? true : false;
  // return <Template2/>
  // return <Template1/>
  // return <HomeJoomlaOld/>
  // if (ApiConfig.isJoomla/*||theme.theme.templateType=="joomla"*/)
  //   return <HomeJoomla />
  if (ApiConfig.isHanouteek)
    return <Container>
      <HomeHanouteek />
    </Container>
  return <>

    {
      theme.theme.templateType == "joomla" && <JoomlaHeader />
    }

    {

      theme.theme.HomePage.HomePageSections.map((el, k) => {
        if (isRes && el.type == "slider" && k == 0) return null;
        return <SectionRoot data={el} key={el.type + k} />
      })
    }
  </>
}
