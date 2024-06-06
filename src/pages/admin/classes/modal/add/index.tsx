import { Button, Form, Input, Select, Spin } from "antd"
import useServerMessage from "@/hooks/useServerMessage"
import Title from "@/components/molecules/title-modal"
import { useCreateClassMutation, useGetAcademicYearsQuery } from "@/redux/services/classes/classes.service"
import { IModal } from "@/redux/features/modal/modal.slice"
import { useGetFacultiesQuery } from "@/redux/services/faculties/faculties.service"

const AddClass = (props: IModal) => {
    const { title } = props

    const [creatClass, { data, error, isLoading }] = useCreateClassMutation()

    const { data: facultiesData, isLoading: isLoadingFaculties } = useGetFacultiesQuery({ keyword: "" })
    const { data: academicYearsData, isLoading: isLoadingAcademicYears } = useGetAcademicYearsQuery()

    useServerMessage({ data: data!, error: error })

    const onFinish = async (values: any) => {
        await creatClass(values)
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
                    name="facultyId"
                    label={<span className="font-semibold">Faculty</span>}
                    rules={[{ required: true }]}
                >
                    <Select placement="topRight" placeholder="Faculty" className="h-10" loading={isLoadingFaculties}>
                        {facultiesData?.data.map((faculty) => (
                            <Select.Option value={faculty.id} key={faculty.id}>
                                {faculty.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    className="w-full"
                    name="academicYearId"
                    label={<span className="font-semibold">Academic Year</span>}
                    rules={[{ required: true }]}
                >
                    <Select
                        placement="topRight"
                        placeholder="Academic Year"
                        className="h-10"
                        loading={isLoadingAcademicYears}
                    >
                        {academicYearsData?.data.map((academicYear) => (
                            <Select.Option value={academicYear.id} key={academicYear.id}>
                                {academicYear.code}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Button type="primary" htmlType="submit" className="h-10 w-full bg-primary text-white">
                    Finish
                </Button>
            </Form>
        </Spin>
    )
}

export default AddClass
