import { useAppSelector } from "@/redux/hook"
import Modal from "@/components/organisms/modal"
import { MODAL } from "@/utils/constants/modal"
import DeleteSubcategory from "./delete"
import UpdateCategory from "./update"
import { ISubcategory } from "@/interfaces/categories.interface"

const ModalSubcategories = () => {
    const type = useAppSelector((state) => state.modal.type)
    const subcategory = useAppSelector((state) => state.modal.data) as ISubcategory

    const getModalContent = () => {
        switch (type) {
            case MODAL.UPDATE.SUBCATEGORY:
                return <UpdateCategory title="Update Subcategory" data={subcategory} />
            case MODAL.DELETE.SUBCATEGORY:
                return <DeleteSubcategory title="Delete Subcategory" data={subcategory} />
            default:
                return null
        }
    }

    if (type !== MODAL.UPDATE.SUBCATEGORY && type !== MODAL.DELETE.SUBCATEGORY) return null

    return <Modal>{getModalContent()}</Modal>
}

export default ModalSubcategories
