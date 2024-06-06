import Search from "@/components/molecules/search"
import { openModal } from "@/redux/features/modal/modal.slice"
import { useAppDispatch } from "@/redux/hook"
import { MODAL } from "@/utils/constants/modal"
import { PAGE } from "@/utils/enums/page.enum"
import { FaPlus } from "react-icons/fa6"

interface TableToolbarProps {
    type: PAGE.USER | PAGE.CLASS | PAGE.FACULTY | PAGE.ACTIVITY | PAGE.CATEGORY | PAGE.PROOF
}

const TableToolbar: React.FC<TableToolbarProps> = ({ type }) => {
    const dispatch = useAppDispatch()

    return (
        <div className="mb-4 flex justify-between">
            <Search />

            <button
                onClick={() => dispatch(openModal({ type: MODAL.ADD[type] }))}
                className="flex items-center space-x-2 rounded-xl bg-primary px-3 py-2 text-white"
            >
                <FaPlus className="h-3 w-3" />
                <span className="text-xs font-bold tracking-wide">Add new</span>
            </button>
        </div>
    )
}

export default TableToolbar