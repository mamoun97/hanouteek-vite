import { useSelector } from "react-redux";
import { ThemeSetting } from "../Types/ThemeSetting";
import SectionRoot from "../Views/Sections/SectionRoot";
import Container from "../Views/Container";
import HomeHanouteek from "../Views/HomeHanouteek";
import ApiConfig from "../Api/ApiConfig";
import HomeJoomla from "../Views/Joomladz/Home";


export default function Home() {
  const theme = useSelector<ThemeSetting>((state) => state.theme) as ThemeSetting
  const isRes = theme.theme.templateType == "restaurant" ? true : false;


  if (ApiConfig.isJoomla)
    return <HomeJoomla />
  return (
    <>


      {
        ApiConfig.isHanouteek ?
          <Container>
            <HomeHanouteek />
          </Container>
          :
          theme.theme.HomePage.HomePageSections.map((el, k) => {
            if (isRes && el.type == "slider" && k == 0) return null;
            return <SectionRoot data={el} key={el.type + k} />
          })
      }
    </>
  )
}
