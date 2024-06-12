import { ColumnsType } from "antd/es/table"
import { AlignType } from "rc-table/lib/interface"
import { FaEllipsis } from "react-icons/fa6"
import { Dropdown, Space, Spin, Tag } from "antd"
import { useMenuActions } from "../hooks/useMenuActions"
import Table from "@/components/organisms/table"
import { useAppSelector } from "@/redux/hook"
import { useGetMyActivitiesQuery } from "@/redux/services/activities/activities.service"
import { formatDate } from "@/utils/helpers"
import { USER_ACTIVITY_STATUS, USER_ACTIVITY_STATUS_COLOR, USER_ACTIVITY_STATUS_TEXT } from "@/utils/enums/status.enum"
import { IActivity } from "@/interfaces/activity.interface"
import { IUserActivity } from "@/interfaces/useractivity.interface"

const TableManageMyActivites = () => {
    const keyword = useAppSelector((state) => state.search.keyword)
    const { data, isLoading } = useGetMyActivitiesQuery({ keyword: keyword })

    const myActivitiesData = data?.data as IUserActivity[]

    const myActivitiesInternal = myActivitiesData?.filter((activity) => !activity.activity.isExternal)
    const myActivitiesExternal = myActivitiesData?.filter((activity) => activity.activity.isExternal)

    const getMenuActions = useMenuActions()

    const columnsOfInternalActivity: ColumnsType<IUserActivity> = [
        {
            title: <span className=" font-bold">Index</span>,
            align: "center" as AlignType,
            key: "inex",
            width: "4%",
            render: (_, __, index) => <span className=" text-sm font-semibold">{index + 1}</span>
        },
        {
            title: <span className="font-bold">Activity</span>,
            key: "activity",
            dataIndex: "activity",
            width: "25%",
            render: (activity: IActivity) => <span className="text-sm font-medium">{activity.name}</span>
        },
        {
            title: <span className="font-bold">Organizer</span>,
            key: "organizer",
            dataIndex: "activity",
            width: "25%",
            render: (activity: IActivity) => <span className="text-sm font-medium">{activity.organizer}</span>
        },
        {
            title: <span className="font-bold">Status</span>,
            align: "center" as AlignType,
            key: "status",
            width: "15%",
            filters: [
                {
                    text: "Registerd",
                    value: USER_ACTIVITY_STATUS.REGISTERED
                },
                {
                    text: "Canceled",
                    value: USER_ACTIVITY_STATUS.CANCELED
                },
                {
                    text: "Submitted",
                    value: USER_ACTIVITY_STATUS.SUBMITTED
                },
                {
                    text: "Approved",
                    value: USER_ACTIVITY_STATUS.APPROVED
                },
                {
                    text: "Rejected",
                    value: USER_ACTIVITY_STATUS.REJECTED
                }
            ],
            onFilter: (value, record) => record.status === value,
            render: (record: IUserActivity) => (
                <Tag color={USER_ACTIVITY_STATUS_COLOR[record.status]} className="w-fit text-xs font-medium">
                    {USER_ACTIVITY_STATUS_TEXT[record.status]}
                </Tag>
            )
        },
        {
            title: <span className="font-bold">Start date</span>,
            align: "center" as AlignType,
            key: "startDate",
            dataIndex: "activity",
            width: "10%",
            sorter: (a, b) => new Date(a.activity.startDate).getTime() - new Date(b.activity.startDate).getTime(),
            render: (activity: IActivity) => (
                <span className="text-sm font-medium">{formatDate(activity.startDate)}</span>
            )
        },
        {
            title: <span className="font-bold">End date</span>,
            align: "center" as AlignType,
            key: "endDate",
            dataIndex: "activity",
            width: "10%",
            sorter: (a, b) => new Date(a.activity.endDate).getTime() - new Date(b.activity.endDate).getTime(),
            render: (activity: IActivity) => <span className="text-sm font-medium">{formatDate(activity.endDate)}</span>
        },
        {
            title: <span className="font-bold">Score</span>,
            align: "center" as AlignType,
            key: "score",
            dataIndex: "activity",
            width: "6%",
            sorter: (a, b) => a.activity.score - b.activity.score,
            render: (activity: IActivity) => <span className="text-sm font-medium">{activity.score}</span>
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

    const columnsOfExternalActivity: ColumnsType<IUserActivity> = [
        {
            title: <span className="font-bold">Index</span>,
            align: "center" as AlignType,
            key: "index",
            width: "4%",
            render: (_, __, index) => <span className="text-sm font-semibold">{index + 1}</span>
        },
        {
            title: <span className="font-bold">Activity</span>,
            key: "activity",
            dataIndex: "activity",
            width: "25%",
            render: (activity: IActivity) => <span className="text-sm font-medium">{activity.name}</span>
        },
        {
            title: <span className="font-bold">Subcategory</span>,
            key: "subcategory",
            dataIndex: "activity",
            width: "25%",
            render: (activity: IActivity) => <span className="text-sm font-medium">{activity.subcategory.name}</span>
        },
        {
            title: <span className="font-bold">Status</span>,
            align: "center" as AlignType,
            key: "status",
            width: "15%",
            filters: [
                {
                    text: "Submitted",
                    value: USER_ACTIVITY_STATUS.SUBMITTED
                },
                {
                    text: "Approved",
                    value: USER_ACTIVITY_STATUS.APPROVED
                },
                {
                    text: "Rejected",
                    value: USER_ACTIVITY_STATUS.REJECTED
                }
            ],
            onFilter: (value, record) => record.status === value,
            render: (record: IUserActivity) => (
                <Tag color={USER_ACTIVITY_STATUS_COLOR[record.status]} className="w-fit text-xs font-medium">
                    {USER_ACTIVITY_STATUS_TEXT[record.status]}
                </Tag>
            )
        },
        {
            title: <span className="font-bold">Start date</span>,
            align: "center" as AlignType,
            key: "startDate",
            dataIndex: "activity",
            width: "10%",
            sorter: (a, b) => new Date(a.activity.startDate).getTime() - new Date(b.activity.startDate).getTime(),
            render: (activity: IActivity) => (
                <span className="text-sm font-medium">{formatDate(activity.startDate)}</span>
            )
        },
        {
            title: <span className="font-bold">End date</span>,
            align: "center" as AlignType,
            key: "endDate",
            dataIndex: "activity",
            width: "10%",
            sorter: (a, b) => new Date(a.activity.endDate).getTime() - new Date(b.activity.endDate).getTime(),
            render: (activity: IActivity) => <span className="text-sm font-medium">{formatDate(activity.endDate)}</span>
        },
        {
            title: <span className="font-bold">Score</span>,
            align: "center" as AlignType,
            key: "score",
            dataIndex: "activity",
            width: "6%",
            sorter: (a, b) => a.activity.score - b.activity.score,
            render: (activity: IActivity) => <span className="text-sm font-medium">{activity.score}</span>
        },
        {
            title: <span className="text-center font-bold">Action</span>,
            align: "center" as AlignType,
            key: "action",
            width: "6%",
            render: (record: IUserActivity) => {
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
        <div className="home rounded-xl bg-white px-2 shadow-md">
            <h1 className="mb-4 ml-4 pt-4 text-sm font-semibold">Activities within the University</h1>
            <Spin spinning={isLoading}>
                <Table
                    pageSize={9}
                    pagination={{ position: ["bottomRight"] }}
                    dataSource={myActivitiesInternal}
                    columns={columnsOfInternalActivity}
                    rowKey={(record) => record.id}
                />
            </Spin>

            {myActivitiesExternal?.length > 0 && (
                <>
                    <h1 className="mb-4 ml-4 border-t border-gray-200 pt-4 text-sm font-semibold">
                        Activities outside the University
                    </h1>

                    <Spin spinning={isLoading}>
                        <Table
                            pageSize={9}
                            pagination={{ position: ["bottomRight"] }}
                            dataSource={myActivitiesExternal}
                            columns={columnsOfExternalActivity}
                            rowKey={(record) => record.id}
                        />
                    </Spin>
                </>
            )}
        </div>
    )
}

export default TableManageMyActivites
