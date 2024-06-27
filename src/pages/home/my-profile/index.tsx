import { Button, Form, Image, Input, Spin, Upload, UploadProps } from "antd"
import useAuth from "@/hooks/useAuth"
import { AiOutlineUpload } from "react-icons/ai"
import { createMyInfoFormData, normFile } from "@/utils/helpers"
import { RcFile, UploadChangeParam, UploadFile } from "antd/es/upload"
import { useEffect, useState } from "react"
import { setCredentials } from "@/redux/features/auth/auth.slice"
import { useAppDispatch } from "@/redux/hook"
import useServerMessage from "@/hooks/useServerMessage"
import { RiLockPasswordLine } from "react-icons/ri"
import { openModal } from "@/redux/features/modal/modal.slice"
import { MODAL } from "@/utils/constants/modal"
import { useGetMyInfoQuery, useUpdateMyInfoMutation } from "@/redux/services/users/users.service"
import ModalUpdatePassword from "./update-password"
import { ROLE } from "@/utils/enums/role.enum"
import Header from "@/components/organisms/header"

const MyProfile = () => {
    const dispatch = useAppDispatch()
    const { user, role } = useAuth()
    const [imageUrl, setImageUrl] = useState<string>()
    const [updateInfo, { data, error, isLoading: isLoadingUpdate }] = useUpdateMyInfoMutation()
    const { data: myInfoData, isLoading: isLoadingMyInfo } = useGetMyInfoQuery()

    const myInfo = myInfoData?.data

    const onFinish = async (values: any) => {
        const body = createMyInfoFormData(values)

        const res = await updateInfo(body)

        if (res.data!.success) {
            dispatch(setCredentials({ accessToken: res.data!.data.accessToken }))
        }
    }

    const getBase64 = (img: RcFile, callback: (url: string) => void) => {
        const reader = new FileReader()
        reader.addEventListener("load", () => callback(reader.result as string))
        reader.readAsDataURL(img)
    }

    const handleChange: UploadProps["onChange"] = (info: UploadChangeParam<UploadFile>) => {
        if (info.file.status === "uploading") {
            return
        }
        if (info.file.status === "done") {
            getBase64(info.file.originFileObj as RcFile, (url) => {
                setImageUrl(url)
            })
        }
    }
    const [form] = Form.useForm()

    useEffect(() => {
        form.setFieldsValue({
            name: myInfo?.user?.name,
            email: myInfo?.user?.email,
            phoneNumber: myInfo?.user?.phoneNumber || ""
        })
    }, [myInfo])

    useServerMessage({ data: data!, error: error })

    const isUser = role === ROLE.USER

    return (
        <>
            <Header />
            <div className="mx-auto mb-10 mt-32 w-160">
                <div className="w-full text-right">
                    <Button
                        className="hover:text-primary"
                        icon={<RiLockPasswordLine className=" h-5 w-5 " />}
                        onClick={() => dispatch(openModal({ type: MODAL.UPDATE.PASSWORD }))}
                    ></Button>
                </div>
                <div className="relative flex w-full min-w-0 flex-col break-words rounded-lg bg-white shadow-xl">
                    <div className="px-6">
                        <div className="flex flex-col items-center justify-center gap-6">
                            <div className="-mt-14 flex justify-center px-4">
                                <Image
                                    src={imageUrl ? imageUrl : user?.avatar}
                                    width={150}
                                    height={150}
                                    className="rounded-full ring-2 ring-primary ring-offset-4"
                                />
                            </div>
                            <h3 className="mb-4 text-xl font-bold">{user?.name}</h3>
                        </div>

                        <Spin spinning={isLoadingMyInfo}>
                            <>
                                {isUser ? (
                                    <>
                                        <div className="w-full px-4 text-center">
                                            <div className="text-center">
                                                <div className="flex w-full justify-center gap-8">
                                                    <p className="font-bold">
                                                        <span className="text-black">Score: </span>
                                                        <span className="text-primary">{myInfo?.user?.score}</span>
                                                    </p>
                                                    <p className="font-bold">
                                                        <span className="text-black">Total activities: </span>
                                                        <span className="text-primary">
                                                            {myInfo?.totalUserActivities}
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex w-full items-center gap-16">
                                            <div className="my-4 flex flex-col justify-between gap-2">
                                                <div>
                                                    <span className="font-bold">StudentID: </span>
                                                    {myInfo?.user?.studentId}
                                                </div>
                                                <div>
                                                    <span className="font-bold">Class: </span>
                                                    {myInfo?.user?.clazz?.name}
                                                </div>
                                                <div>
                                                    <span className="font-bold">Faculty: </span>
                                                    {myInfo?.user?.clazz?.faculty?.name}
                                                </div>
                                            </div>
                                        </div>{" "}
                                    </>
                                ) : null}
                            </>

                            <div className="mt-0 border-t border-gray-200 py-2">
                                <div className="flex flex-wrap justify-center">
                                    <Form
                                        layout="vertical"
                                        className="flex w-full flex-col items-center"
                                        onFinish={onFinish}
                                        form={form}
                                        onChange={(values) => console.log(values)}
                                    >
                                        <Form.Item
                                            className="w-full"
                                            label={<span style={{ fontWeight: "bold" }}>Name</span>}
                                            name="name"
                                        >
                                            <Input placeholder="Name" />
                                        </Form.Item>

                                        <Form.Item
                                            className="w-full"
                                            label={<span style={{ fontWeight: "bold" }}>Email</span>}
                                            name="email"
                                            rules={[
                                                {
                                                    type: "email",
                                                    message: "The input is not valid E-mail!"
                                                }
                                            ]}
                                        >
                                            <Input placeholder="Email" />
                                        </Form.Item>

                                        <Form.Item
                                            className="w-full"
                                            label={<span style={{ fontWeight: "bold" }}>Phone</span>}
                                            name="phoneNumber"
                                            rules={[
                                                {
                                                    pattern: new RegExp(/^\+?(84|0[35789])\d{8,9}$/),
                                                    message: "Please input a valid Viet Nam phone number"
                                                }
                                            ]}
                                        >
                                            <Input placeholder="Phone" />
                                        </Form.Item>
                                        <Form.Item
                                            className="w-full"
                                            name="avatar"
                                            label={
                                                <span
                                                    style={{
                                                        fontWeight: "bold"
                                                    }}
                                                >
                                                    Avatar
                                                </span>
                                            }
                                            valuePropName="fileList"
                                            getValueFromEvent={normFile}
                                        >
                                            <Upload
                                                action="https://run.mocky.io/v3/b98772c8-2841-47e3-a05e-5e616fc11261"
                                                headers={{
                                                    authorization: "authorization-text",
                                                    "Access-Control-Allow-Origin": "*"
                                                }}
                                                listType="picture"
                                                onChange={handleChange}
                                                maxCount={1}
                                            >
                                                <Button
                                                    icon={<AiOutlineUpload className="-mr-2 h-5 w-5" />}
                                                    className="flex flex-row-reverse items-center justify-between gap-2"
                                                >
                                                    Upload avatar
                                                </Button>
                                            </Upload>
                                        </Form.Item>

                                        <Form.Item className="w-full">
                                            <Button
                                                loading={isLoadingUpdate}
                                                type="primary"
                                                htmlType="submit"
                                                className="h-10 bg-primary text-white"
                                            >
                                                Save
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                </div>
                            </div>
                        </Spin>
                    </div>
                </div>
            </div>
            <ModalUpdatePassword />
        </>
    )
}

export default MyProfile
