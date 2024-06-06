import { TbEdit, TbTrashX } from "react-icons/tb"
import { useAppDispatch } from "@/redux/hook"
import { closeModal, openModal } from "@/redux/features/modal/modal.slice"
import { MenuProps } from "antd"
import { MODAL } from "@/utils/constants/modal"

export const useMenuActions = () => {
    const dispacth = useAppDispatch()

    return (record: any) =>
        [
            {
                label: (
                    <div
                        onClick={() => dispacth(openModal({ type: MODAL.UPDATE.SUBCATEGORY, data: record }))}
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
                        onClick={() => {
                            console.log("vao day", record)
                            dispacth(closeModal())
                            dispacth(openModal({ type: MODAL.DELETE.SUBCATEGORY, data: record }))
                        }}
                        className="flex justify-between font-medium text-red-500"
                    >
                        Delete <TbTrashX className="ml-2.5 h-5 w-5" />
                    </div>
                ),
                key: "delete"
            }
        ] as MenuProps["items"]
}
