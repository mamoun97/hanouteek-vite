import { Page } from "../Types/ThemeSetting";
import Container from "../Views/Container";


export default function DynamicPage({ page }: { page: Page }) {
    return (
        <div>
            <Container className="py-8">

                <div dangerouslySetInnerHTML={{ __html: page.body }} ></div>
            </Container>

        </div>
    )
}
