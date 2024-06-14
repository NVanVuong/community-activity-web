import { Button, Form, Input, Spin } from "antd"
import useServerMessage from "@/hooks/useServerMessage"
import Title from "@/components/molecules/title-modal"
import { IModal } from "@/redux/features/modal/modal.slice"
import { useUpdateCategoryMutation } from "@/redux/services/categories/categories.service"

const UpdateCategory = (props: IModal) => {
    const { title, data: categoryData } = props
    const [updateCategory, { data, error, isLoading }] = useUpdateCategoryMutation()

    useServerMessage({ data: data!, error: error })

    const onFinish = async (values: any) => {
        await updateCategory({
            id: categoryData.id,
            ...values
        })
    }

    const initialValue = {
        name: categoryData.name,
        index: categoryData.index
    }

    return (
        <Spin spinning={isLoading}>
            <Title>{title}</Title>
            <Form
                onFinish={onFinish}
                initialValues={initialValue}
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
                    name="index"
                    label={<span className="font-semibold">Index</span>}
                    rules={[{ required: true, message: "Please input index!" }]}
                >
                    <Input placeholder="Index" className="h-10" />
                </Form.Item>

                <Button type="primary" htmlType="submit" className="h-10 w-full bg-primary text-white">
                    Finish
                </Button>
            </Form>
        </Spin>
    )
}

export default UpdateCategory
