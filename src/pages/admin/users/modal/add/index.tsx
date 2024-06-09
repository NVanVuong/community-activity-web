import { Button, Form, Input, Select, Spin, Upload } from "antd"
import useServerMessage from "@/hooks/useServerMessage"
import Title from "@/components/molecules/title-modal"
import { useCreateUserMutation } from "@/redux/services/users/users.service"
import { IModal } from "@/redux/features/modal/modal.slice"
import { ROLE } from "@/utils/enums/role.enum"
import { useGetClassesQuery } from "@/redux/services/classes/classes.service"
import { IFaculty } from "@/interfaces/faculty.interface"
import { IClazz } from "@/interfaces/clazz.interface"
import { useGetFacultiesQuery } from "@/redux/services/faculties/faculties.service"
import { useState } from "react"

const AddUser = (props: IModal) => {
    const { title } = props
    const [createUser, { data, error, isLoading }] = useCreateUserMutation()
    const { data: classesData, isLoading: isLoadingClasses } = useGetClassesQuery({ keyword: "" })
    const { data: facultiesData, isLoading: isLoadingFaculties } = useGetFacultiesQuery({ keyword: "" })

    const [role, setRole] = useState(ROLE.USER)

    const classes = classesData?.data as IClazz[]
    const faculties = facultiesData?.data as IFaculty[]

    const onFinish = async (values: any) => {
        let convertedValues: any = { ...values }

        if (values.role === ROLE.USER) {
            convertedValues.score = Number(values.score)
        } else {
            delete convertedValues.score
        }

        console.log("Received values of form: ", convertedValues)
        await createUser(convertedValues)
    }

    useServerMessage({ data: data!, error: error })

    return (
        <div className="w-112">
            <Spin spinning={isLoading}>
                <Title>{title}</Title>
                <Form
                    onFinish={onFinish}
                    requiredMark={false}
                    layout="vertical"
                    className="flex w-full flex-col items-center"
                >
                    <Form.Item
                        label={<span className="font-semibold">Role</span>}
                        className="w-full"
                        name="role"
                        initialValue={role}
                        rules={[{ required: true, message: "Role is required!" }]}
                    >
                        <Select
                            onChange={(value) => {
                                setRole(value)
                            }}
                            placeholder="Role"
                            className="h-10"
                        >
                            <Select.Option value={ROLE.FACULTY}>Faculty</Select.Option>
                            <Select.Option value={ROLE.CLASS}>Class</Select.Option>
                            <Select.Option value={ROLE.USER}>User</Select.Option>
                        </Select>
                    </Form.Item>

                    {role === ROLE.FACULTY ? (
                        <Form.Item
                            className="w-full"
                            name="facultyId"
                            label={<span className="font-semibold">Faculty</span>}
                            rules={[{ required: true }]}
                        >
                            <Select
                                placeholder="Faculty"
                                className="h-10"
                                loading={isLoadingFaculties}
                                showSearch
                                optionFilterProp="children"
                                filterOption={(input: any, option: any) =>
                                    option &&
                                    option.children &&
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {faculties?.map((faculty) => (
                                    <Select.Option value={faculty.id} key={faculty.id}>
                                        {faculty.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    ) : (
                        <Form.Item
                            className="w-full"
                            name="clazzId"
                            label={<span className="font-semibold">Class</span>}
                            rules={[{ required: true }]}
                        >
                            <Select
                                placeholder="Class"
                                className="h-10"
                                loading={isLoadingClasses}
                                showSearch
                                optionFilterProp="children"
                                filterOption={(input: any, option: any) =>
                                    option &&
                                    option.children &&
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {classes?.map((clazz) => (
                                    <Select.Option value={clazz.id} key={clazz.id}>
                                        {clazz.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    )}

                    {role === ROLE.USER && (
                        <>
                            <Form.Item
                                className="w-full"
                                name="studentId"
                                label={<span className="font-semibold">Student ID</span>}
                                rules={[{ required: true, message: "StudendID is required!" }]}
                            >
                                <Input placeholder="Student ID" className="h-10" />
                            </Form.Item>
                            <Form.Item
                                className="w-full"
                                name="name"
                                label={<span className="font-semibold">Name</span>}
                                rules={[{ required: true, message: "Name is required!" }]}
                            >
                                <Input placeholder="Name" className="h-10" />
                            </Form.Item>
                            <Form.Item
                                className="w-full"
                                name="score"
                                label={<span className="font-semibold">Score (if already have)</span>}
                            >
                                <Input placeholder="Score" className="h-10" />
                            </Form.Item>
                        </>
                    )}

                    <Form.Item className="w-full">
                        <Button type="primary" htmlType="submit" className="h-10 bg-primary text-white">
                            Finish
                        </Button>
                    </Form.Item>
                </Form>
            </Spin>
        </div>
    )
}

export default AddUser
