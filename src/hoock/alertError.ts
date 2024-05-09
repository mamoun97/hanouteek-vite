import toast from "react-hot-toast";

export default function (err:any){
    toast.error(
        (err.response ? err.response.data.message : err.message)||"something went wrong"
        )
}