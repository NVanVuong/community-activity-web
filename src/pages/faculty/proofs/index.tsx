import TableManageProofs from "./table"
import TableToolbar from "@/components/organisms/toolbar"
import { PAGE } from "@/utils/enums/page.enum"
import PageHeader from "@/components/organisms/page-header"
import ModalProofs from "./modal"

const Proofs = () => {
    return (
        <div className="flex-1 px-6 py-4">
            <PageHeader title="Proofs Management" />
            <ModalProofs />
            <TableToolbar type={PAGE.PROOF} />
            <TableManageProofs />
        </div>
    )
}

export default Proofs
