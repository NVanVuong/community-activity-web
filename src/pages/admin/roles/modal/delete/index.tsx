import Title from "@/components/molecules/title-modal"
import useServerMessage from "@/hooks/useServerMessage"
import { IModal, closeModal } from "@/redux/features/modal/modal.slice"
import { useAppDispatch } from "@/redux/hook"
import { useDeleteRoleMutation } from "@/redux/services/roles/roles.service"
import { Button, Spin } from "antd"

const DeleteRole = (props: IModal) => {
    const { title, data: role } = props
    const { id, name } = role

    const [deleteRole, { data, error, isLoading }] = useDeleteRoleMutation()
    const dispatch = useAppDispatch()

    const onDelete = async () => {
        const result = await deleteRole(id)

        if (result.data?.success) {
            dispatch(closeModal())
        }
    }

    useServerMessage({ data: data!, error: error })

    return (
        <div className="w-100">
            <Spin spinning={isLoading} className="flex flex-col items-center">
                <Title>{title}</Title>

                <p className=" mb-8 text-center font-medium">
                    Are you sure you want to delete the {name} role ?
                </p>
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
        </div>
    )
}

export default DeleteRole
