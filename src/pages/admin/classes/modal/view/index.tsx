import { Spin } from "antd"
import { useGetUsersByClassQuery } from "@/redux/services/users/users.service"
import { IModal } from "@/redux/features/modal/modal.slice"
import Title from "@/components/molecules/title-modal"
import StudentsList from "./students-list"

const ViewStudent = (props: IModal) => {
    const { data, isLoading } = useGetUsersByClassQuery({ classId: props.id })

    return (
        <div className="w-176">
            <Spin spinning={isLoading}>
                <Title>{props.title}</Title>
                {isLoading ? null : <StudentsList students={data!.data} />}
            </Spin>
        </div>
    )
}

export default ViewStudent
