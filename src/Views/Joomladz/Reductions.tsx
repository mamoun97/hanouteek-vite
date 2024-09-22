import React from 'react'
import SwiperF from '../Swiper'

const breakPointsProduct = {
    0: {
        slidesPerView: 1,
        spaceBetween: 0
    },
    800: {
        slidesPerView: 2,
        spaceBetween: 20
    },
    1000: {
        slidesPerView: 2,
        spaceBetween: 20
    },
    8000: {
        slidesPerView: 2,
        spaceBetween: 20
    }
}
const data = [
    {
        image: "https://joomladz.com/files/mohamed.jpg",
        name: "محمد شريف",
        descName: "تاجر",
        desc: "« 📦🔥 أنا أول مرة نشري بالجملة من هاد الموقع وما ندمتش. الخدمة كانت فوق المستوى، والتواصل معاهم كان ساهل وسريع. السلع وصلتني بلا تأخير والجودة بصح كيما وصفوها فالموقع. الأسعار تاعهم تنافسية خاصة بالجملة. بصراحة، رجعت زبون وفي وما نخمم نبدل. أنصح أي واحد يبيع بالجملة يجربهم! »"
    },
    {
        image: "https://joomladz.com/files/ossama.jpg",
        name: "أسامة مرباح",
        descName: "تاجر",
        desc: "« صراحة، تجربة شرائي بالجملة من هاد الموقع كانت فوق ما كنت نتوقع. الخدمة سريعة والتعامل احترافي بزاف. السلع وصلتني ف الوقت لي وعدوني بيه وكلشي كان ف مستوى عالي من الجودة. مانيش نخمم نبدل هاد المورد، ويجي معاها حتى تخفيضات مليحة بالجملة. الله يبارك فيهم! »"
    },
]
export default function Reductions() {
    return (
        <div className='p-6 py-10'>
            <div className=' flex items-center justify-center flex-col mb-10'>
                <h1 className='text-3xl text-center md:max-w-[80%] font-semibold'>
                    Obtenez des réductions, des services et des outils sur mesure pour votre étape commerciale.
                </h1>
                <p className='text-base text-center md:max-w-[80%] mt-4'>

                    Développez vos activités grâce aux avantages offerts par l’adhésion gratuite Alibaba.com, que vous soyez une petite entreprise ayant besoin de l'essentiel pour commencer votre sourcing ou une entreprise déjà bien établie à la recherche d'outils et de solutions pour des commandes plus complexes.
                </p>
            </div>
            <SwiperF
                breakpoints={breakPointsProduct}
                items={[
                    ...data.map((el, k) => {
                        return <div dir='rtl' className="p-16  flex gap-6 bg-card rounded-lg max-sm:flex-col max-sm:p-6  overflow-hidden relative" key={k}
                        >
                            <div className="bg-image w-16 rounded-full h-16 min-w-[64px]" style={{
                                backgroundImage: "url('" + el.image + "')"
                            }}></div>
                            <div>
                                <h1 className='text-3xl font-semibold max-sm:text-xl'>{el.name}</h1>
                                <p className='text-sm font-semibold text-gray-500'>{el.descName}</p>
                                <p className='mt-6'>{el.desc}</p>
                            </div>

                        </div>
                    })

                ]
                }
            />
        </div>
    )
}
