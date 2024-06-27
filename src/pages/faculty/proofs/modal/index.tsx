import { useAppSelector } from "@/redux/hook"
import ViewProof from "./view"
import Modal from "@/components/organisms/modal"
import { MODAL } from "@/utils/constants/modal"
import { IProof } from "@/interfaces/proof.interface"

const ModalProofs = () => {
    const type = useAppSelector((state) => state.modal.type)
    const proof = useAppSelector((state) => state.modal.data) as IProof

    const getModalContent = () => {
        switch (type) {
            case MODAL.VIEW.PROOF:
                return <ViewProof title="Proof Detail" data={proof} />
            default:
                return null
        }
    }

    return <Modal>{getModalContent()}</Modal>
}

export default ModalProofs
