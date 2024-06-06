import { IUser } from "@/interfaces/user.interface"
import { ColumnsType } from "antd/es/table"
import { AlignType } from "rc-table/lib/interface"
import Table from "@/components/organisms/table"
import { useState } from "react"
import { HiOutlineViewfinderCircle } from "react-icons/hi2"
import StudentDetail from "./student-detail"

const StudentsList = ({ students }: { students: IUser[] }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [selectedStudent, setSelectedStudent] = useState({} as IUser)

    const showStudentDrawer = (record: IUser) => {
        setSelectedStudent(record)
        setIsDrawerOpen(true)
    }

    const columns: ColumnsType<IUser> = [
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
            title: <span className="font-bold">StudentID</span>,
            dataIndex: "studentId",
            key: "studentId",
            width: "30%",
            sorter: (a, b) => a.studentId.localeCompare(b.studentId),
            render: (studentId: string) => <span className="text-sm font-medium">{studentId}</span>
        },
        {
            title: <span className="font-bold">Score</span>,
            key: "score",
            dataIndex: "score",
            width: "10%",
            sorter: (a, b) => a.score - b.score,
            render: (score: number) => <span className="text-sm font-medium">{score}</span>
        },
        {
            title: <span className="font-bold">Action</span>,
            key: "action",
            align: "center" as AlignType,
            width: "10%",
            render: (_, record) => (
                <HiOutlineViewfinderCircle className="ml-2.5 h-5 w-5" onClick={() => showStudentDrawer(record)} />
            )
        }
    ]

    return (
        <>
            <Table dataSource={students} columns={columns} rowKey="id" pagination={false} />
            <StudentDetail
                title="Student Details"
                placement="right"
                onClose={() => setIsDrawerOpen(false)}
                open={isDrawerOpen}
                student={selectedStudent}
            />
        </>
    )
}

export default StudentsList
