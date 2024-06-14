import { Button, Form, Input, Spin } from "antd"
import useServerMessage from "@/hooks/useServerMessage"
import Title from "@/components/molecules/title-modal"
import { IModal } from "@/redux/features/modal/modal.slice"
import { useCreateRoleMutation } from "@/redux/services/roles/roles.service"

const AddRole = (props: IModal) => {
    const { title } = props
    const [createRole, { data, error, isLoading }] = useCreateRoleMutation()

    useServerMessage({ data: data!, error: error })

    const onFinish = async (values: any) => {
        await createRole(values)
    }

    return (
        <Spin spinning={isLoading}>
            <Title>{title}</Title>
            <Form
                onFinish={onFinish}
                requiredMark={false}
                layout="vertical"
                className="flex w-100 flex-col items-center"
            >
                <Form.Item
                    className="w-full"
                    name="name"
                    label={<span className="font-semibold">Name</span>}
                    rules={[{ required: true, message: "Please input name!" }]}
                >
                    <Input placeholder="Name" className="h-10" />
                </Form.Item>

                <Form.Item
                    className="w-full"
                    name="description"
                    label={<span className="font-semibold">Description</span>}
                    rules={[{ required: true, message: "Please input description!" }]}
                >
                    <Input placeholder="Description" className="h-10" />
                </Form.Item>

                <Button type="primary" htmlType="submit" className="h-10 w-full bg-primary text-white">
                    Finish
                </Button>
            </Form>
        </Spin>
    )
}

export default AddRole
