import { useAppSelector } from "@/redux/hook"
import ViewSubcategory from "./view"
import Modal from "@/components/organisms/modal"
import { MODAL } from "@/utils/constants/modal"
import AddCategory from "./add"
import DeleteCategory from "./delete"
import UpdateCategory from "./update"
import { ICategory } from "@/interfaces/categories.interface"
import AddSubategory from "../subcategories/modal/add"

const ModalCategories = () => {
    const type = useAppSelector((state) => state.modal.type)
    const category = useAppSelector((state) => state.modal.data) as ICategory

    const getModalContent = () => {
        switch (type) {
            case MODAL.ADD.CATEGORY:
                return <AddCategory title="Create Category" />
            case MODAL.ADD.SUBCATEGORY:
                return <AddSubategory title="Create Subcategory" data={category} />
            case MODAL.UPDATE.CATEGORY:
                return <UpdateCategory title="Update Category" data={category} />
            case MODAL.DELETE.CATEGORY:
                return <DeleteCategory title="Delete Category" data={category} />
            case MODAL.VIEW.CATEGORY:
                return <ViewSubcategory title="List Subcategories" data={category} />
            default:
                return null
        }
    }

    return <Modal>{getModalContent()}</Modal>
}

export default ModalCategories
