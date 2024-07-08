import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'
import { ActionIcon } from 'rizzui'
import { useTheme } from "next-themes";
export default function ModeThemeButton() {
    const { setTheme, theme } = useTheme();
    const getMode = () => {
        let i = window.matchMedia("(prefers-color-scheme: dark)").matches
        let th = theme == "system" ? (i ? "dark" : "light") : theme ?? ""
        return th
    }
    return (

        <ActionIcon variant="text" onClick={() => {
            setTheme(getMode()=="dark"?"light":"dark")
        }}>
            <SunIcon className="h-5 w-5 dark:hidden" />
            <MoonIcon className=" h-5 w-5 hidden dark:block" />
            <span className="sr-only">Toggle theme</span>
        </ActionIcon>
       

    )
}
