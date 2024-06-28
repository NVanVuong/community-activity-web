import { ColumnsType } from "antd/es/table"
import { AlignType } from "rc-table/lib/interface"
import { FaEllipsis } from "react-icons/fa6"
import { Badge, Dropdown, Space, Spin } from "antd"
import { useMenuActions } from "../hooks/useMenuActions"
import Table from "@/components/organisms/table"
import { useAppSelector } from "@/redux/hook"
import { USER_ACTIVITY_STATUS, USER_ACTIVITY_STATUS_COLOR, USER_ACTIVITY_STATUS_TEXT } from "@/utils/enums/status.enum"
import { IActivity } from "@/interfaces/activity.interface"
import { useGetProofsQuery } from "@/redux/services/proofs/proofs.service"
import { IProof } from "@/interfaces/proof.interface"

const TableManageProofs = () => {
    const keyword = useAppSelector((state) => state.search.keyword)
    const isExternal = useAppSelector((state) => state.search.isExternal)

    const { data, isLoading } = useGetProofsQuery({ keyword: keyword })

    const proofsData = data?.data as IProof[]

    const proofs = isExternal
        ? proofsData?.filter((proof) => proof.userActivity.activity.isExternal)
        : proofsData?.filter((proof) => !proof.userActivity.activity.isExternal)

    const getMenuActions = useMenuActions()

    const classNames = Array.from(new Set(proofs?.map((proof) => proof.userActivity.user.clazz.name) || []))
    const facultyCodes = Array.from(new Set(proofs?.map((proof) => proof.userActivity.user.clazz.faculty.code) || []))

    const columns: ColumnsType<IProof> = [
        {
            title: <span className=" font-bold">Index</span>,
            align: "center" as AlignType,
            key: "inex",
            width: "4%",
            render: (_, __, index) => <span className=" text-sm font-semibold">{index + 1}</span>
        },
        // {
        //     title: <span className="font-bold">Name</span>,
        //     key: "name",
        //     dataIndex: "name",
        //     width: "20%",
        //     render: (name: string) => <span className="text-sm font-medium">{name}</span>
        // },
        {
            title: <span className="font-bold">Activity</span>,
            key: "activity",
            width: "20%",
            render: (record: IProof) => <span className="text-sm font-medium">{record.userActivity.activity.name}</span>
        },
        {
            title: <span className="font-bold">Student</span>,
            key: "student",
            width: "15%",
            render: (record: IProof) => <span className="text-sm font-medium">{record.userActivity.user.name}</span>
        },
        {
            title: <span className="font-bold">Class</span>,
            align: "center" as AlignType,
            key: "class",
            width: "8%",
            filters: classNames.map((name) => ({ text: name, value: name })),
            onFilter: (value, record) => record.userActivity.user.clazz.name === value,
            render: (record: IProof) => (
                <span className="text-sm font-medium">{record.userActivity.user.clazz.name}</span>
            )
        },
        {
            title: <span className="font-bold">Faculty</span>,
            align: "center" as AlignType,
            key: "faculty",
            width: "8%",
            filters: facultyCodes.map((name) => ({ text: name, value: name })),
            onFilter: (value, record) => record.userActivity.user.clazz.faculty.code === value,
            render: (record: IProof) => (
                <span className="text-sm font-medium">{record.userActivity.user.clazz.faculty.code}</span>
            )
        },
        {
            title: <span className="font-bold">Score</span>,
            align: "center" as AlignType,
            key: "score",
            width: "8%",
            render: (record: IProof) => (
                <span className="text-sm font-medium">{record.userActivity.activity.score}</span>
            )
        },
        {
            title: <span className="font-bold">Status</span>,
            key: "status",
            width: "8%",
            filters: [
                { text: "Submitted", value: USER_ACTIVITY_STATUS.SUBMITTED },
                { text: "Approved", value: USER_ACTIVITY_STATUS.APPROVED },
                {
                    text: "Rejected",
                    value: USER_ACTIVITY_STATUS.REJECTED
                }
            ],
            onFilter: (value, record) => record.userActivity.status === value,
            render: (record: IProof) => (
                <Badge
                    color={USER_ACTIVITY_STATUS_COLOR[record.userActivity.status]}
                    className="flex items-center text-xs font-medium"
                    text={USER_ACTIVITY_STATUS_TEXT[record.userActivity.status]}
                ></Badge>
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
            <Table pageSize={9} dataSource={proofs} columns={columns} rowKey={(record) => record.id} />
        </Spin>
    )
}

export default TableManageProofs
