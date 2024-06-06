import { ColumnsType } from "antd/es/table"
import { AlignType } from "rc-table/lib/interface"
import { FaEllipsis } from "react-icons/fa6"
import { Dropdown, Space, Spin } from "antd"
import { useMenuActions } from "./hooks/useMenuActions"
import Table from "@/components/organisms/table"
import { IAcademicYear, IClazz } from "@/interfaces/clazz.interface"
import { useAppSelector } from "@/redux/hook"
import { useEffect, useState } from "react"
import { useGetClassesQuery } from "@/redux/services/classes/classes.service"
import { IFaculty } from "@/interfaces/faculty.interface"

interface FilterOption {
    text: string
    value: string
}

const TableManageClasses = () => {
    const keyword = useAppSelector((state) => state.search.keyword)
    const { data, isLoading } = useGetClassesQuery({ keyword: keyword })

    const clazzes = data?.data as IClazz[]

    const [facultyFilters, setFacultyFilters] = useState<FilterOption[]>([])
    const [academicYearFilters, setAcademicYearFilters] = useState<FilterOption[]>([])

    const getMenuActions = useMenuActions()

    useEffect(() => {
        if (clazzes) {
            const faculties = [...new Set(clazzes.map((clazz) => clazz.faculty.name))]
            setFacultyFilters(faculties.map((faculty) => ({ text: faculty, value: faculty })))

            const academicYears = [...new Set(clazzes.map((clazz) => clazz.academicYear.code))]
            setAcademicYearFilters(academicYears.map((academicYear) => ({ text: academicYear, value: academicYear })))
        }
    }, [clazzes])

    const columns: ColumnsType<IClazz> = [
        {
            title: <span className=" font-bold">Index</span>,
            align: "center" as AlignType,
            key: "id",
            width: "6%",
            render: (_, __, index) => <span className=" text-sm font-semibold">{index + 1}</span>
        },
        {
            title: <span className="font-bold">Name</span>,
            key: "name",
            dataIndex: "name",
            width: "18%",
            sorter: (a, b) => a.name?.localeCompare(b.name),
            render: (name: string) => <span className="text-sm font-medium">{name}</span>
        },
        {
            title: <span className="font-bold">Faculty</span>,
            key: "faculty",
            dataIndex: "faculty",
            width: "15%",
            filters: facultyFilters,
            onFilter: (value, record) => record.faculty.name === value,
            render: (faculty: IFaculty) => <span className="text-sm font-medium">{faculty.name}</span>
        },
        {
            title: <span className="font-bold">Academic Year</span>,
            key: "academicYear",
            dataIndex: "academicYear",
            width: "15%",
            filters: academicYearFilters,
            onFilter: (value, record) => record.academicYear.code === value,
            render: (academicYear: IAcademicYear) => <span className="text-sm font-medium">{academicYear.code}</span>
        },
        {
            title: <span className="text-center font-bold">Action</span>,
            key: "action",
            width: "6%",
            align: "center" as AlignType,
            render: (record: IClazz) => {
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
            <Table pageSize={9} dataSource={clazzes} columns={columns} rowKey={(record) => record.id} />
        </Spin>
    )
}

export default TableManageClasses
