import { useAppSelector } from "@/redux/hook"
import Modal from "@/components/organisms/modal"
import { MODAL } from "@/utils/constants/modal"
import AddFaculty from "./add"
import DeleteFaculty from "./delete"
import ViewClass from "./view"
import { IFaculty } from "@/interfaces/faculty.interface"

const ModalFaculty = () => {
    const type = useAppSelector((state) => state.modal.type)
    const faculty = useAppSelector((state) => state.modal.data) as IFaculty

    const getModalContent = () => {
        switch (type) {
            case MODAL.ADD.FACULTY:
                return <AddFaculty title="Create Faculty" />
            case MODAL.DELETE.FACULTY:
                return <DeleteFaculty title="Delete Faculty" data={faculty} />
            case MODAL.VIEW.FACULTY:
                return <ViewClass title="List Classes Of Faculty" id={faculty.id} />
            default:
                return null
        }
    }

    return <Modal>{getModalContent()}</Modal>
}

export default ModalFaculty
