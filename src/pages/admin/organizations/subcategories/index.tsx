import { ColumnsType } from "antd/es/table"
import { AlignType } from "rc-table/lib/interface"
import Table from "@/components/organisms/table"
import { ISubcategory } from "@/interfaces/categories.interface"

const SubcategoriesList = ({ subcategories }: { subcategories: ISubcategory[] }) => {
    const columns: ColumnsType<ISubcategory> = [
        {
            title: <span className="font-bold">Index</span>,
            align: "center" as AlignType,
            key: "id",
            width: "10%",
            render: (_, __, index) => <span className="text-sm font-semibold">{index + 1}</span>
        },
        {
            title: <span className="font-bold">Name</span>,
            key: "name",
            dataIndex: "name",
            width: "40%",
            render: (name: string) => <span className="text-sm font-semibold">{name}</span>
        },
        {
            title: <span className="font-bold">Min Score</span>,
            align: "center" as AlignType,
            key: "minScore",
            dataIndex: "minScore",
            width: "20%",
            sorter: (a, b) => a.minScore - b.minScore,
            render: (minScore: number) => <span className="text-sm font-semibold">{minScore}</span>
        },
        {
            title: <span className="font-bold">Max Score</span>,
            align: "center" as AlignType,
            key: "maxScore",
            dataIndex: "maxScore",
            width: "20%",
            sorter: (a, b) => a.maxScore - b.maxScore,
            render: (maxScore: number) => <span className="text-sm font-semibold">{maxScore}</span>
        }
    ]

    return <Table dataSource={subcategories} columns={columns} rowKey={(record) => record.id} pagination={false} />
}

export default SubcategoriesList
