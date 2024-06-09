import { IModal } from "@/redux/features/modal/modal.slice"
import { USER_ACTIVITY_STATUS, USER_ACTIVITY_STATUS_COLOR, USER_ACTIVITY_STATUS_TEXT } from "@/utils/enums/status.enum"
import { Button, Descriptions, Image, Tag } from "antd"
import { IProof } from "@/interfaces/proof.interface"
import { IUser } from "@/interfaces/user.interface"
import { useState } from "react"
import StudentDetail from "@/components/organisms/drawer/student"
import ActivityDetail from "@/components/organisms/drawer/activity"
import { IActivity } from "@/interfaces/activity.interface"
import { useAprroveProofMutation, useRejectProofMutation } from "@/redux/services/proofs/proofs.service"
import useServerMessage from "@/hooks/useServerMessage"

const ViewProof = (props: IModal) => {
    const proof = props.data as IProof
    const {
        id,
        description,
        image,
        name,
        userActivity: { status, user, activity }
    } = proof

    const [isDrawerStudentOpen, setIsDrawerStudentOpen] = useState(false)
    const [isDrawerAcitivityOpen, setIsDrawerActivityOpen] = useState(false)
    const [selectedStudent, setSelectedStudent] = useState({} as IUser)
    const [selectedActivity, setSelectedActivity] = useState({} as IActivity)

    const [approveProof, { data: aprrveData, error: approveError, isLoading: approveIsLoading }] =
        useAprroveProofMutation()
    const [rejectProof, { data: rejectData, error: rejectError, isLoading: rejectIsLoading }] = useRejectProofMutation()

    const showStudentDrawer = (record: IUser) => {
        setSelectedStudent(record)
        setIsDrawerStudentOpen(true)
    }

    const showActivityDrawer = (record: IActivity) => {
        setSelectedActivity(record)
        setIsDrawerActivityOpen(true)
    }

    useServerMessage({ data: aprrveData, error: approveError })
    useServerMessage({ data: rejectData, error: rejectError })

    return (
        <>
            <div className="w-160">
                <div className="p-6">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-xl font-semibold">{name}</h2>
                        <Tag className="!m-0" color={USER_ACTIVITY_STATUS_COLOR[status]}>
                            {USER_ACTIVITY_STATUS_TEXT[status]}
                        </Tag>
                    </div>
                    <Image src={image} alt={name} width={"100%"} className="rounded-md" />
                    <p className="text-gray-700">{description}</p>
                </div>

                <div className="border-t px-6 pt-6">
                    <Descriptions column={1}>
                        <Descriptions.Item label="Proof ID">{id}</Descriptions.Item>
                        <Descriptions.Item label="User">
                            <span
                                onClick={() => showStudentDrawer(user)}
                                className="font-medium text-primary underline underline-offset-1 transition duration-100 hover:cursor-pointer hover:no-underline"
                            >
                                {user.name}
                            </span>
                        </Descriptions.Item>
                        <Descriptions.Item label="Activity">
                            <span
                                onClick={() => showActivityDrawer(activity)}
                                className="font-medium text-primary underline underline-offset-1 transition duration-100 hover:cursor-pointer hover:no-underline"
                            >
                                {activity.name}
                            </span>
                        </Descriptions.Item>
                    </Descriptions>
                </div>
                {status === USER_ACTIVITY_STATUS.SUBMITTED_PROOF && (
                    <div className="flex w-full justify-end gap-4 border-t p-6">
                        <Button
                            onClick={() => approveProof({ id })}
                            loading={approveIsLoading}
                            className={`bg-green-500 !text-white transition duration-100 hover:!border-green-600 hover:!bg-green-600 hover:font-medium`}
                        >
                            Approve
                        </Button>
                        <Button
                            onClick={() => rejectProof({ id })}
                            loading={rejectIsLoading}
                            className={`bg-red-500 !text-white transition duration-100 hover:!border-red-600 hover:!bg-red-600 hover:font-medium`}
                        >
                            Reject
                        </Button>
                    </div>
                )}
            </div>
            <StudentDetail
                title="Student Details"
                placement="right"
                onClose={() => setIsDrawerStudentOpen(false)}
                open={isDrawerStudentOpen}
                student={selectedStudent}
            />
            <ActivityDetail
                title="Activity Details"
                placement="right"
                onClose={() => setIsDrawerActivityOpen(false)}
                open={isDrawerAcitivityOpen}
                width={800}
                activity={selectedActivity}
            />
        </>
    )
}

export default ViewProof
