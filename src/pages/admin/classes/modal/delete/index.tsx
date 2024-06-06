import Title from "@/components/molecules/title-modal"
import useServerMessage from "@/hooks/useServerMessage"
import { IModal, closeModal } from "@/redux/features/modal/modal.slice"
import { useAppDispatch } from "@/redux/hook"
import { useDeleteClassMutation } from "@/redux/services/classes/classes.service"
import { Button, Spin } from "antd"

const DeleteClass = (props: IModal) => {
    const { title, data: classData } = props
    const { id, name } = classData

    const [deleteClass, { data, error, isLoading }] = useDeleteClassMutation()
    const dispatch = useAppDispatch()

    const onDelete = async () => {
        const result = await deleteClass(id)
        if (result.data?.success) {
            dispatch(closeModal())
        }
    }

    useServerMessage({ data: data!, error: error })

    return (
        <Spin spinning={isLoading} className="flex flex-col items-center">
            <Title>{title}</Title>

            <p className=" mb-8 text-center font-medium">Are you sure you want to delete the {name} class?</p>
            <div className="flex w-full justify-end">
                <Button
                    onClick={onDelete}
                    loading={isLoading}
                    className={`border-none bg-red-500  text-white hover:bg-opacity-70`}
                >
                    Delete{" "}
                </Button>
            </div>
        </Spin>
    )
}

export default DeleteClass
