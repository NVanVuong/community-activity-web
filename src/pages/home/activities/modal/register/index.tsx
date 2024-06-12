import Title from "@/components/molecules/title-modal"
import useServerMessage from "@/hooks/useServerMessage"
import { IModal, closeModal } from "@/redux/features/modal/modal.slice"
import { useAppDispatch } from "@/redux/hook"
import { useRegisterActivityMutation } from "@/redux/services/activities/activities.service"
import { ACTIVITY_STATUS } from "@/utils/enums/status.enum"
import { Button, Spin } from "antd"

const RegisterActivity = (props: IModal) => {
    const { title, data: activity } = props
    const { id, name, status } = activity

    const dispatch = useAppDispatch()
    const [registerActivity, { data, error, isLoading }] = useRegisterActivityMutation()

    const onRegister = async () => {
        const result = await registerActivity(id)

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
                    Are you sure you want to {status === ACTIVITY_STATUS.REGISTERED ? "cancel" : "register"} the
                    activity <span className="font-semibold">{name}</span>?
                </p>
                <div className="flex w-full justify-end gap-4">
                    {status === ACTIVITY_STATUS.REGISTRATION_OPEN && (
                        <Button onClick={onRegister} loading={isLoading} type="primary">
                            Register
                        </Button>
                    )}
                    <Button onClick={() => dispatch(closeModal())} type="default">
                        Cancel
                    </Button>
                </div>
            </Spin>
        </div>
    )
}

export default RegisterActivity
