import TableManageMyScore from "./table"
import TableToolbar from "@/components/organisms/toolbar"
import { PAGE } from "@/utils/enums/page.enum"
import PageHeader from "@/components/organisms/page-header"

const MyScores = () => {
    return (
        <div className="flex-1 px-6 py-4">
            <PageHeader title="My Scores Management" />
            <TableToolbar type={PAGE.MY_SCORES} />
            <TableManageMyScore />
        </div>
    )
}

export default MyScores
