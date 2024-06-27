import { Spin } from "antd"
import { IModal } from "@/redux/features/modal/modal.slice"
import Title from "@/components/molecules/title-modal"
import StudentsList from "./students-list"
import { useGetParticipantsQuery } from "@/redux/services/activities/activities.service"

const ViewParticipants = (props: IModal) => {
    const { data, isLoading } = useGetParticipantsQuery(props.data.id)
    const students = data?.data?.map((participant) => participant.user) || []

    return (
        <div className="w-176">
            <Spin spinning={isLoading}>
                <Title>{props.title}</Title>
                {isLoading ? null : <StudentsList students={students} />}
            </Spin>
        </div>
    )
}

export default ViewParticipants
