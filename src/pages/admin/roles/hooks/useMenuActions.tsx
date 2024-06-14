import { TbTrashX } from "react-icons/tb"
import { HiOutlineViewfinderCircle } from "react-icons/hi2"
import { useAppDispatch } from "@/redux/hook"
import { openModal } from "@/redux/features/modal/modal.slice"
import { MenuProps } from "antd"
import { MODAL } from "@/utils/constants/modal"
import { MdFormatListBulletedAdd } from "react-icons/md"

export const useMenuActions = () => {
    const dispacth = useAppDispatch()

    return (record: any) =>
        [
            {
                label: (
                    <div
                        onClick={() => dispacth(openModal({ type: MODAL.ADD.SUBCATEGORY, data: record }))}
                        className="flex justify-between font-medium text-primary"
                    >
                        Add Subcategories <MdFormatListBulletedAdd className="ml-2.5 h-5 w-5" />
                    </div>
                ),
                key: "add"
            },
            {
                label: (
                    <div
                        onClick={() => dispacth(openModal({ type: MODAL.VIEW.ROLE, data: record }))}
                        className="flex justify-between font-medium text-gray-500"
                    >
                        View Subcategories <HiOutlineViewfinderCircle className="ml-2.5 h-5 w-5" />
                    </div>
                ),
                key: "view"
            },
            {
                label: (
                    <div
                        onClick={() => dispacth(openModal({ type: MODAL.DELETE.ROLE, data: record }))}
                        className="flex justify-between font-medium text-red-500"
                    >
                        Delete <TbTrashX className="ml-2.5 h-5 w-5" />
                    </div>
                ),
                key: "delete"
            }
        ] as MenuProps["items"]
}
