import { ColumnsType } from "antd/es/table"
import { AlignType } from "rc-table/lib/interface"
import Table from "@/components/organisms/table"
import { IAcademicYear, IClazz } from "@/interfaces/clazz.interface"

const StudentsList = ({ classes }: { classes: IClazz[] }) => {
    const columns: ColumnsType<IClazz> = [
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
            width: "30%",
            sorter: (a, b) => a.name.localeCompare(b.name),
            render: (name: string) => <span className="text-sm font-semibold">{name}</span>
        },
        {
            title: <span className="font-bold">Academic Year</span>,
            key: "academicYear",
            dataIndex: "academicYear",
            width: "15%",
            sorter: (a, b) => a.academicYear.name.localeCompare(b.academicYear.name),
            render: (academicYear: IAcademicYear) => <span className="text-sm font-medium">{academicYear.code}</span>
        }
    ]

    return <Table dataSource={classes} columns={columns} rowKey={(record) => record.id} pagination={false} />
}

export default StudentsList
