import { IModal } from "@/redux/features/modal/modal.slice"
import { USER_ACTIVITY_STATUS_COLOR, USER_ACTIVITY_STATUS_TEXT } from "@/utils/enums/status.enum"
import { Image, Tag } from "antd"
import { IUserActivity } from "@/interfaces/useractivity.interface"
import { IProof } from "@/interfaces/proof.interface"
import { IActivity } from "@/interfaces/activity.interface"
import Title from "@/components/molecules/title-modal"
import ActivityDetail from "@/pages/home/activities/card-detail"
import { useState } from "react"

const ViewProof = (props: IModal) => {
    const title = props.title
    const myProof = props.data as IProof
    const myActivity = myProof.userActivity as IUserActivity
    const activity = myActivity.activity as IActivity

    const { id, description, image, name } = myProof

    const status = myActivity.status

    const [activitySelected, setActivitySelected] = useState<IActivity>({} as IActivity)
    const [isOpen, setIsOpen] = useState(false)

    const handleClick = (activity: IActivity) => {
        setIsOpen(true)
        setActivitySelected(activity)
    }

    return (
        <div className="mx-auto h-fit w-144 px-4">
            <Title>{title}</Title>
            <div className="relative flex flex-col gap-3 bg-white">
                <Tag className="absolute right-0 top-0 m-0" color={USER_ACTIVITY_STATUS_COLOR[status]}>
                    {USER_ACTIVITY_STATUS_TEXT[status]}
                </Tag>

                <p>
                    <span className="inline-block font-medium">Proof ID:</span> {id}
                </p>
                <p>
                    <span className="inline-block font-medium">Name:</span> {name}
                </p>
                <p>
                    <span className="inline-block font-medium">Score:</span> {activity.score}
                </p>
                <div>
                    <span className="mb-1 block font-medium">Description:</span>
                    <div className="ql-editor p-0" dangerouslySetInnerHTML={{ __html: description }}></div>
                </div>
                <div className="border-b">
                    <span className="mb-1 block font-medium">Proof:</span>
                    <Image className=" rounded-lg" src={image} alt={name} width={"100%"} height={"auto"} />
                </div>
                <p className="font-medium">
                    Activity:{" "}
                    <span
                        onClick={() => handleClick(activity)}
                        className="text-primary underline underline-offset-1 transition duration-100 hover:cursor-pointer hover:no-underline"
                    >
                        {" "}
                        {activity?.name}
                    </span>
                </p>
            </div>

            <ActivityDetail
                title="Activity Details"
                placement="right"
                onClose={() => {
                    setIsOpen(false)
                    setActivitySelected({} as IActivity)
                }}
                open={isOpen}
                width={800}
                activity={activitySelected}
            />
        </div>
    )
}

export default ViewProof
