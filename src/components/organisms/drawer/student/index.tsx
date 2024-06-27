import React from "react"
import { Drawer, Descriptions, Image } from "antd"
import { IUser } from "@/interfaces/user.interface"
import { AvatarDefault } from "@/assets/images"

interface StudentDrawerProps {
    title: string
    placement?: "top" | "right" | "bottom" | "left"
    width?: number | string
    open: boolean
    onClose?: () => void
    student?: IUser
}

const StudentDetail: React.FC<StudentDrawerProps> = ({
    title,
    placement = "right",
    width = 400,
    open,
    onClose,
    student
}) => {
    const { id, email, name, phoneNumber, role, avatar, score, clazz } = student || {}

    const className = clazz?.name
    const facultyName = clazz?.faculty?.name

    return (
        <Drawer title={title} placement={placement} width={width} onClose={onClose} open={open}>
            {student && (
                <div className="flex flex-col items-center">
                    <Image
                        width={100}
                        height={100}
                        src={avatar || AvatarDefault}
                        preview={false}
                        className="rounded-full ring-2 ring-primary ring-offset-2"
                    />
                    <Descriptions column={1} className="ml-4 mt-10">
                        <Descriptions.Item className="text-red-500" label="ID">
                            {id}
                        </Descriptions.Item>
                        <Descriptions.Item label="Name">{name}</Descriptions.Item>
                        <Descriptions.Item label="Email">{email || "N/A"}</Descriptions.Item>
                        <Descriptions.Item label="Phone">{phoneNumber || "N/A"}</Descriptions.Item>
                        <Descriptions.Item label="Score" className="font-bold text-primary">
                            {score}
                        </Descriptions.Item>
                        <Descriptions.Item label="Role" contentStyle={{ textTransform: "capitalize" }}>
                            {role?.name}
                        </Descriptions.Item>
                        <Descriptions.Item label="Class">{className}</Descriptions.Item>
                        <Descriptions.Item label="Faculty">{facultyName}</Descriptions.Item>
                    </Descriptions>
                </div>
            )}
        </Drawer>
    )
}

export default StudentDetail
