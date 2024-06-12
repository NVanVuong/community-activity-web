import Title from "@/components/molecules/title-modal"
import useServerMessage from "@/hooks/useServerMessage"
import { IModal, closeModal } from "@/redux/features/modal/modal.slice"
import { useAppDispatch } from "@/redux/hook"
import { useCancelActivityMutation } from "@/redux/services/activities/activities.service"
import { Button, Spin } from "antd"

const CancelActivity = (props: IModal) => {
    const { title, data: myActivity } = props
    const { activity } = myActivity
    const { id, name } = activity

    const [cancelActivity, { data, error, isLoading }] = useCancelActivityMutation()
    const dispatch = useAppDispatch()

    const onCancel = async () => {
        const result = await cancelActivity(id)

        if (result.data?.success) {
            dispatch(closeModal())
        }
    }

    useServerMessage({ data: data!, error: error })

    return (
        <div className="w-100">
            <Spin spinning={isLoading} className="flex flex-col items-center">
                <Title>{title}</Title>

                <p className="mb-8 text-center font-medium">
                    Are you sure you want to cancel the activity <br /> <span className="font-semibold">{name}</span>?
                </p>
                <div className="flex w-full justify-end">
                    <Button
                        onClick={onCancel}
                        loading={isLoading}
                        className={`border-none bg-red-500 !text-white transition duration-100 hover:!bg-red-600 hover:bg-opacity-70`}
                    >
                        Cancel{" "}
                    </Button>
                </div>
            </Spin>
        </div>
    )
}

export default CancelActivity
