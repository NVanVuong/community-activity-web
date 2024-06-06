import { Modal as ModalAntd } from "antd"
import { useAppDispatch, useAppSelector } from "@/redux/hook"
import { closeModal } from "@/redux/features/modal/modal.slice"

interface IModal {
    title?: string
    children: React.ReactNode
}

const Modal = (props: IModal) => {
    const dispatch = useAppDispatch()
    const isOpen = useAppSelector((state) => state.modal.isOpen)

    return (
        <ModalAntd
            open={isOpen}
            onCancel={() => {
                dispatch(closeModal())
            }}
            footer={null}
            destroyOnClose
        >
            <>{props.children}</>
        </ModalAntd>
    )
}

export default Modal
