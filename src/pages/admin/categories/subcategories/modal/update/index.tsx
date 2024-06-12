import { Button, Form, Input, InputNumber, Spin } from "antd"
import useServerMessage from "@/hooks/useServerMessage"
import Title from "@/components/molecules/title-modal"
import { IModal } from "@/redux/features/modal/modal.slice"
import { useUpdateSubcategoryMutation } from "@/redux/services/categories/categories.slice"

const UpdateSubategory = (props: IModal) => {
    const { title, data: subcategory } = props
    const [updateSubcategory, { data, error, isLoading }] = useUpdateSubcategoryMutation()

    const onFinish = async (values: any) => {
        await updateSubcategory({
            id: subcategory.id,
            ...values
        })
    }

    const initialValues = {
        name: subcategory.name,
        minScore: subcategory.minScore,
        maxScore: subcategory.maxScore
    }

    useServerMessage({ data: data!, error: error })

    return (
        <Spin spinning={isLoading}>
            <Title>{title}</Title>
            <Form
                onFinish={onFinish}
                initialValues={initialValues}
                layout="horizontal"
                className="flex w-100 flex-col items-center"
            >
                <Form.Item className="w-full" name="name" rules={[{ required: true, message: "Please input name!" }]}>
                    <Input placeholder="Name" className="h-10" />
                </Form.Item>

                <Form.Item
                    className="w-full"
                    name="minScore"
                    rules={[{ required: true, message: "Please input min score!" }]}
                >
                    <InputNumber placeholder="Min Score" className="h-10 w-full" />
                </Form.Item>

                <Form.Item
                    className="w-full"
                    name="maxScore"
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

export default UpdateSubategory
