

import { HomePageSection } from "../../Types/ThemeSetting"
import Container from "../Container"
import CategoriesSection from "./CategoriesSection"
import HtmlSection from "./HtmlSection"
import ProductsListSection from "./ProductsListSection"
import ProductsSctions from "./ProductsSctions"
import SingleProductSection from "./SingleProductSection"
import SliderSection from "./SliderSection"



export default function SectionRoot({ data }: { data: HomePageSection }) {
  
  return (
    <div>

      {data.type == "slider" && <div className="bg-gray-50 ">
          <SliderSection data={data} />
      </div>}

      {data.type == "SingleProduct" && <Container className="bg-primary/40 ">
          <SingleProductSection data={data} />
      </Container>}

      <Container>
        {

          data.type == "html" && <HtmlSection data={data} /> ||
          data.type == "Categories" && <CategoriesSection data={data} /> ||
          data.type == "ProductsList" && <ProductsListSection data={data} /> ||
          data.type == "Products" && <ProductsSctions data={data} /> || ""
        }</Container>
    </div>
  )
}
