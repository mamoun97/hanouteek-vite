
import { useTranslation } from "react-i18next";
import { dictionary } from "../Lang/content";

export default function useLang( lang?:string) {
    const {  i18n } = useTranslation();
    const t = dictionary[lang??i18n.language]
    return { t:t.translation,tr:t.translation.associate, lang: lang??i18n.language }
}