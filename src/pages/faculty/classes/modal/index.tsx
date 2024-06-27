import { useAppSelector } from "@/redux/hook"
import Modal from "@/components/organisms/modal"
import { MODAL } from "@/utils/constants/modal"
import { IClazz } from "@/interfaces/clazz.interface"
import ViewStudent from "./view"
import DeleteClass from "./delete"
import AddClass from "./add"

const ModalClass = () => {
    const type = useAppSelector((state) => state.modal.type)
    const classData = useAppSelector((state) => state.modal.data) as IClazz

    const getModalContent = () => {
        switch (type) {
            case MODAL.ADD.CLASS:
                return <AddClass title="Create Class" />
            case MODAL.DELETE.CLASS:
                return <DeleteClass title="Delete Class" data={classData} />
            case MODAL.VIEW.CLASS:
                return <ViewStudent title="List Students Of Class" id={classData.id} />
            default:
                return null
        }
    }

    return <Modal>{getModalContent()}</Modal>
}

export default ModalClass
