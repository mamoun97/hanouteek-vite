import ProductApi from "../Api/ProductApi"
import sha256 from 'crypto-js/sha256';
function hashForFacebookPixel(data:string) {

    return sha256(data.toLowerCase()).toString()
}
const sendEvent = (dt:PixelOpject) => {
    ProductApi.sendEvent(dt).then(res => {
        if(res){}
    }).catch(err => {
        console.log(!!err)
    })
}
const getCookieM = (cname:string) => {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
export const viewContentEvent = (id:number, price:number) => {
    if(id){}
    sendEvent({
        "data": [
            {
                "event_name": "ViewContent",
                "event_time": Math.floor(Date.now() / 1000),
                "event_source_url": window.location.href,
                "user_data": {
                    "fbc": getCookieM("_fbc"),
                    "fbp": getCookieM("_fbp")
                },
                "custom_data": {
                    "currency": "dzd",
                    "value": price,


                }
            }
        ]
    })
}
export const addToCartEvent = (id:number, price:number, qte:number) => {
    sendEvent({
        "data": [
            {
                "event_name": "AddToCart",
                "event_time": Math.floor(Date.now() / 1000),
                "user_data": {
                    "fbc": getCookieM("_fbc"),
                    "fbp": getCookieM("_fbp")
                },
                "custom_data": {
                    "currency": "dzd",
                    "value": price,
                    "contents": [
                        {
                            "id": id,
                            "quantity": qte
                        }
                    ]
                },
                "event_source_url": window.location.href,
                "action_source": "website"
            }
        ]
    })
}

export const purchaseEvent = (products:ProductCart[], total:number, user:OrderForm) => {
    sendEvent(
        {
            "data": [
                {
                    "event_name": "Purchase",
                    "event_time": Math.floor(Date.now() / 1000),
                    "user_data": {

                        "ph": [
                            hashForFacebookPixel(user.contact_phone)
                        ],
                        "fn": [
                            hashForFacebookPixel(user.fullName)
                        ],
                        "ct": [
                            hashForFacebookPixel(user.to_commune_name)
                        ],
                        "st": [
                            hashForFacebookPixel(user.to_wilaya_name)
                        ],
                        "ln": [
                            hashForFacebookPixel(user.fullName)
                        ],
                        // city:user.commune,
                        // state:user.wilaya,
                        // phone:user.phone,
                        // first_name:user.fname,
                        // last_name:user.fname,


                        "fbc": getCookieM("_fbc"),
                        "fbp": getCookieM("_fbp")
                    },
                    "custom_data": {
                        "currency": "dzd",
                        "value": total,
                        "content_type": "product",
                        "contents": products.map(el => {
                            return {
                                id: el.id,
                                "quantity": el.qte
                            }
                        }),
                        content_ids: products.map(el => el.slugName)
                    },
                    "event_source_url": window.location.href,
                    "action_source": "website"
                }
            ]
        }
    )
}
export const initiateCheckoutEvent = (products:ProductCart[], total:number) => {
    sendEvent(
        {
            "data": [
                {
                    "event_name": "InitiateCheckout",
                    "event_time": Math.floor(Date.now() / 1000),
                    "event_source_url": window.location.href,
                    "action_source": "website",
                    "user_data": {
                        "fbc": getCookieM("_fbc"),
                        "fbp": getCookieM("_fbp")
                    },
                    "custom_data": {
                        "currency": "dzd",
                        "value": total,
                        "contents": products.map(el => {
                            return {
                                id: el.id,
                                "quantity": el.qte
                            }
                        })
                    }
                }
            ]
        }
    )
}
export const addToWishlistEvent = (id:number, price:number) => {
    if(id){}
    sendEvent(
        {
            "data": [
                {
                    "event_name": "AddToWishlist",
                    "event_time": Math.floor(Date.now() / 1000),
                    "event_source_url": window.location.href,
                    "action_source": "website",
                    "user_data": {
                        "fbc": getCookieM("_fbc"),
                        "fbp": getCookieM("_fbp")
                    },
                    "custom_data": {
                        "currency": "dzd",
                        "value": price,

                    }
                }
            ]
        }
    )
}
