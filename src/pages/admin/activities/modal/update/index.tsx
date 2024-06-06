import { Button, DatePicker, Form, Input, Select, Spin } from "antd"
import useServerMessage from "@/hooks/useServerMessage"
import Title from "@/components/molecules/title-modal"
import { IModal } from "@/redux/features/modal/modal.slice"
import { useUpdateActivityMutation } from "@/redux/services/activities/activities.slice"
import { ImgCropUpload } from "@/components/molecules/imgcrop-upload"
import { createActivityFormData, normFile } from "@/utils/helpers"
import {  useState } from "react"
import { useGetCategoriesQuery } from "@/redux/services/categories/categories.slice"
import { AiOutlineUpload } from "react-icons/ai"
import Editor from "@/components/organisms/editor"
import { ISubcategory } from "@/interfaces/categories.interface"

const UpdateActivity = (props: IModal) => {
    const { title, data: activityData } = props
    const [updateActivity, { data, error, isLoading }] = useUpdateActivityMutation()
    const [description, setDescription] = useState(activityData.description)

    const { data: categories, isLoading: isLoadingCategories } = useGetCategoriesQuery({ keyword: "" })
    const [subcategories, setSubcategories] = useState<ISubcategory[]>([])

    const handleCategoryChange = async (value: any) => {
        const selectedCategory = categories?.data.find((category) => category.id === value)
        if (selectedCategory) {
            setSubcategories(selectedCategory.subcategories)
        }
    }

    const onFinish = async (values: any) => {
        const formData = createActivityFormData(values)

        formData.append("description", description)

        for (const pair of formData.entries()) {
            console.log(pair[0], pair[1])
        }

        await updateActivity({
            id: activityData.id,
            formData: formData
        })
    }

    useServerMessage({ data: data!, error: error })

    const initialValue = {
        categoryId: categories?.data.find(
            (category) =>
                category.subcategories.find((subcategory) => subcategory.id === activityData.subcategoryId)?.id
        )?.id,
        subcategoryId: activityData.subcategoryId,
        name: activityData.name,
        score: activityData.score,
        maxParticipants: activityData.maxParticipants,
        organizer: activityData.organizer,
        address: activityData.address,
        startDate: activityData.startDate,
        endDate: activityData.endDate,
        startRegistration: activityData.startRegistration,
        endRegistration: activityData.endRegistration
    }

    return (
        <div className="w-224">
            <Spin spinning={isLoading}>
                <Title>{title}</Title>
                <Form
                    onFinish={onFinish}
                    requiredMark={false}
                    initialValues={initialValue}
                    layout="vertical"
                    className="flex w-full flex-col items-center"
                >
                    <div className="flex w-full gap-8">
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
                                <Select placeholder="Subcategory" className="h-10">
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
                                name="name"
                                label={<span className="font-semibold">Name</span>}
                                rules={[{ required: true, message: "Please input name!" }]}
                            >
                                <Input placeholder="Name" className="h-10" />
                            </Form.Item>

                            <Form.Item
                                className="w-full"
                                name="image"
                                label={<span className="font-semibold">Thumbnail</span>}
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
                                        Upload thumbnail
                                    </Button>
                                </ImgCropUpload>
                            </Form.Item>
                        </div>

                        <div className="w-1/2">
                            <div className="flex w-full gap-4">
                                <Form.Item
                                    className="w-full"
                                    name="score"
                                    label={<span className="font-semibold">Score</span>}
                                    rules={[{ required: true, message: "Please input score!" }]}
                                >
                                    <Input placeholder="Score" className="h-10" />
                                </Form.Item>

                                <Form.Item
                                    className="w-full"
                                    name="maxParticipants"
                                    label={<span className="font-semibold">Max Participants</span>}
                                    rules={[{ required: true, message: "Please input max participants!" }]}
                                >
                                    <Input placeholder="Max Participants" className="h-10" />
                                </Form.Item>
                            </div>

                            <div className="flex w-full gap-4">
                                <Form.Item
                                    className="w-full"
                                    name="organizer"
                                    label={<span className="font-semibold">Organizer</span>}
                                    rules={[{ required: true, message: "Please input organizer!" }]}
                                >
                                    <Input placeholder="Organizer" className="h-10" />
                                </Form.Item>

                                <Form.Item
                                    className="w-full"
                                    name="address"
                                    label={<span className="font-semibold">Address</span>}
                                    rules={[{ required: true, message: "Please input address!" }]}
                                >
                                    <Input placeholder="Address" className="h-10" />
                                </Form.Item>
                            </div>

                            <div className="flex w-full gap-4">
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
                            </div>

                            <div className="flex w-full gap-4">
                                <Form.Item
                                    className="w-full"
                                    name="startRegistration"
                                    label={<span className="font-semibold">Start Registration</span>}
                                    rules={[{ required: true, message: "Please input start registration!" }]}
                                >
                                    <DatePicker placeholder="Start Registration" className="h-10 w-full" />
                                </Form.Item>

                                <Form.Item
                                    className="w-full"
                                    name="endRegistration"
                                    label={<span className="font-semibold">End Registration</span>}
                                    rules={[{ required: true, message: "Please input end registration!" }]}
                                >
                                    <DatePicker placeholder="End Registration" className="h-10 w-full" />
                                </Form.Item>
                            </div>
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

export default UpdateActivity
