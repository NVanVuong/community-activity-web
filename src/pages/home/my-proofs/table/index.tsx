import { ColumnsType } from "antd/es/table"
import { AlignType } from "rc-table/lib/interface"
import { FaEllipsis } from "react-icons/fa6"
import { Dropdown, Space, Spin, Tag } from "antd"
import { useMenuActions } from "../hooks/useMenuActions"
import Table from "@/components/organisms/table"
import { useAppSelector } from "@/redux/hook"
import { USER_ACTIVITY_STATUS, USER_ACTIVITY_STATUS_COLOR, USER_ACTIVITY_STATUS_TEXT } from "@/utils/enums/status.enum"
import { IActivity } from "@/interfaces/activity.interface"
import { IUserActivity } from "@/interfaces/useractivity.interface"
import { useGetMyProofsQuery } from "@/redux/services/proofs/proofs.service"
import { IProof } from "@/interfaces/proof.interface"

const TableManageMyProops = () => {
    const keyword = useAppSelector((state) => state.search.keyword)
    const { data, isLoading } = useGetMyProofsQuery({ keyword: keyword })

    const myProofsData = data?.data as IProof[]

    const myProofsInternal = myProofsData?.filter((proof) => !proof.userActivity.activity.isExternal)
    const myProofsExternal = myProofsData?.filter((proof) => proof.userActivity.activity.isExternal)

    const getMenuActions = useMenuActions()

    const columnsOfInternalProofs: ColumnsType<IProof> = [
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
            dataIndex: "userActivity",
            width: "30%",
            render: (userActivity: IUserActivity) => (
                <span className="text-sm font-medium">{userActivity.activity.name}</span>
            )
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
            onFilter: (value, record) => record.userActivity.status === value,
            render: (record: IProof) => (
                <Tag
                    color={USER_ACTIVITY_STATUS_COLOR[record.userActivity.status]}
                    className="w-fit text-xs font-medium"
                >
                    {USER_ACTIVITY_STATUS_TEXT[record.userActivity.status]}
                </Tag>
            )
        },
        {
            title: <span className="font-bold">Score</span>,
            align: "center" as AlignType,
            key: "score",
            dataIndex: "userActivity",
            width: "6%",
            sorter: (a, b) => a.userActivity.activity.score - b.userActivity.activity.score,
            render: (userActivity: IUserActivity) => (
                <span className="text-sm font-medium">{userActivity.activity.score}</span>
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

    const columnsOfExternalProof: ColumnsType<IProof> = [
        {
            title: <span className="font-bold">Index</span>,
            align: "center" as AlignType,
            key: "index",
            width: "4%",
            render: (_, __, index) => <span className="text-sm font-semibold">{index + 1}</span>
        },
        {
            title: <span className="font-bold">Activity</span>,
            key: "name",
            dataIndex: "name",
            width: "20%",
            render: (name: string) => <span className="text-sm font-medium">{name}</span>
        },
        {
            title: <span className="font-bold">Subcategory</span>,
            key: "subcategory",
            dataIndex: "userActivity",
            width: "30%",
            render: (userActivity: IUserActivity) => (
                <span className="text-sm font-medium">{userActivity.activity.subcategory?.name}</span>
            )
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
            onFilter: (value, record) => record.userActivity.status === value,
            render: (record: IProof) => (
                <Tag
                    color={USER_ACTIVITY_STATUS_COLOR[record.userActivity.status]}
                    className="w-fit text-xs font-medium"
                >
                    {USER_ACTIVITY_STATUS_TEXT[record.userActivity.status]}
                </Tag>
            )
        },
        {
            title: <span className="font-bold">Score</span>,
            align: "center" as AlignType,
            key: "score",
            dataIndex: "userActivity",
            width: "6%",
            sorter: (a, b) => a.userActivity.activity.score - b.userActivity.activity.score,
            render: (userActivity: IUserActivity) => (
                <span className="text-sm font-medium">{userActivity.activity.score}</span>
            )
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
            <h1 className="mb-4 ml-4 pt-4 text-sm font-semibold">Proofs of activities within the University</h1>
            <Spin spinning={isLoading}>
                <Table
                    pageSize={9}
                    pagination={{ position: ["bottomRight"] }}
                    dataSource={myProofsInternal}
                    columns={columnsOfInternalProofs}
                    rowKey={(record) => record.id}
                />
            </Spin>

            {myProofsExternal?.length > 0 && (
                <>
                    <h1 className="mb-4 ml-4 border-t border-gray-200 pt-4 text-sm font-semibold">
                        Proofs of activities outside the University
                    </h1>

                    <Spin spinning={isLoading}>
                        <Table
                            pageSize={9}
                            pagination={{ position: ["bottomRight"] }}
                            dataSource={myProofsExternal}
                            columns={columnsOfExternalProof}
                            rowKey={(record) => record.id}
                        />
                    </Spin>
                </>
            )}
        </div>
    )
}

export default TableManageMyProops
