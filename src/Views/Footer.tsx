
import { FaTiktok } from "react-icons/fa"
import { RiInstagramFill } from "react-icons/ri"
import { Link } from "react-router-dom"
import { MdFacebook } from "react-icons/md"
import ApiConfig from '../Api/ApiConfig'
import { useSelector } from 'react-redux'
import { RootState } from '../Store'
import { ThemeSetting } from '../Types/ThemeSetting'
import Container from "./Container"

function Footer() {
    const theme = useSelector<RootState>(state => state.theme) as ThemeSetting
    return (
        <div className="py-5 pt-11 bg-white mt-3">
            <Container>
                <div className="flex justify-center">

                    <div className="flex items-center w-full max-w-4xl">
                    <Link to={"/"}>
                        <img src={theme.theme.Logo.includes("http") ? theme.theme.Logo :
                            ApiConfig.rootUrl + "/" + theme.theme.Logo} alt="" className="h-10 max-sm:h-6" />
                    </Link>
                    <div className="grow"></div>
                    <a href="https://www.facebook.com/" target="_blank" className="text-gray-600 hover:text-primary text-4xl">
                        <MdFacebook />
                    </a>
                    <a href="https://www.instagram.com/" target="_blank" className="text-gray-600 hover:text-primary text-4xl">
                        <RiInstagramFill />
                    </a>
                    <a href="https://www.tiktok.com/" target="_blank" className="text-gray-600 hover:text-primary  text-4xl">
                        <FaTiktok />
                    </a>
                    </div>


                </div>
                <hr className="border-gray-200 my-8 mx-5" />
                <div className="grid grid-cols-4 max-md:grid-cols-2 max-sm:grid-cols-1 capitalize max-sm:text-center">

                    <div className="col-span-1">
                        <h1 className="font-semibold mb-2 ">{theme.Menu.aboutMenu.Title}</h1>
                        <ul>
                            {
                                theme.Menu.aboutMenu.listLinks.map((el, k) => {
                                    return <Link to={"/" + el.Link} key={k} className="text-[13px] hover:text-primary hover:underline">
                                        <li >{el.name}</li>
                                    </Link>

                                })
                            }

                        </ul>
                    </div>
                    <div className="col-span-1">
                        <h1 className="font-semibold mb-2">{theme.Menu.mainMenu.Title}</h1>
                        <ul>
                            {
                                theme.Menu.mainMenu.listLinks.map((el, k) => {
                                    return <Link to={"/" + el.Link} key={k} className="text-[13px] hover:text-primary hover:underline">
                                        <li>{el.name}</li>
                                    </Link>
                                })
                            }

                        </ul>
                    </div>
                    <div className="col-span-1">
                        <h1 className="font-semibold mb-2">{theme.Menu.contactUs.Title}</h1>
                        <ul>
                            {
                                theme.Menu.contactUs.listLinks.map((el, k) => {
                                    return <Link to={"/" + el.Link} key={k} className="text-[13px] hover:text-primary hover:underline">
                                        <li>{el.name}</li>
                                    </Link>
                                })
                            }

                        </ul>
                    </div>
                    <div className="col-span-1">
                        <h1 className="font-semibold mb-2">{theme.Menu.termsAndConditions.Title}</h1>
                        <ul>
                            {
                                theme.Menu.termsAndConditions.listLinks.map((el, k) => {
                                    return <Link to={"/" + el.Link} key={k} className="text-[13px] hover:text-primary hover:underline">
                                        <li>{el.name}</li>
                                    </Link>
                                })
                            }

                        </ul>

                    </div>
                </div>
                <hr className="border-gray-200 my-8 mx-5" />
                <div className="flex justify-center text-sm text-center">




                    <div>
                        © 2024. All rights reserved by <a href="https://devgate.net/" target="_blank" className="ms-1"> Devgate</a>.
                    </div>


                </div>
            </Container>

        </div>
    )
}






export default Footer