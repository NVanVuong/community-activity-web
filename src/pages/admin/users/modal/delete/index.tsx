import Title from "@/components/molecules/title-modal"
import useServerMessage from "@/hooks/useServerMessage"
import { IModal, closeModal } from "@/redux/features/modal/modal.slice"
import { useAppDispatch } from "@/redux/hook"
import { useDeleteUserMutation } from "@/redux/services/users/users.service"
import { Button, Spin } from "antd"

const DeleteUser = (props: IModal) => {
    const { title, data: user } = props
    const { id, name } = user

    const [deleteUser, { data, error, isLoading }] = useDeleteUserMutation()
    const dispatch = useAppDispatch()

    const onDelete = async () => {
        const result = await deleteUser(id)
        if (result.data?.success) {
            dispatch(closeModal())
        }
    }

    useServerMessage({ data: data!, error: error })

    return (
        <Spin spinning={isLoading} className="flex flex-col items-center">
            <Title>{title}</Title>

            <p className=" mb-8 text-center font-medium">Are you sure you want to delete the {name} user?</p>
            <div className="flex w-full justify-end">
                <Button
                    onClick={onDelete}
                    loading={isLoading}
                    className={`border-none bg-red-500 !text-white transition duration-100 hover:!bg-red-600 hover:bg-opacity-70`}
                >
                    Delete{" "}
                </Button>
            </div>
        </Spin>
    )
}

export default DeleteUser
