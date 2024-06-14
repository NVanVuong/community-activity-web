import { ColumnsType } from "antd/es/table"
import { AlignType } from "rc-table/lib/interface"
import { FaEllipsis } from "react-icons/fa6"
import { Badge, Dropdown, Progress, Space, Spin } from "antd"
import { useMenuActions } from "../hooks/useMenuActions"
import Table from "@/components/organisms/table"
import { useAppSelector } from "@/redux/hook"
import { useGetActivitiesQuery } from "@/redux/services/activities/activities.service"
import { formatDate } from "@/utils/helpers"
import { ACTIVITY_STATUS, ACTIVITY_STATUS_COLOR, ACTIVITY_STATUS_TEXT } from "@/utils/enums/status.enum"
import { IActivity } from "@/interfaces/activity.interface"

const TableManageActivites = () => {
    const keyword = useAppSelector((state) => state.search.keyword)
    const isExternal = useAppSelector((state) => state.search.isExternal)
    const { data, isLoading } = useGetActivitiesQuery({ keyword: keyword })

    const activitiesData = data?.data as IActivity[]

    const activities = isExternal
        ? activitiesData?.filter((activity) => activity.isExternal)
        : activitiesData?.filter((activity) => !activity.isExternal)

    const getMenuActions = useMenuActions()

    const columns: ColumnsType<IActivity> = [
        {
            title: <span className=" font-bold">Index</span>,
            align: "center" as AlignType,
            key: "inex",
            width: "4%",
            render: (_, __, index) => <span className=" text-sm font-semibold">{index + 1}</span>
        },
        {
            title: <span className="font-bold">Name</span>,
            key: "name",
            dataIndex: "name",
            width: "25%",
            render: (name: string) => <span className="text-sm font-medium">{name}</span>
        },
        {
            title: <span className="font-bold">Organization</span>,
            key: "organizer",
            dataIndex: "organizer",
            width: "25%",
            render: (organizer: string) => <span className="text-sm font-medium">{organizer}</span>
        },
        {
            title: <span className="font-bold">Status</span>,
            key: "status",
            width: "15%",
            filters: [
                { text: "Registration Open", value: ACTIVITY_STATUS.REGISTRATION_OPEN },
                { text: "Registration Expired", value: ACTIVITY_STATUS.REGISTRATION_EXPIRED },
                { text: "Completed", value: ACTIVITY_STATUS.COMPLETED }
            ],
            onFilter: (value, record) => record.status === value,
            render: (record: IActivity) => (
                <Badge
                    color={ACTIVITY_STATUS_COLOR[record.status]}
                    className="flex items-center text-xs font-medium"
                    text={ACTIVITY_STATUS_TEXT[record.status]}
                ></Badge>
            )
        },
        {
            title: <span className="font-bold">Start date</span>,
            align: "center" as AlignType,
            key: "startDate",
            dataIndex: "startDate",
            width: "10%",
            sorter: (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
            render: (startDate: Date) => <span className="text-sm font-medium">{formatDate(startDate)}</span>
        },
        {
            title: <span className="font-bold">End date</span>,
            align: "center" as AlignType,
            key: "endDate",
            dataIndex: "endDate",
            width: "10%",
            sorter: (a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime(),
            render: (endDate: Date) => <span className="text-sm font-medium">{formatDate(endDate)}</span>
        },
        {
            title: <span className="font-bold">Score</span>,
            align: "center" as AlignType,
            key: "score",
            dataIndex: "score",
            width: "6%",
            sorter: (a, b) => a.score - b.score,
            render: (score: number) => <span className="text-sm font-medium">{score}</span>
        },
        {
            title: <span className="font-bold">Participants</span>,
            align: "center" as AlignType,
            key: "participants",
            width: "10%",
            sorter: (a, b) => a.participants - b.participants,
            render: (record: IActivity) => (
                <>
                    {record.maxParticipants === -1 ? (
                        <span className="text-xs font-bold">{record.participants}/Unlimited</span>
                    ) : (
                        <div className="flex flex-col items-center justify-center">
                            <span className="text-xs font-bold">
                                {record.participants}/{record.maxParticipants}
                            </span>
                            <Progress
                                percent={Number((record.participants / record.maxParticipants) * 100)}
                                showInfo={false}
                                className="-mt-1 h-4 w-24"
                            />
                        </div>
                    )}
                </>
            )
        },
        {
            title: <span className="text-center font-bold">Action</span>,
            align: "center" as AlignType,
            key: "action",
            width: "6%",
            render: (record: IActivity) => {
                const menuActions = getMenuActions(record)

                return (
                    <Dropdown menu={{ items: menuActions }} trigger={["click"]} placement="bottomRight" arrow>
                        <Space>
                            <FaEllipsis className="cursor-pointer text-center text-lg" />
                        </Space>
                    </Dropdown>
                )
            }
        }
    ]

    return (
        <Spin spinning={isLoading}>
            <Table pageSize={9} dataSource={activities} columns={columns} rowKey={(record) => record.id} />
        </Spin>
    )
}

export default TableManageActivites
