import { TbTrashX } from "react-icons/tb"
import { HiOutlineViewfinderCircle } from "react-icons/hi2"
import { useAppDispatch } from "@/redux/hook"
import { openModal } from "@/redux/features/modal/modal.slice"
import { MenuProps } from "antd"
import { MODAL } from "@/utils/constants/modal"

export const useMenuActions = (setOpen: any, setUser: any) => {
    const dispacth = useAppDispatch()

    return (record: any) =>
        [
            {
                label: (
                    <div
                        onClick={() => {
                            setOpen(true)
                            setUser(record)
                        }}
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
                        onClick={() => dispacth(openModal({ type: MODAL.DELETE.USER, data: record }))}
                        className="flex justify-between font-medium text-red-500"
                    >
                        Delete <TbTrashX className="ml-2.5 h-5 w-5" />
                    </div>
                ),
                key: "update"
            }
        ] as MenuProps["items"]
}
