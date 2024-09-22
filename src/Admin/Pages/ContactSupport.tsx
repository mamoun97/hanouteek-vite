import React from 'react'
import useLang from '../../hoock/useLang'
import { FaFacebook, FaFacebookMessenger, FaInstagram, FaTelegram, FaWhatsapp } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { ThemeSetting } from '../../Types/ThemeSetting'
import { useSelector } from 'react-redux'



// https://www.facebook.com/profile.php?id=61563109598294
export default function ContactSupport() {
    const { tr } = useLang()
    const theme = useSelector<ThemeSetting>((state) => state.theme) as ThemeSetting
    const u = theme.theme.generalSetting
    // const urls = [
    //     ...u?.facebookUrl ? [{
    //         url: u.facebookUrl,
    //         icon: ,
    //         name: "Messenger"
    //     }] : [],
    //     ...u?.twitterUrl ? [{
    //         url: u.twitterUrl,
    //         icon: <FaFacebook /><FaFacebookMessenger />,
    //         name: "Facebook"
    //     }] : [],
    //     {
    //         url: "https://t.me/+wvBtTeZrij5jZDQ0",
    //         icon: <FaTelegram />,
    //         name: "Telegram"
    //     },
    //     ...u?.twitterUrl ? [{
    //         url: u.twitterUrl,
    //         icon: <FaFacebook />,
    //         name: "Instagram"
    //     }] : [],
    // ]
    const urls = [
        {
            url: "https://m.me/362146516988241",
            icon: <FaFacebookMessenger />,
            name: "Messenger",
            className:"hover:bg-gradient-to-tr hover:from-blue-500 hover:via-purple-500 hover:to-pink-500"
        },
        {
            url: "https://www.facebook.com/groups/552227857233607",
            icon: <FaFacebook />,
            name: "Facebook",
            className:"hover:bg-[#0866ff]"
        },
        {
            url: "https://t.me/+wvBtTeZrij5jZDQ0",
            icon: <FaTelegram />,
            name: "Telegram",
            className:"hover:bg-[#28a8e9]"
        },
        {
            url: "https://www.instagram.com/risedropdz",
            icon: <FaInstagram />,
            name: "Instagram",
            className:"hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-pink-500 hover:to-purple-600"
        },
        {
            url: "https://wa.me/+213560779325",
            icon: <FaWhatsapp />,
            name: "Whatsapp",
            className:"hover:bg-[#00e676]"
        },
    ]
    return (
        <div>
            <div className=' flex items-center flex-col gap-2 justify-center text-3xl my-14'>
                <span className='font-semibold'>{tr.drower.contact_supp}</span>
                <p className='text-sm opacity-70 text-center'>Pour toute demande de renseignements, contactez-nous via l'un des liens suivants</p>
            </div>
            <div className='flex justify-center gap-6 max-[540px]:flex-col '>
                {
                    urls.map((el, k) => {
                        return <Link to={el.url} target='_blank' className='flex group gap-3 items-center flex-col' key={k}>
                            <div className={'w-16 h-16 max-sm:h-12 max-sm:w-12 text-3xl max-sm:text-2  bg-muted-foreground  text-white rounded-full flex items-center justify-center '+el.className.replace(new RegExp(`\\bgroup-hover\\b`, 'gi'), "hover")}>
                                {el.icon}
                            </div>
                            <p className='text-sm  '>{el.name}</p>
                        </Link>
                    })
                }
            </div>
        </div>
    )
}
