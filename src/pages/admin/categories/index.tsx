import TableManageCategories from "./TableManageCategories"
import TableToolbar from "@/components/organisms/toolbar"
import { PAGE } from "@/utils/enums/page.enum"
import PageHeader from "@/components/organisms/page-header"
import ModalCategories from "./modal"
import ModalSubcategories from "./subcategories/modal"

const Categories = () => {
    return (
        <div className="flex-1 px-6 py-4">
            <PageHeader title="Categories Management" />
            <ModalCategories />
            <ModalSubcategories />
            <TableToolbar type={PAGE.CATEGORY} />
            <TableManageCategories />
        </div>
    )
}

export default Categories
