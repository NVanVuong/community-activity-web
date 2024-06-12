import { useAppSelector } from "@/redux/hook"
import ViewActivity from "./view"
import Modal from "@/components/organisms/modal"
import { MODAL } from "@/utils/constants/modal"
import CancelActivity from "./cancel"
import { IUserActivity } from "@/interfaces/useractivity.interface"
import RegisterActivity from "./register"
import SubmitProof from "./submit"

const ModalActivities = () => {
    const type = useAppSelector((state) => state.modal.type)
    const myActivity = useAppSelector((state) => state.modal.data) as IUserActivity

    const getModalContent = () => {
        switch (type) {
            case MODAL.CANCEL.ACTIVITY:
                return <CancelActivity title="Cancel Activity" data={myActivity} />
            case MODAL.REGISTER.ACTIVITY:
                return <RegisterActivity title="Re-register Activity" data={myActivity} />
            case MODAL.VIEW.ACTIVITY:
                return <ViewActivity title="Activity Overview" data={myActivity} />
            case MODAL.SUBMIT.PROOF:
                return <SubmitProof title="Submit Proof" data={myActivity} />
            default:
                return null
        }
    }

    return <Modal>{getModalContent()}</Modal>
}

export default ModalActivities
