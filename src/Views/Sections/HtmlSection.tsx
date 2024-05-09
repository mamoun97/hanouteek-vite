import { HomePageSection } from "../../Types/ThemeSetting";


export default function HtmlSection({ data }: { data: HomePageSection }) {
  return (
    <div className="my-6">
      {data.content&&<div dangerouslySetInnerHTML={{ __html: data.content }} >

      </div>}
    </div>
  )
}
