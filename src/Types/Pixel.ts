type ProductOrder={
    id: number,
    quantity: number
}
type PixelData={

    event_name: string,
    event_time: number,
    user_data: {
        ph?: string[],
        fn?: string[],
        ct?: string[],
        st?: string[],
        ln?: string[],
        fbc: string,
        fbp: string
    },
    custom_data?: {
        currency?: string,
        value?: number,
        content_type?: string,
        contents?: ProductOrder[],
        content_ids?: number[]|string[]
    },
    event_source_url?: string,
    action_source?: string
}
interface PixelOpject{
    data:PixelData[]
}
