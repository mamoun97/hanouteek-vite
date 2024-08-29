
import { Dropdown } from 'rizzui'
import images from '../../assets'
import { useTranslation } from 'react-i18next'

export default function LangButton() {
    const {i18n}=useTranslation()
    const langsicon = (l: any) =>
        l == "fr" && images.img_fr ||
        l == "en" && images.img_en ||
        l == "dz" && images.img_dz || images.img_dz
    return (
        <>
            <Dropdown>
                <Dropdown.Trigger>
                    <div className='flex items-center gap-2 cursor-pointer text-sm font-bold mx-2'>
                        <img src={langsicon(i18n?.language ?? images.img_dz)} alt="" className="h-4 max-h-4 min-h-[16px]" />
                        {
                            i18n.language == "ar" && "العربية" ||
                            i18n.language == "fr" && "Français" ||
                            i18n.language == "en" && "English"
                        }
                    </div>
                </Dropdown.Trigger>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => i18n.changeLanguage("ar")}>العربية</Dropdown.Item>
                    <Dropdown.Item onClick={() => i18n.changeLanguage("fr")}>Français</Dropdown.Item>
                    <Dropdown.Item onClick={() => i18n.changeLanguage("en")}>English</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </>
    )
}
