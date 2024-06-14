import { Button, Form, Input, Spin } from "antd"
import useServerMessage from "@/hooks/useServerMessage"
import Title from "@/components/molecules/title-modal"
import { IModal } from "@/redux/features/modal/modal.slice"
import { useCreateOrganizationMutation } from "@/redux/services/organizations/organizations.service"

const AddOrganization = (props: IModal) => {
    const { title } = props
    const [createOrganization, { data, error, isLoading }] = useCreateOrganizationMutation()

    useServerMessage({ data: data!, error: error })

    const onFinish = async (values: any) => {
        await createOrganization(values)
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

                <Button type="primary" htmlType="submit" className="h-10 w-full bg-primary text-white">
                    Finish
                </Button>
            </Form>
        </Spin>
    )
}

export default AddOrganization
