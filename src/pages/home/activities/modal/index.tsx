import { useAppSelector } from "@/redux/hook"
import Modal from "@/components/organisms/modal"
import { MODAL } from "@/utils/constants/modal"
import RegisterActivity from "./register"
import { IActivity } from "@/interfaces/activity.interface"

const ModalActivity = () => {
    const type = useAppSelector((state) => state.modal.type)
    const activity = useAppSelector((state) => state.modal.data) as IActivity

    const getModalContent = () => {
        switch (type) {
            case MODAL.REGISTER.ACTIVITY:
                return <RegisterActivity title="Register Activity" data={activity} />
            default:
                return null
        }
    }

    return <Modal>{getModalContent()}</Modal>
}

export default ModalActivity
