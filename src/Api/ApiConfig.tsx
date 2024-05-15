

const url = "https://api.risecart.net";

const db = "db=hanouteekiwY3oYSQ2"
// const db="db=taniajawaheroi7JLwmU5"
// const db="db=template73nv-Cgi5"    
// const db="db=template73nv-Cgi5"
// const db="db=demooneewVOZ3NnB"
// const db="db=bizzademoresturantuaJ0TS8Bd"
// const db="db=Millenium31pn-QVfdiI"
// const db="db=MyshapedzMyshapedz3nknQCJFy"
// const db = "db=burgerstoreburgerstoreVQTwAibTm"
// const db=false;
const isHanouteek = true
const ApiConfig = {
    url: url + "/api/v1",
    rootUrl: url,
    ...(window.location.host.includes("hanouteek.com") || window.location.host.includes("hanouteek.risecart.net") || isHanouteek) ? {
        isHanouteek: true,
    } : {
        isHanouteek: false,
    },
    swrStop: {
        dedupingInterval: 500000,
        refreshWhenOffline: false,
        refreshWhenHidden: false,
        revalidateOnFocus: false,

    },

    db:db? "&" + db:"",
    dbq:db? "?" + db:"",


    version: "v1.2.1",

    content_type: 'application/json',

    firebase: false,
    urls: {
        theme: url + "/api/v1/tenant/store/findOne"
    }

};
export default ApiConfig;