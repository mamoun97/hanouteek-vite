
import Resources from "../../Lang/Resources"

const OrderCols = (d: typeof Resources.ar.translation,deleteCols:string[]) => {

    const t = d.associate.order
    const t1 = d
    const values= [
        {
            label: t.actions,
            value: "actions",
            check: true
        },
        {
            label: t.fullname,
            value: "name",
            check: true
        },
        {
            label: t1.phone,
            value: "contact_phone",
            check: true
        },
        {
            label: t1.wilaya,
            value: "to_wilaya_name",
            check: true
        },
        {
            label: t1.commune,
            value: "to_commune_name",
            check: true
        },
        {
            label: t.associate,
            value: "associate",
            check: true
        },
        {
            label: t1.tracking,
            value: "tracking",
            check: true
        },
        {
            label: t.prods,
            value: "products",
            check: true
        },
        {
            label: t.price_total,
            value: "price_total",
            check: true
        },
        {
            label: t.benefit,
            value: "benefit_drop_shipper",
            check: true
        },
        {
            label: t.state,
            value: "state",
            check: true
        },
        {
            label: t.date,
            value: "created_at",
            check: true
        },
    ]
    return values.filter(el=>!deleteCols.includes(el.value))
}
export default OrderCols