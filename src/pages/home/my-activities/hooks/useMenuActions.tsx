import { HiOutlineViewfinderCircle } from "react-icons/hi2"
import { useAppDispatch } from "@/redux/hook"
import { openModal } from "@/redux/features/modal/modal.slice"
import { MenuProps } from "antd"
import { MODAL } from "@/utils/constants/modal"
import { MdAppRegistration, MdOutlineCancel } from "react-icons/md"
import { USER_ACTIVITY_STATUS } from "@/utils/enums/status.enum"
import { LuFileCheck2 } from "react-icons/lu"

export const useMenuActions = () => {
    const dispacth = useAppDispatch()

    return (record: any) =>
        [
            {
                label: (
                    <div
                        onClick={() => {
                            dispacth(openModal({ type: MODAL.VIEW.ACTIVITY, data: record }))
                        }}
                        className="flex justify-between font-medium text-gray-500"
                    >
                        View <HiOutlineViewfinderCircle className="ml-2.5 h-5 w-5" />
                    </div>
                ),
                key: "view"
            },
            record.status === USER_ACTIVITY_STATUS.CANCELED && {
                label: (
                    <div
                        onClick={() => dispacth(openModal({ type: MODAL.REGISTER.ACTIVITY, data: record }))}
                        className="flex justify-between font-medium text-lime-500"
                    >
                        Register <MdAppRegistration className="ml-2.5 h-5 w-5" />
                    </div>
                ),
                key: "register"
            },
            record.status === USER_ACTIVITY_STATUS.REGISTERED && {
                label: (
                    <div
                        onClick={() => dispacth(openModal({ type: MODAL.CANCEL.ACTIVITY, data: record }))}
                        className="flex justify-between font-medium text-orange-500"
                    >
                        Cancel <MdOutlineCancel className="ml-2.5 h-5 w-5" />
                    </div>
                ),
                key: "cancel"
            },
            record.status === USER_ACTIVITY_STATUS.REGISTERED && {
                label: (
                    <div
                        onClick={() => dispacth(openModal({ type: MODAL.SUBMIT.PROOF, data: record }))}
                        className="flex justify-between font-medium text-cyan-500"
                        style={{
                            pointerEvents: new Date(record.activity.startDate) > new Date() ? "none" : "auto",
                            opacity: new Date(record.activity.startDate) > new Date() ? 0.2 : 1
                        }}
                    >
                        Submit <LuFileCheck2 className="ml-2.5 h-5 w-5" />
                    </div>
                ),
                key: "delete",
                disabled: new Date(record.activity.startDate) > new Date()
            }
        ] as MenuProps["items"]
}
