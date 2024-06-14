import TableToolbar from "@/components/organisms/toolbar"
import { PAGE } from "@/utils/enums/page.enum"
import PageHeader from "@/components/organisms/page-header"
import TableManageOrganizations from "./table"
import ModalOrganizations from "./modal"

const Organizations = () => {
    return (
        <div className="flex-1 px-6 py-4">
            <PageHeader title="Organizations Management" />
            <ModalOrganizations />
            <TableToolbar type={PAGE.ORGANIZATION} />
            <TableManageOrganizations />
        </div>
    )
}

export default Organizations
