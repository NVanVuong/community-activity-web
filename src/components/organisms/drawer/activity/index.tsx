import React from "react"
import { Drawer, Tag } from "antd"
import { IActivity } from "@/interfaces/activity.interface"
import { ACTIVITY_STATUS_COLOR, ACTIVITY_STATUS_TEXT } from "@/utils/enums/status.enum"
import { ThumbnailPlaceholder } from "@/assets/images"
import {
    CalendarOutlined,
    CheckCircleOutlined,
    EnvironmentOutlined,
    StarOutlined,
    TeamOutlined
} from "@ant-design/icons"
import { formatDate } from "@/utils/helpers"

interface ActivityDrawerProps {
    title: string
    placement?: "top" | "right" | "bottom" | "left"
    width?: number | string
    open: boolean
    onClose: () => void
    activity: IActivity
}

const ActivityDetail: React.FC<ActivityDrawerProps> = ({
    title,
    placement = "right",
    width = 600,
    open,
    onClose,
    activity
}) => {
    const {
        address,
        description,
        endDate,
        endRegistration,
        id,
        image,
        isExternal,
        maxParticipants,
        name,
        organization,
        participants,
        score,
        startDate,
        startRegistration,
        status,
        subcategory
    } = activity

    const subcategoryName = subcategory?.name

    return (
        <Drawer title={title} placement={placement} width={width} onClose={onClose} open={open}>
            <div className="mx-auto p-8">
                <div className="overflow-hidden rounded-lg bg-white shadow-lg">
                    <div className="relative h-64 bg-gray-200">
                        <img
                            src={image ? image : ThumbnailPlaceholder}
                            alt={name}
                            className="h-full w-full object-fill opacity-60"
                        />
                        <div className="absolute inset-0 bg-black opacity-25" />
                        <div className="absolute bottom-0 left-0 p-4 text-white">
                            <h1 className="text-3xl font-semibold">{name}</h1>
                            <p className="mt-2 text-lg">{organization}</p>
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="flex justify-between">
                            <p className="text-bl text-sm text-gray-500">
                                <span className="font-medium text-black">Activity ID:</span> {id}
                            </p>
                            <Tag className="m-0" color={ACTIVITY_STATUS_COLOR[status]}>
                                {ACTIVITY_STATUS_TEXT[status]}
                            </Tag>
                        </div>
                        <p className="text-md mt-2 text-gray-500">
                            <span className="font-medium text-black">Subcategory:</span> {subcategoryName}
                        </p>
                        <p className="text-md mt-2">
                            <span className="font-medium text-black">Description:</span>
                            <div className="ql-editor p-0 pb-2" dangerouslySetInnerHTML={{ __html: description }}></div>
                        </p>
                        <div className="mt-2 grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div className="flex items-center space-x-4 rounded-lg bg-gray-50 p-4 shadow-md">
                                <CalendarOutlined className="text-2xl text-gray-500" />
                                <div>
                                    <h3 className="font-semibold text-gray-800">Dates</h3>
                                    <p>Start: {formatDate(startDate)}</p>
                                    <p>End: {formatDate(endDate)}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4 rounded-lg bg-gray-50 p-4 shadow-md">
                                <CheckCircleOutlined className="text-2xl text-gray-500" />
                                <div>
                                    <h3 className="font-semibold text-gray-800">Registration</h3>
                                    <p>Start: {formatDate(startRegistration)}</p>
                                    <p>End: {formatDate(endRegistration)}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4 rounded-lg bg-gray-50 p-4 shadow-md">
                                <EnvironmentOutlined className="text-2xl text-gray-500" />
                                <div>
                                    <h3 className="font-semibold text-gray-800">Location</h3>
                                    <p>{address}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4 rounded-lg bg-gray-50 p-4 shadow-md">
                                <TeamOutlined className="text-2xl text-gray-500" />
                                <div>
                                    <h3 className="font-semibold text-gray-800">Participants</h3>
                                    <p>Max: {maxParticipants}</p>
                                    <p>Registered: {participants}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4 rounded-lg bg-gray-50 p-4 shadow-md">
                                <StarOutlined className="text-2xl text-gray-500" />
                                <div>
                                    <h3 className="font-semibold text-gray-800">Score</h3>
                                    <p>{score}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4 rounded-lg bg-gray-50 p-4 shadow-md">
                                <CheckCircleOutlined className="text-2xl text-gray-500" />
                                <div>
                                    <h3 className="font-semibold text-gray-800">External</h3>
                                    <p>{isExternal ? "Yes" : "No"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Drawer>
    )
}

export default ActivityDetail
