import { ColumnsType } from "antd/es/table"
import { AlignType } from "rc-table/lib/interface"
import { Spin } from "antd"
import Table from "@/components/organisms/table"
import { useAppSelector } from "@/redux/hook"
import { USER_ACTIVITY_STATUS } from "@/utils/enums/status.enum"
import { IUserActivity } from "@/interfaces/useractivity.interface"
import { useGetMyProofsQuery } from "@/redux/services/proofs/proofs.service"
import { IProof } from "@/interfaces/proof.interface"

const TableManageMyScore = () => {
    const keyword = useAppSelector((state) => state.search.keyword)
    const { data, isLoading } = useGetMyProofsQuery({ keyword: keyword })

    const myProofsData = data?.data as IProof[]

    const myScores = myProofsData?.filter((proof) => proof.userActivity.status === USER_ACTIVITY_STATUS.APPROVED)

    const totalScore = myScores?.reduce((sum, proof) => sum + proof.userActivity.activity.score, 0)

    const columnsOfInternalProofs: ColumnsType<IProof> = [
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
            width: "20%",
            render: (name: string) => <span className="text-sm font-medium">{name}</span>
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
            title: <span className="font-bold">Score</span>,
            align: "center" as AlignType,
            key: "score",
            dataIndex: "userActivity",
            width: "15%",
            sorter: (a, b) => a.userActivity.activity.score - b.userActivity.activity.score,
            render: (userActivity: IUserActivity) => (
                <span className="text-sm font-bold text-green-500">+ {userActivity.activity.score}</span>
            )
        }
    ]

    return (
        <div className="home rounded-xl bg-white px-2 shadow-md">
            <Spin spinning={isLoading}>
                <Table
                    pageSize={9}
                    pagination={{ position: ["bottomRight"] }}
                    dataSource={myScores}
                    columns={columnsOfInternalProofs}
                    rowKey={(record) => record.id}
                    footer={() => (
                        <div className="mx-4 flex items-center justify-between font-bold">
                            Total Score: <span className="mr-20 pr-1 text-green-500">{totalScore}</span>
                        </div>
                    )}
                />
            </Spin>
        </div>
    )
}

export default TableManageMyScore
