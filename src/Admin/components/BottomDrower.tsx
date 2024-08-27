import "react-spring-bottom-sheet/dist/style.css";
import { BottomSheet } from "react-spring-bottom-sheet";



type CartProps = {
    open: boolean,
    onClose: (e: boolean) => void,
    children: React.ReactNode
}
export default function ButtomDrower({ open, onClose, children }: CartProps) {

    return (
        <>


            <BottomSheet
                className=" bottom-drawer "
                open={open}
                style={{
                    background:"#F00"
                }}
                onDismiss={() => onClose(false)}
                // blocking={false}
                maxHeight={450}
            >
                {children}
            </BottomSheet>

        </>
    )
}