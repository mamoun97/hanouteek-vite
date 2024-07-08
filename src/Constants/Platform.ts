
import ApiConfig from "../Api/ApiConfig"
const platforms = {
    'Yalidine': "Yalidine-1711696296242-876377113.webp",
    'Yalitec': "Yalitic-1711696269562-406074350.webp",
    'Guepex': "Gupex-1711696322512-741213217.webp",
    'ZRexpress': "zr-1711696205340-330206972.webp",
    'Maystro': "maystro-1711696347622-425766647.webp",
    "Ups": "logo-1716467554955-76215533.webp",
    "Waslat": "426443403_1103862714400060_5085562038461842977_n-1717577567702-988637816.webp"
}
type T = keyof typeof platforms
const root = ApiConfig.rootUrl + "/"
const getPlatformUrl = (s: string) => {
    let d = Object.keys(platforms)
    let f = d.find(el => s.includes(el));
    if (f)
        return root + platforms[f as T]
    else return undefined
}
export default getPlatformUrl