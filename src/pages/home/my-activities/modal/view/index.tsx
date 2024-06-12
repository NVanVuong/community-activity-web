import { ThumbnailPlaceholder } from "@/assets/images"
import { IActivity } from "@/interfaces/activity.interface"
import { IModal } from "@/redux/features/modal/modal.slice"
import { USER_ACTIVITY_STATUS_COLOR, USER_ACTIVITY_STATUS_TEXT } from "@/utils/enums/status.enum"
import { formatDate } from "@/utils/helpers"
import { Tag } from "antd"
import {
    CalendarOutlined,
    TeamOutlined,
    EnvironmentOutlined,
    StarOutlined,
    CheckCircleOutlined
} from "@ant-design/icons"
import { IUserActivity } from "@/interfaces/useractivity.interface"

const ViewActivity = (props: IModal) => {
    const myActivity = props.data as IUserActivity
    const activity = props.data.activity as IActivity

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
        organizer,
        participants,
        score,
        startDate,
        startRegistration,

        subcategory
    } = activity

    const subcategoryName = subcategory?.name

    const status = myActivity.status

    return (
        <div className="mx-auto w-224 p-8">
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
                        <p className="mt-2 text-lg">{organizer}</p>
                    </div>
                </div>
                <div className="p-6">
                    <div className="flex justify-between">
                        <p className="text-sm text-gray-500">Activity ID: {id}</p>
                        <Tag color={USER_ACTIVITY_STATUS_COLOR[status]}>{USER_ACTIVITY_STATUS_TEXT[status]}</Tag>
                    </div>
                    <p className="text-md mt-2 text-gray-500">Subcategory: {subcategoryName}</p>
                    <div className="ql-editor" dangerouslySetInnerHTML={{ __html: description }}></div>
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
                                <p>Max: {maxParticipants === -1 ? "Unlimited" : maxParticipants}</p>
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
    )
}

export default ViewActivity
