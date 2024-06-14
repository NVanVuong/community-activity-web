import { useAppSelector } from "@/redux/hook"
import ViewSubcategory from "./view"
import Modal from "@/components/organisms/modal"
import { MODAL } from "@/utils/constants/modal"
import AddSubcategories from "./add-subcategory"
import { IRole } from "@/interfaces/user.interface"
import AddRole from "./add"
import DeleteRole from "./delete"

const ModalOrganizations = () => {
    const type = useAppSelector((state) => state.modal.type)
    const role = useAppSelector((state) => state.modal.data) as IRole

    const getModalContent = () => {
        switch (type) {
            case MODAL.ADD.ROLE:
                return <AddRole title="Create Role" />
            case MODAL.ADD.SUBCATEGORY:
                return <AddSubcategories title="Add Subcategories to Role" data={role} />
            case MODAL.DELETE.ROLE:
                return <DeleteRole title="Delete Role" data={role} />
            case MODAL.VIEW.ROLE:
                return <ViewSubcategory title="List Subcategories" data={role} />
            default:
                return null
        }
    }

    return <Modal>{getModalContent()}</Modal>
}

export default ModalOrganizations
