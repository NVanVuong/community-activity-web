import { useAppSelector } from "@/redux/hook"
import ViewSubcategory from "./view"
import Modal from "@/components/organisms/modal"
import { MODAL } from "@/utils/constants/modal"
import AddOrganization from "./add"
import DeleteOrganization from "./delete"
import AddSubcategories from "./add-subcategory"
import { IOrganization } from "@/interfaces/organization"

const ModalOrganizations = () => {
    const type = useAppSelector((state) => state.modal.type)
    const organization = useAppSelector((state) => state.modal.data) as IOrganization

    const getModalContent = () => {
        switch (type) {
            case MODAL.ADD.ORGANIZATION:
                return <AddOrganization title="Create Organization" />
            case MODAL.ADD.SUBCATEGORY:
                return <AddSubcategories title="Add Subcategories to Organization" data={organization} />
            case MODAL.DELETE.ORGANIZATION:
                return <DeleteOrganization title="Delete Organization" data={organization} />
            case MODAL.VIEW.ORGANIZATION:
                return <ViewSubcategory title="List Subcategories" data={organization} />
            default:
                return null
        }
    }

    return <Modal>{getModalContent()}</Modal>
}

export default ModalOrganizations
