import { IModal } from "@/redux/features/modal/modal.slice"
import Title from "@/components/molecules/title-modal"
import { Descriptions, Image } from "antd"
import { IActivity } from "@/interfaces/activity.interface"

const ViewActivity = (props: IModal) => {
    const activity = props.data as IActivity
    console.log(activity)

    return (
        <div className="w-192">
            <Title>{props.title}</Title>
            <div className="ql-editor" dangerouslySetInnerHTML={{ __html: activity.description }}></div>
            {/* <Image src={activity.image} alt={activity.name} /> */}
            <Descriptions bordered column={1}>
                <Descriptions.Item label="Start Date">{activity.startDate.toString()}</Descriptions.Item>
                <Descriptions.Item label="End Date">{activity.endDate.toString()}</Descriptions.Item>
                <Descriptions.Item label="Address">{activity.address}</Descriptions.Item>
                <Descriptions.Item label="Organizer">{activity.organizer}</Descriptions.Item>
                <Descriptions.Item label="Max Participants">{activity.maxParticipants}</Descriptions.Item>
                <Descriptions.Item label="Participants">{activity.participants}</Descriptions.Item>
                <Descriptions.Item label="Status">{activity.status}</Descriptions.Item>
            </Descriptions>
        </div>
    )
}

export default ViewActivity
