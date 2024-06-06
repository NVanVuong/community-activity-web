import { Button, Form, Input, InputNumber, Spin } from "antd"
import useServerMessage from "@/hooks/useServerMessage"
import Title from "@/components/molecules/title-modal"
import { IModal } from "@/redux/features/modal/modal.slice"
import { useCreateSubcategoryMutation } from "@/redux/services/categories/categories.slice"

const AddSubategory = (props: IModal) => {
    const { title, data: category } = props
    const [createSubcategory, { data, error, isLoading }] = useCreateSubcategoryMutation()

    const onFinish = async (values: any) => {
        await createSubcategory({
            categoryIndex: Number(category.index),
            ...values
        })
    }

    useServerMessage({ data: data!, error: error })

    return (
        <Spin spinning={isLoading}>
            <Title>{title}</Title>
            <Form
                onFinish={onFinish}
                layout="vertical"
                requiredMark={false}
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
                    name="minScore"
                    label={<span className="font-semibold">Min Score</span>}
                    rules={[{ required: true, message: "Please input min score!" }]}
                >
                    <InputNumber placeholder="Min Score" className="h-10 w-full" />
                </Form.Item>

                <Form.Item
                    className="w-full"
                    name="maxScore"
                    label={<span className="font-semibold">Max Score</span>}
                    rules={[{ required: true, message: "Please input max score!" }]}
                >
                    <InputNumber placeholder="Max Score" className="h-10 w-full" />
                </Form.Item>

                <Button type="primary" htmlType="submit" className="h-10 w-full bg-primary text-white">
                    Finish
                </Button>
            </Form>
        </Spin>
    )
}

export default AddSubategory
