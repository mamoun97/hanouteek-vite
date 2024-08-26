

const url = "https://api.risecart.net";

// const db = "db=hanouteekiwY3oYSQ2"
// const db = "db=taniajawaheroi7JLwmU5"
// const db = "db=template73nv-Cgi5"
// const db = "db=template73nv-Cgi5"
// const db = "db=demooneewVOZ3NnB"
// const db = "db=bizzademoresturantuaJ0TS8Bd"
// const db = "db=Millenium31pn-QVfdiI"
// const db = "db=MyshapedzMyshapedz3nknQCJFy"
// const db = "db=burgerstoreburgerstoreVQTwAibTm"
// const db = "db=oranshoesdefweGOLG"
// const db = "db=wahrenoriginalwahrenoriginalSBEv1XWgn"
// const db = "db=joomlajoomlayhLZnl16G"
// const db = "db=quincailleriequincaillerieQ9KnMUuwA"
// const db = "db=mBoutiquemboutiquesBC900gHy"
const db = false;
const isHanouteek = false
const param = {
    url: url + "/api/v1",
    rootUrl: url,
    ...(window.location.host.includes("hanouteek.com") || window.location.host.includes("hanouteek.risecart.net") || isHanouteek) ? {
        isHanouteek: true,
    } : {
        isHanouteek: false,
    },
    isJoomla: window.location.host.includes("joomla.risecart.net"),
    swrStop: {
        dedupingInterval: 500000,
        refreshWhenOffline: false,
        refreshWhenHidden: false,
        revalidateOnFocus: false,

    },

    db: db ? "&" + db : "",
    dbq: db ? "?" + db : "",


    version: "v1.2.1",

    content_type: 'application/json',

    firebase: false,
    urls: {
        theme: url + "/api/v1/tenant/store/findOne"
    }

};
type ApiConfigType = typeof param
var ApiConfig: ApiConfigType = param
export default ApiConfig;