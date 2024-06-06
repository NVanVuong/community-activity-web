import { Button, Form, Input, Spin } from "antd"
import useServerMessage from "@/hooks/useServerMessage"
import Title from "@/components/molecules/title-modal"
import { IModal } from "@/redux/features/modal/modal.slice"
import { useCreateFacultyMutation } from "@/redux/services/faculties/faculties.service"

const AddFaculty = (props: IModal) => {
    const { title } = props
    const [creatFaculty, { data, error, isLoading }] = useCreateFacultyMutation()

    useServerMessage({ data: data!, error: error })

    const onFinish = async (values: any) => {
        console.log(values)

        await creatFaculty(values)
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
                    name="code"
                    label={<span className="font-semibold">Code</span>}
                    rules={[{ required: true, message: "Please input code!" }]}
                >
                    <Input placeholder="Code" className="h-10" />
                </Form.Item>

                <Button type="primary" htmlType="submit" className="h-10 w-full bg-primary text-white">
                    Finish
                </Button>
            </Form>
        </Spin>
    )
}

export default AddFaculty
