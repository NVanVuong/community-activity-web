import TableManageFaculties from "./table"
import TableToolbar from "@/components/organisms/toolbar"
import { PAGE } from "@/utils/enums/page.enum"
import PageHeader from "@/components/organisms/page-header"
import ModalFaculty from "./modal"

const Classes = () => {
    return (
        <div className="flex-1 px-6 py-4">
            <PageHeader title="Faculties Management" />
            <ModalFaculty />
            <TableToolbar type={PAGE.FACULTY} />
            <TableManageFaculties />
        </div>
    )
}

export default Classes
