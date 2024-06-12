import TableManageMyActivites from "./table"
import TableToolbar from "@/components/organisms/toolbar"
import { PAGE } from "@/utils/enums/page.enum"
import PageHeader from "@/components/organisms/page-header"
import ModalActivities from "./modal"

const MyActivities = () => {
    return (
        <div className="flex-1 px-6 py-4">
            <PageHeader title="My Activities Management" />
            <ModalActivities />
            <TableToolbar type={PAGE.MY_ACTIVITIES} />
            <TableManageMyActivites />
        </div>
    )
}

export default MyActivities
