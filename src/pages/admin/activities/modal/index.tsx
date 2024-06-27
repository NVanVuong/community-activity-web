import { useAppSelector } from "@/redux/hook"
import ViewActivity from "./view"
import Modal from "@/components/organisms/modal"
import { MODAL } from "@/utils/constants/modal"
import AddActivity from "./add"
import { IActivity } from "@/interfaces/activity.interface"
import DeleteActivity from "./delete"
import UpdateActivity from "./update"
import ViewParticipants from "./participants"

const ModalActivities = () => {
    const type = useAppSelector((state) => state.modal.type)
    const activity = useAppSelector((state) => state.modal.data) as IActivity

    const getModalContent = () => {
        switch (type) {
            case MODAL.ADD.ACTIVITY:
                return <AddActivity title="Create Activity" />
            case MODAL.UPDATE.ACTIVITY:
                return <UpdateActivity title="Update Activity" data={activity} />
            case MODAL.DELETE.ACTIVITY:
                return <DeleteActivity title="Delete Activity" data={activity} />
            case MODAL.VIEW.ACTIVITY:
                return <ViewActivity title="Activity Overview" data={activity} />
            case MODAL.VIEW.PARTICIPANT:
                return <ViewParticipants title="List Participants" data={activity} />
            default:
                return null
        }
    }

    return <Modal>{getModalContent()}</Modal>
}

export default ModalActivities
