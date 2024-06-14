import { Button, Form, Select, Spin } from "antd"
import useServerMessage from "@/hooks/useServerMessage"
import Title from "@/components/molecules/title-modal"
import { IModal } from "@/redux/features/modal/modal.slice"
import { useAddSubcategoriesToOrganizationMutation } from "@/redux/services/organizations/organizations.service"
import { useGetCategoriesQuery } from "@/redux/services/categories/categories.service"
import { useEffect, useState } from "react"

const AddSubcategories = (props: IModal) => {
    const { title, data: organization } = props
    const { id } = organization
    const [addSubcategoriesToOrganization, { data, error, isLoading }] = useAddSubcategoriesToOrganizationMutation()
    const { data: categories, isLoading: isLoadingCategories } = useGetCategoriesQuery({ keyword: "" })

    const [subcategories, setSubcategories] = useState(categories?.data[0]?.subcategories || [])

    useEffect(() => {
        if (categories?.data && categories.data.length > 0) {
            setSubcategories(categories.data[0].subcategories)
        }
    }, [categories?.data])

    useServerMessage({ data: data!, error: error })

    const onFinish = async (values: any) => {
        await addSubcategoriesToOrganization({
            id,
            subcategoryIds: values.subcategoryIds
        })
    }

    const handleCategoryChange = async (value: any) => {
        const selectedCategory = categories?.data.find((category) => category.id === value)
        if (selectedCategory) {
            setSubcategories(selectedCategory.subcategories)
            form.setFieldsValue({
                subcategoryIds: []
            })
        }
    }

    const [form] = Form.useForm()

    useEffect(() => {
        form.setFieldsValue({
            categoryId: categories?.data[0]?.id
        })
    }, [categories])

    return (
        <div className="w-176">
            <Spin spinning={isLoading}>
                <Title>{title}</Title>
                <Form
                    form={form}
                    onFinish={onFinish}
                    requiredMark={false}
                    layout="vertical"
                    className="flex w-full flex-col items-center"
                >
                    <Form.Item
                        label={<span className="font-semibold">Category</span>}
                        className="w-full"
                        name="categoryId"
                    >
                        <Select
                            placement="topRight"
                            placeholder="Category"
                            className="h-10"
                            loading={isLoadingCategories}
                            onChange={handleCategoryChange}
                            defaultValue={categories?.data[0]?.id}
                        >
                            {categories?.data.map((category) => (
                                <Select.Option value={category.id} key={category.id}>
                                    {category.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label={<span className="font-semibold">Subcategory</span>}
                        className="w-full"
                        name="subcategoryIds"
                        rules={[{ required: true, message: "Please select at least one subcategory" }]}
                    >
                        <Select mode="multiple" placeholder="Subcategory">
                            {subcategories &&
                                subcategories.map((subcategory) => (
                                    <Select.Option value={subcategory.id} key={subcategory.id}>
                                        {subcategory.name}
                                    </Select.Option>
                                ))}
                        </Select>
                    </Form.Item>

                    <Button type="primary" htmlType="submit" className="h-10 w-full bg-primary text-white">
                        Finish
                    </Button>
                </Form>
            </Spin>
        </div>
    )
}

export default AddSubcategories
