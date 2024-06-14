import TableToolbar from "@/components/organisms/toolbar"
import { PAGE } from "@/utils/enums/page.enum"
import PageHeader from "@/components/organisms/page-header"
import ModalOrganizations from "./modal"
import TableManageRoles from "./table"

const Roles = () => {
    return (
        <div className="flex-1 px-6 py-4">
            <PageHeader title="Roles Management" />
            <ModalOrganizations />
            <TableToolbar type={PAGE.ROLE} />
            <TableManageRoles />
        </div>
    )
}

export default Roles
