import { Button, DatePicker, Form, Input, Select, Spin } from "antd"
import useServerMessage from "@/hooks/useServerMessage"
import Title from "@/components/molecules/title-modal"
import { IModal } from "@/redux/features/modal/modal.slice"
import { useCreateActivityMutation } from "@/redux/services/activities/activities.service"
import Editor from "@/components/organisms/editor"
import { useGetCategoriesQuery } from "@/redux/services/categories/categories.service"
import { useState } from "react"
import { AiOutlineUpload } from "react-icons/ai"
import { createActivityFormData, normFile } from "@/utils/helpers"
import { ImgCropUpload } from "@/components/molecules/imgcrop-upload"
import { ISubcategory } from "@/interfaces/categories.interface"
import { useGetOrganizationsQuery } from "@/redux/services/organizations/organizations.service"

const AddActivity = (props: IModal) => {
    const { title } = props

    const [createActivity, { data, error, isLoading }] = useCreateActivityMutation()
    const { data: categoriesData, isLoading: isLoadingCategories } = useGetCategoriesQuery({ keyword: "" })
    const { data: organizationsData, isLoading: isLoadingOrganizations } = useGetOrganizationsQuery({ keyword: "" })
    const categories = categoriesData?.data
    const organizations = organizationsData?.data.filter((organization: any) => organization.name !== "Khoa")

    const [description, setDescription] = useState("")
    const [subcategories, setSubcategories] = useState<any>([])
    const [subcategorySelected, setSubcategorySelected] = useState({} as ISubcategory)

    const [organizationSelected, setOrganizationSelected] = useState<string | undefined>(undefined)
    const [categorySelected, setCategorySelected] = useState<string | undefined>(undefined)

    useServerMessage({ data: data!, error: error })

    const onFinish = async (values: any) => {
        const formData = createActivityFormData(values)

        formData.append("description", description)

        for (const pair of formData.entries()) {
            console.log(pair[0], pair[1])
        }

        await createActivity(formData)
    }

    const handleOrganizationChange = async (value: any) => {
        const selectedOrganization = organizations?.find((organization) => organization.name === value)

        if (!selectedOrganization) {
            setSubcategories([])
            return
        }

        if (categorySelected) {
            const selectedCategory = categories?.find((category) => category.id === categorySelected)
            if (selectedCategory) {
                const filteredSubcategories = selectedCategory.subcategories.filter((subcategory) =>
                    selectedOrganization.subcategories.some((orgSub) => orgSub.id === subcategory.id)
                )
                setSubcategories(filteredSubcategories)
            } else {
                setSubcategories([])
            }
        } else {
            setSubcategories(selectedOrganization?.subcategories || [])
        }

        setOrganizationSelected(selectedOrganization?.name)
    }

    const handleCategoryChange = async (value: any) => {
        const selectedCategory = categories?.find((category) => category.id === value)

        if (!selectedCategory) {
            setSubcategories([])
            return
        }

        if (organizationSelected) {
            const selectedOrganization = organizations?.find(
                (organization) => organization.name === organizationSelected
            )
            if (selectedOrganization) {
                const filteredSubcategories = selectedCategory.subcategories.filter((subcategory) =>
                    selectedOrganization.subcategories.some((orgSub) => orgSub.id === subcategory.id)
                )
                setSubcategories(filteredSubcategories)
            } else {
                setSubcategories([])
            }
        } else {
            setSubcategories(selectedCategory.subcategories)
        }

        setCategorySelected(selectedCategory.id)
    }

    const handleSubcategoryChange = (value: any) => {
        const selectedSubcategory = subcategories.find((subcategory: any) => subcategory.id === value)
        if (selectedSubcategory) setSubcategorySelected(selectedSubcategory)
    }

    return (
        <div className="w-224">
            <Spin spinning={isLoading}>
                <Title>{title}</Title>
                <Form
                    onFinish={onFinish}
                    requiredMark={false}
                    layout="vertical"
                    className="flex w-full flex-col items-center"
                >
                    <div className="flex w-full gap-8">
                        <div className="w-1/2">
                            <Form.Item
                                label={<span className="font-semibold">Organization</span>}
                                className="w-full"
                                name="organization"
                            >
                                <Select
                                    placement="bottomRight"
                                    placeholder="Organization"
                                    className="h-10"
                                    loading={isLoadingOrganizations}
                                    onChange={handleOrganizationChange}
                                    value={organizationSelected}
                                >
                                    {organizations?.map((organization) => (
                                        <Select.Option value={organization.name} key={organization.id}>
                                            {organization.name}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>

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
                                    value={categorySelected}
                                >
                                    {categories?.map((category) => (
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
                                        subcategories.map((subcategory: any) => (
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
                                name="image"
                                label={<span className="font-semibold">Thumbnail</span>}
                                valuePropName="fileList"
                                getValueFromEvent={normFile}
                            >
                                <ImgCropUpload
                                    action="https://run.mocky.io/v3/fae6fba5-8ef1-45f8-93c2-6304edaedd3f"
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
                                    name="name"
                                    label={<span className="font-semibold">Name</span>}
                                    rules={[{ required: true, message: "Please input name!" }]}
                                >
                                    <Input placeholder="Name" className="h-10" />
                                </Form.Item>
                            </div>

                            <div className="flex w-full gap-4">
                                <Form.Item
                                    className="w-full"
                                    name="maxParticipants"
                                    label={<span className="font-semibold">Max Participants</span>}
                                    rules={[{ required: true, message: "Please input max participants!" }]}
                                >
                                    <Input placeholder="Max Participants" className="h-10" />
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

export default AddActivity
