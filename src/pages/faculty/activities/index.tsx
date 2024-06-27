import TableManageActivites from "./table"
import TableToolbar from "@/components/organisms/toolbar"
import { PAGE } from "@/utils/enums/page.enum"
import PageHeader from "@/components/organisms/page-header"
import ModalActivities from "./modal"

const Activities = () => {
    return (
        <div className="flex-1 px-6 py-4">
            <PageHeader title="Activities Management" />
            <ModalActivities />
            <TableToolbar type={PAGE.ACTIVITY} />
            <TableManageActivites />
        </div>
    )
}

export default Activities
