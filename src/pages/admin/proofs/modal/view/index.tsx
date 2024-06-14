import { IModal, closeModal } from "@/redux/features/modal/modal.slice"
import { USER_ACTIVITY_STATUS, USER_ACTIVITY_STATUS_COLOR, USER_ACTIVITY_STATUS_TEXT } from "@/utils/enums/status.enum"
import { Button, Form, Image, Input, Tag } from "antd"
import { IProof } from "@/interfaces/proof.interface"
import { IUser } from "@/interfaces/user.interface"
import { useState } from "react"
import StudentDetail from "@/components/organisms/drawer/student"
import ActivityDetail from "@/components/organisms/drawer/activity"
import { IActivity } from "@/interfaces/activity.interface"
import { useAprroveProofMutation, useRejectProofMutation } from "@/redux/services/proofs/proofs.service"
import useServerMessage from "@/hooks/useServerMessage"
import Title from "@/components/molecules/title-modal"
import { useAppDispatch } from "@/redux/hook"
import Comment from "@/components/molecules/comment"

const { TextArea } = Input

const ViewProof = (props: IModal) => {
    const title = props.title
    const proof = props.data as IProof
    const {
        id,
        description,
        image,
        name,
        comments,
        userActivity: { status, user, activity }
    } = proof

    const dispatch = useAppDispatch()

    const [isDrawerStudentOpen, setIsDrawerStudentOpen] = useState(false)
    const [isDrawerAcitivityOpen, setIsDrawerActivityOpen] = useState(false)
    const [selectedStudent, setSelectedStudent] = useState({} as IUser)
    const [selectedActivity, setSelectedActivity] = useState({} as IActivity)

    const [isCommentRequired, setIsCommentRequired] = useState(false)
    const [actionType, setActionType] = useState("")

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

    const [form] = Form.useForm()

    const handleApprove = () => {
        setActionType("approve")
        setIsCommentRequired(false)
        form.submit()
    }

    const handleReject = () => {
        setActionType("reject")
        setIsCommentRequired(true)
        form.submit()
    }

    const onFinish = async (values: any) => {
        if (actionType === "approve") {
            const result = await approveProof({
                id,
                ...(values.comment && { comment: values.comment })
            })

            if (result.data?.success) {
                dispatch(closeModal())
            }
        } else if (actionType === "reject") {
            const result = await rejectProof({ id, comment: values.comment })

            if (result.data?.success) {
                dispatch(closeModal())
            }
        }
    }

    return (
        <>
            <div className="w-160 px-6">
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
                    <div className="font-medium">
                        User:{" "}
                        <span
                            onClick={() => showStudentDrawer(user)}
                            className="text-primary underline underline-offset-1 transition duration-100 hover:cursor-pointer hover:no-underline"
                        >
                            {user.name}
                        </span>
                    </div>
                    <div className="font-medium">
                        Activity:{" "}
                        <span
                            onClick={() => showActivityDrawer(activity)}
                            className="text-primary underline underline-offset-1 transition duration-100 hover:cursor-pointer hover:no-underline"
                        >
                            {activity.name}
                        </span>
                    </div>
                </div>

                {status === USER_ACTIVITY_STATUS.SUBMITTED ? (
                    <Form
                        form={form}
                        onFinish={onFinish}
                        requiredMark={false}
                        layout="vertical"
                        className="mt-2 flex w-full flex-col items-center"
                    >
                        <Form.Item
                            name="comment"
                            className="w-full"
                            label={<span className="font-medium">Comment:</span>}
                            rules={[{ required: isCommentRequired, message: "Please provide a comment for rejection" }]}
                        >
                            <TextArea
                                rows={4}
                                placeholder={
                                    isCommentRequired
                                        ? "Please provide the reason for rejection"
                                        : "Optional comment for approval"
                                }
                                className="w-full"
                            />
                        </Form.Item>
                        <div className="flex w-full justify-end gap-4 border-t p-3">
                            <Button
                                onClick={handleApprove}
                                loading={approveIsLoading}
                                className={`bg-green-500 !text-white transition duration-100 hover:!border-green-600 hover:!bg-green-600 hover:font-medium`}
                            >
                                Approve
                            </Button>
                            <Button
                                onClick={handleReject}
                                loading={rejectIsLoading}
                                className={`bg-red-500 !text-white transition duration-100 hover:!border-red-600 hover:!bg-red-600 hover:font-medium`}
                            >
                                Reject
                            </Button>
                        </div>
                    </Form>
                ) : (
                    comments.length > 0 && (
                        <div className="mt-3 border-t pt-2">
                            <span className="block pb-1 font-medium">Comments:</span>
                            {comments.map((comment) => (
                                <Comment key={comment.id} {...comment} />
                            ))}
                        </div>
                    )
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
