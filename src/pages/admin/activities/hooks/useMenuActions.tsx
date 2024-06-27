import { TbEdit, TbTrashX } from "react-icons/tb"
import { HiOutlineViewfinderCircle } from "react-icons/hi2"
import { useAppDispatch } from "@/redux/hook"
import { openModal } from "@/redux/features/modal/modal.slice"
import { MenuProps } from "antd"
import { MODAL } from "@/utils/constants/modal"
import { GoPeople } from "react-icons/go"

export const useMenuActions = () => {
    const dispacth = useAppDispatch()

    return (record: any) =>
        [
            {
                label: (
                    <div
                        onClick={() => dispacth(openModal({ type: MODAL.VIEW.ACTIVITY, data: record }))}
                        className="flex justify-between font-medium text-gray-500"
                    >
                        View <HiOutlineViewfinderCircle className="ml-2.5 h-5 w-5" />
                    </div>
                ),
                key: "view"
            },
            {
                label: (
                    <div
                        onClick={() => dispacth(openModal({ type: MODAL.VIEW.PARTICIPANT, data: record }))}
                        className="flex justify-between font-medium text-green-500"
                    >
                        Participants <GoPeople className="ml-2.5 h-5 w-5" />
                    </div>
                ),
                key: "participant"
            },
            {
                label: (
                    <div
                        onClick={() => dispacth(openModal({ type: MODAL.UPDATE.ACTIVITY, data: record }))}
                        className="flex justify-between font-medium text-yellow-500"
                    >
                        Update <TbEdit className="ml-2.5 h-5 w-5" />
                    </div>
                ),
                key: "update"
            },
            {
                label: (
                    <div
                        onClick={() => dispacth(openModal({ type: MODAL.DELETE.ACTIVITY, data: record }))}
                        className="flex justify-between font-medium text-red-500"
                    >
                        Delete <TbTrashX className="ml-2.5 h-5 w-5" />
                    </div>
                ),
                key: "delete"
            }
        ] as MenuProps["items"]
}
