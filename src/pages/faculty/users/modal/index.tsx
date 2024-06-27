import { useAppSelector } from "@/redux/hook"
import { IUser } from "@/interfaces/user.interface"
import Modal from "@/components/organisms/modal"
import { MODAL } from "@/utils/constants/modal"
import AddUser from "./add"
import DeleteUser from "./delete"

const ModalUser = () => {
    const type = useAppSelector((state) => state.modal.type)
    const userData = useAppSelector((state) => state.modal.data) as IUser

    const getModalContent = () => {
        switch (type) {
            case MODAL.ADD.USER:
                return <AddUser title="Create User" />
            case MODAL.DELETE.USER:
                return <DeleteUser title="Delete User" data={userData} />
            default:
                return null
        }
    }

    return <Modal>{getModalContent()}</Modal>
}

export default ModalUser
