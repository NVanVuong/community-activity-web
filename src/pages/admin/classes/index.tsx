import TableToolbar from "@/components/organisms/toolbar"
import { PAGE } from "@/utils/enums/page.enum"
import PageHeader from "@/components/organisms/page-header"
import ModalClass from "./modal"
import TableManageClasses from "./table"

const Classes = () => {
    return (
        <div className="flex-1 px-6 py-4">
            <PageHeader title="Classes Management" />
            <ModalClass />
            <TableToolbar type={PAGE.CLASS} />
            <TableManageClasses />
        </div>
    )
}

export default Classes
