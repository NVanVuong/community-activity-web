import { Spin } from "antd"
import { IModal } from "@/redux/features/modal/modal.slice"
import Title from "@/components/molecules/title-modal"
import StudentsList from "./classes-list"
import { useGetClassesByFacultyQuery } from "@/redux/services/classes/classes.service"

const ViewClass = (props: IModal) => {
    const { data, isLoading } = useGetClassesByFacultyQuery({ facultyId: props.id })

    return (
        <div className="w-160">
            <Spin spinning={isLoading}>
                <Title>{props.title}</Title>
                {isLoading ? null : <StudentsList classes={data!.data} />}
            </Spin>
        </div>
    )
}

export default ViewClass
