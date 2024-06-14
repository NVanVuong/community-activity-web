import { Button, DatePicker, Form, Input, Select, Spin } from "antd"
import useServerMessage from "@/hooks/useServerMessage"
import Title from "@/components/molecules/title-modal"
import { IModal } from "@/redux/features/modal/modal.slice"
import Editor from "@/components/organisms/editor"
import { useEffect, useState } from "react"
import { AiOutlineUpload } from "react-icons/ai"
import { createProofExternalData, normFile } from "@/utils/helpers"
import { ImgCropUpload } from "@/components/molecules/imgcrop-upload"
import { useSubmitProofExternalMutation } from "@/redux/services/proofs/proofs.service"
import { useGetCategoriesQuery } from "@/redux/services/categories/categories.service"
import { ISubcategory } from "@/interfaces/categories.interface"

const SubmitProofExternal = (props: IModal) => {
    const { title } = props
    const [submitProofExternal, { data, error, isLoading }] = useSubmitProofExternalMutation()
    const { data: categories, isLoading: isLoadingCategories } = useGetCategoriesQuery({ keyword: "" })
    const [subcategories, setSubcategories] = useState(categories?.data[0]?.subcategories || [])
    const [description, setDescription] = useState("")

    const [subcategorySelected, setSubcategorySelected] = useState({} as ISubcategory)

    useEffect(() => {
        if (categories?.data && categories.data.length > 0) {
            setSubcategories(categories.data[0].subcategories)
        }
    }, [categories?.data])

    useServerMessage({ data: data!, error: error })

    const onFinish = async (values: any) => {
        const formData = createProofExternalData(values)

        formData.append("description", description)

        for (const pair of formData.entries()) {
            console.log(pair[0], pair[1])
        }

        await submitProofExternal(formData)
    }

    const handleCategoryChange = (value: any) => {
        const selectedCategory = categories?.data.find((category) => category.id === value)
        if (selectedCategory) {
            setSubcategories(selectedCategory.subcategories)
        }
    }

    const handleSubcategoryChange = (value: any) => {
        const selectedSubcategory = subcategories.find((subcategory) => subcategory.id === value)
        if (selectedSubcategory) setSubcategorySelected(selectedSubcategory)
    }

    console.log(subcategorySelected)

    return (
        <div className="w-208">
            <Spin spinning={isLoading}>
                <Title>{title}</Title>
                <Form
                    onFinish={onFinish}
                    requiredMark={false}
                    layout="vertical"
                    className="flex w-full flex-col items-center"
                    initialValues={{
                        categoryId: categories?.data[0]?.id
                    }}
                >
                    <div className="flex w-full gap-6">
                        <div className="w-1/2">
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
                                name="subcategoryId"
                                rules={[{ required: true }]}
                            >
                                <Select placeholder="Subcategory" onChange={handleSubcategoryChange} className="h-10">
                                    {subcategories &&
                                        subcategories.map((subcategory) => (
                                            <Select.Option value={subcategory.id} key={subcategory.id}>
                                                {subcategory.name}
                                            </Select.Option>
                                        ))}
                                </Select>
                            </Form.Item>

                            <Form.Item
                                className="w-full"
                                name="score"
                                label={
                                    <span className="font-semibold">
                                        {subcategorySelected &&
                                        subcategorySelected.minScore !== undefined &&
                                        subcategorySelected.maxScore !== undefined
                                            ? `Score (score of this subcategory is between ${subcategorySelected.minScore} and ${subcategorySelected.maxScore})`
                                            : "Score"}
                                    </span>
                                }
                                rules={[{ required: true, message: "Please input score!" }]}
                            >
                                <Input placeholder="Score" className="h-10" />
                            </Form.Item>

                            <Form.Item
                                className="w-full"
                                name="name"
                                label={<span className="font-semibold">Name</span>}
                                rules={[{ required: true, message: "Please input name!" }]}
                            >
                                <Input placeholder="Name" className="h-10" />
                            </Form.Item>
                        </div>
                        <div className="w-1/2">
                            <Form.Item
                                className="w-full"
                                name="address"
                                label={<span className="font-semibold">Address</span>}
                                rules={[{ required: true, message: "Please input address!" }]}
                            >
                                <Input placeholder="Address" className="h-10" />
                            </Form.Item>

                            <Form.Item
                                className="w-full"
                                name="startDate"
                                label={<span className="font-semibold">Start Date</span>}
                                rules={[{ required: true, message: "Please input start date!" }]}
                            >
                                <DatePicker placeholder="Start Date" className="h-10 w-full" />
                            </Form.Item>

                            <Form.Item
                                className="w-full"
                                name="endDate"
                                label={<span className="font-semibold">End Date</span>}
                                rules={[{ required: true, message: "Please input end date!" }]}
                            >
                                <DatePicker placeholder="End Date" className="h-10 w-full" />
                            </Form.Item>

                            <Form.Item
                                className="w-full"
                                name="image"
                                label={<span className="font-semibold">Image of proof</span>}
                                valuePropName="fileList"
                                getValueFromEvent={normFile}
                            >
                                <ImgCropUpload
                                    action="https://run.mocky.io/v3/b98772c8-2841-47e3-a05e-5e616fc11261"
                                    headers={{
                                        authorization: "authorization-text",
                                        "Access-Control-Allow-Origin": "*"
                                    }}
                                    listType="picture"
                                >
                                    <Button
                                        icon={<AiOutlineUpload className="-mr-2 h-5 w-5" />}
                                        className="flex h-10 flex-row-reverse items-center justify-between gap-2"
                                    >
                                        Upload proof
                                    </Button>
                                </ImgCropUpload>
                            </Form.Item>
                        </div>
                    </div>

                    <Editor description={description} setDescription={setDescription} />

                    <Button type="primary" htmlType="submit" className="mt-6 h-10 w-full bg-primary text-white">
                        Finish
                    </Button>
                </Form>
            </Spin>
        </div>
    )
}

export default SubmitProofExternal
