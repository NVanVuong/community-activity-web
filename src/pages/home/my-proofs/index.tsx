import TableManageMyProops from "./table"
import TableToolbar from "@/components/organisms/toolbar"
import { PAGE } from "@/utils/enums/page.enum"
import PageHeader from "@/components/organisms/page-header"
import ModalProofs from "./modal"

const MyProofs = () => {
    return (
        <div className="flex-1 px-6 py-4">
            <PageHeader title="My Proofs Management" />
            <ModalProofs />
            <TableToolbar type={PAGE.MY_PROOFS} />
            <TableManageMyProops />
        </div>
    )
}

export default MyProofs
