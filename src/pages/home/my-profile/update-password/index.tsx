import { Button, Form, Input, Spin } from "antd"
import useServerMessage from "@/hooks/useServerMessage"
import { IUpdatePassword } from "@/interfaces/user.interface"
import { useAppSelector } from "@/redux/hook"
import { useUpdatePasswordMutation } from "@/redux/services/users/users.service"
import { MODAL } from "@/utils/constants/modal"
import Modal from "@/components/organisms/modal"
import Title from "@/components/molecules/title-modal"

const ModalUpdatePassword = () => {
    const [updatePassword, { data, error, isLoading }] = useUpdatePasswordMutation()

    useServerMessage({ data: data!, error: error })

    const onFinish = async (values: any) => {
        const body: IUpdatePassword = {
            oldPassword: values.oldPassword,
            newPassword: values.newPassword
        }
        await updatePassword(body)
    }
    const type = useAppSelector((state) => state.modal.type)

    if (type !== MODAL.UPDATE.PASSWORD) return null

    return (
        <Modal>
            <div className="w-96">
                <Spin spinning={isLoading}>
                    <Title>Update Password</Title>
                    <Form
                        onFinish={onFinish}
                        requiredMark={false}
                        layout="vertical"
                        className="flex w-full flex-col items-center"
                    >
                        <Form.Item
                            className="w-full"
                            name="oldPassword"
                            label={<span className="bold whitespace-nowrap">Old Password</span>}
                            rules={[{ required: true, message: "Please input old password!" }]}
                        >
                            <Input.Password placeholder="Current Password" />
                        </Form.Item>

                        <Form.Item
                            className="w-full"
                            name="newPassword"
                            label={<span className="bold whitespace-nowrap">New Password</span>}
                            rules={[{ required: true, message: "Please input new password!" }]}
                        >
                            <Input.Password placeholder="New Password" />
                        </Form.Item>

                        <Form.Item
                            className="w-full"
                            name="confirmPassword"
                            label={<span className="bold whitespace-nowrap">Confirm Password</span>}
                            dependencies={["newPassword"]}
                            rules={[
                                {
                                    required: true,
                                    message: "Please input password!"
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue("newPassword") === value) {
                                            return Promise.resolve()
                                        }
                                        return Promise.reject(
                                            new Error("The new password that you entered do not match!")
                                        )
                                    }
                                })
                            ]}
                        >
                            <Input.Password placeholder="Confirm New Password" />
                        </Form.Item>

                        <Form.Item className="w-full">
                            <Button type="primary" htmlType="submit" className="h-10 bg-primary text-white">
                                Save
                            </Button>
                        </Form.Item>
                    </Form>
                </Spin>
            </div>
        </Modal>
    )
}

export default ModalUpdatePassword
