import { IUser } from "@/interfaces/user.interface"
import { ColumnsType } from "antd/es/table"
import { AlignType } from "rc-table/lib/interface"
import { FaEllipsis } from "react-icons/fa6"
import { Dropdown, Space, Spin } from "antd"
import { useGetUsersQuery } from "@/redux/services/users/users.service"
import Table from "@/components/organisms/table"
import { ROLE, ROLE_COLORS, RoleType } from "@/utils/enums/role.enum"
import { IClazz } from "@/interfaces/clazz.interface"
import { useAppSelector } from "@/redux/hook"
import { useState } from "react"
import { useMenuActions } from "../hooks/useMenuActions"
import { AvatarDefault } from "@/assets/images"
import StudentDetail from "@/components/organisms/drawer/student"

const TableManageUsers = () => {
    const keyword = useAppSelector((state) => state.search.keyword)
    const classId = useAppSelector((state) => state.search.classId)
    const facultyId = useAppSelector((state) => state.search.facultyId)
    const yearId = useAppSelector((state) => state.search.yearId)

    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)

    const [isOpenUserInfor, setIsOpenUserInfor] = useState(false)
    const [userSelected, setUserSelected] = useState<IUser>({} as IUser)

    const { data, isLoading } = useGetUsersQuery({ keyword, classId, facultyId, yearId, page, limit })

    const users = data?.data.users as IUser[]
    const totalRecords = data?.data.total || 0

    const handlePageChange = (page: number, pageSize: number) => {
        setPage(page)
        setLimit(pageSize)
    }

    const getMenuActions = useMenuActions(setIsOpenUserInfor, setUserSelected)

    const columns: ColumnsType<IUser> = [
        {
            title: <span className=" font-bold">Index</span>,
            align: "center" as AlignType,
            key: "index",
            width: "6%",
            render: (_, __, index) => <span className=" text-sm font-semibold">{index + 1}</span>
        },
        {
            title: <span className="font-bold">Name</span>,
            key: "name",
            width: "18%",
            sorter: (a, b) => a.name?.localeCompare(b.name),
            render: (record: IUser) => (
                <div className="flex items-center">
                    <img
                        className="h-8 w-8 rounded-full"
                        src={record.avatar ? record.avatar : AvatarDefault}
                        alt={record.name}
                    />
                    <span className="ml-2 text-sm font-semibold">{record.name}</span>
                </div>
            )
        },

        {
            title: <span className="font-bold">StudentID</span>,
            dataIndex: "studentId",
            key: "studentId",
            width: "10%",
            sorter: (a, b) => a.studentId?.localeCompare(b.studentId),
            render: (studentId: string) => <span className="text-sm font-medium">{studentId}</span>
        },
        {
            title: <span className="font-bold">Class</span>,
            key: "clazz",
            dataIndex: "clazz",
            width: "10%",
            sorter: (a, b) => a.clazz?.name?.localeCompare(b.clazz?.name),
            render: (clazz: IClazz) => <span className="text-sm font-medium">{clazz?.name}</span>
        },
        {
            title: <span className="font-bold">Faculty</span>,
            key: "faculty",
            dataIndex: "clazz",
            width: "15%",
            sorter: (a, b) => a.clazz?.faculty.name?.localeCompare(b.clazz?.faculty.name),
            render: (clazz: IClazz) => <span className="text-sm font-medium">{clazz?.faculty.name}</span>
        },
        {
            title: <span className="font-bold">Year</span>,
            key: "academicYear",
            dataIndex: "clazz",
            width: "10%",
            sorter: (a, b) => a.clazz?.academicYear.code?.localeCompare(b.clazz?.academicYear.code),
            render: (clazz: IClazz) => <span className="text-sm font-medium">{clazz?.academicYear.code}</span>
        },
        {
            title: <span className="font-bold">Role</span>,
            key: "role",
            width: "8%",
            dataIndex: "role",
            filters: [
                { text: "Admin", value: ROLE.ADMIN },
                { text: "Class", value: ROLE.CLASS },
                { text: "Faculty", value: ROLE.FACULTY },
                { text: "User", value: ROLE.USER }
            ],
            onFilter: (value, record) => record.role === value,
            render: (role: string) => (
                <span
                    style={{ backgroundColor: ROLE_COLORS[role as RoleType] }}
                    className={`rounded-2xl px-2 py-1.5 text-center text-xs font-semibold uppercase text-white`}
                >
                    {role}
                </span>
            )
        },
        {
            title: <span className="font-bold">Score</span>,
            align: "center" as AlignType,
            key: "score",
            dataIndex: "score",
            width: "10%",
            sorter: (a, b) => a.score - b.score,
            render: (score: number) => <span className="text-sm font-medium">{score}</span>
        },
        {
            title: <span className="text-center font-bold">Action</span>,
            key: "action",
            width: "6%",
            align: "center" as AlignType,
            render: (record: IUser) => {
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
            <Table
                dataSource={users}
                pagination={{
                    current: page,
                    pageSize: limit,
                    total: totalRecords,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    onChange: handlePageChange
                }}
                columns={columns}
                rowKey={(record) => record.id}
            />
            <StudentDetail
                title="User Information"
                placement="right"
                onClose={() => setIsOpenUserInfor(false)}
                open={isOpenUserInfor}
                student={userSelected}
            />
        </Spin>
    )
}

export default TableManageUsers
