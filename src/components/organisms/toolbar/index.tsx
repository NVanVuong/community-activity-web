import IsExternal from "@/components/molecules/external"
import Search from "@/components/molecules/search"
import UserQuery from "@/components/molecules/user-query"
import { openModal } from "@/redux/features/modal/modal.slice"
import { useAppDispatch } from "@/redux/hook"
import { MODAL } from "@/utils/constants/modal"
import { PAGE } from "@/utils/enums/page.enum"
import { FaPlus } from "react-icons/fa6"

interface TableToolbarProps {
    type:
        | PAGE.USER
        | PAGE.CLASS
        | PAGE.FACULTY
        | PAGE.ACTIVITY
        | PAGE.CATEGORY
        | PAGE.PROOF
        | PAGE.MY_ACTIVITIES
        | PAGE.MY_PROOFS
        | PAGE.ORGANIZATION
        | PAGE.ROLE
        | PAGE.MY_SCORES
}

const TableToolbar: React.FC<TableToolbarProps> = ({ type }) => {
    const dispatch = useAppDispatch()

    return (
        <div className="mb-4 flex justify-between">
            <div className="flex flex-grow items-center justify-between">
                <Search />
                {(type === PAGE.PROOF || type === PAGE.ACTIVITY) && <IsExternal />}
                {type === PAGE.USER && <UserQuery />}
            </div>
            {type !== PAGE.PROOF && type !== PAGE.MY_ACTIVITIES && type !== PAGE.MY_SCORES && (
                <button
                    onClick={() => dispatch(openModal({ type: MODAL.ADD[type] }))}
                    className="ml-4 flex items-center space-x-2 rounded-xl bg-primary px-3 py-2 text-white"
                >
                    <FaPlus className="h-3 w-3" />
                    <span className="text-xs font-bold tracking-wide">
                        {type === PAGE.MY_PROOFS ? "Submit proof for external activity" : "Add new"}
                    </span>
                </button>
            )}
        </div>
    )
}

export default TableToolbar
