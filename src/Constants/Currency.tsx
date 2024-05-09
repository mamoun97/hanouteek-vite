import { useTranslation } from "react-i18next";

export default function Currency() {
    const {i18n } = useTranslation();
    return (
        <>
            {i18n.language=="ar"?"دج":"DZD"}
        </>
    )
}
