
import { Button } from 'rizzui'
import { useGetAllProductsByFilterService } from '../Api/Services'

import { IoMdDownload } from 'react-icons/io'
import { useEffect, useState } from 'react'
import ApiConfig from '../Api/ApiConfig'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ThemeSetting } from '../Types/ThemeSetting'
import { useSelector } from 'react-redux'

type ProdCustomType = {
    category_name: string,
    image: string
}
type Data ={
    id:number,
    title:string,
    description:string,
    availability:string,
    condition:string,
    price:string,
    link:string,
    image_link:string,
    brand:string,
    color?:string,
    size?:string,
}



type KeyP = keyof Data
export default function Catalog() {
    const { data: data_prods, isLoading } = useGetAllProductsByFilterService("?limit=100&page=1&catalog=true")
    const [data, setData] = useState<Data[] | null>(null)
    const { t } = useTranslation()
    const theme = useSelector<ThemeSetting>(state => state.theme) as ThemeSetting
    //images,tags,id,name,slugName,currency,price,CompareAtPrice,stock 
    // const [columns, setColumns] = useState<KeyP[]>([])
    useEffect(() => {
        try {
            if (data_prods?.data) {
                setData(data_prods.data.map((el) => {
                    // let color=el.attribute?.options??[];
                    // let size=color.length?color[0].sizes:[];
                    return {
                        id:el.id,
                        title:el.name,
                        description:el.sub_description,
                        availability:el.stock>0?"in stock":"out stock",
                        condition:"new",
                        price:el.price+" "+el.currency,
                        link:location.host+"/product/" + el.slugName,
                        image_link:el?.images.length ? ApiConfig.rootUrl + "/" + el.images[0] : "no image",
                        brand:"facebook",
                        // color:color.length?color.map(el=>el.value).join(" "):"",
                        // size:size.join(" ")
                    }
                }))
            }
        } catch (e: any) {
            console.log(e.message)
        }
    }, [data_prods])
    useEffect(() => {
        if (data)
            downloadCSV();
    }, [data])

    function convertArrayOfObjectsToCSV(dt: Array<Data>) {
        const columnDelimiter = ',';
        const lineDelimiter = '\n';
        const keys: KeyP[] = Object.keys(dt[0]) as KeyP[];
        let csv = '';
        csv += keys.join(columnDelimiter);
        csv += lineDelimiter;
        dt.forEach((item) => {
            let row = '';
            keys.forEach(key => {
                if (row !== '') row += columnDelimiter;
                row += '"' + item[key] + '"';
            });
            csv += row + lineDelimiter;
        });
        return csv;
    }
    const downloadCSV = () => {
        let newData = [
            ...data ?? []
        ]
        const csvContent = convertArrayOfObjectsToCSV(newData)

        // Create a Blob with the CSV content
        const blob = new Blob([csvContent], { type: 'text/csv' });


        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = location.host + "-catalogs-" + Date().toString() + '.csv';

        // Trigger the click event to initiate download
        link.click();

        // Clean up the URL.createObjectURL() reference
        URL.revokeObjectURL(link.href);
    };
    return (
        <div className='min-h-screen flex items-center justify-center flex-col'>
            <Link to={"/"} className='mb-10'>
                <img src={ApiConfig.rootUrl + "/" + theme.theme.Logo}
                    className="h-7 max-md:h-5 " alt="" />
            </Link>
            <h1 className='text-2xl mb-10 font-bold'>Catalogs</h1>
            {isLoading && <svg aria-hidden="true" role="status" className="inline w-16 h-16 me-3 text-primary animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
            </svg>
            }
            {
                !isLoading && data &&  <Link to={"/"} ><Button variant='outline' onClick={() => {

                }}>
                    {t("return_tohome")}
                </Button></Link>
            }
        </div>
    )
}
