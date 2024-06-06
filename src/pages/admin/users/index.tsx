import TableManageUsers from "./TableManageUsers"
import TableToolbar from "@/components/organisms/toolbar"
import { PAGE } from "@/utils/enums/page.enum"
import PageHeader from "@/components/organisms/page-header"

const Users = () => {
    return (
        <div className="flex-1 px-6 py-4">
            <PageHeader title="Users Management" />
            {/* <ModalUser /> */}
            <TableToolbar type={PAGE.USER} />
            <TableManageUsers />
        </div>
    )
}

export default Users
