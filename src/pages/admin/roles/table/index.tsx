import { ColumnsType } from "antd/es/table"
import { AlignType } from "rc-table/lib/interface"
import { FaEllipsis } from "react-icons/fa6"
import { Dropdown, Space, Spin } from "antd"
import Table from "@/components/organisms/table"
import { useAppSelector } from "@/redux/hook"
import { IFaculty } from "@/interfaces/faculty.interface"
import { ICategory } from "@/interfaces/categories.interface"
import { useMenuActions } from "../hooks/useMenuActions"
import { useGetRolesQuery } from "@/redux/services/roles/roles.service"
import { ISubcategory } from "../../../../interfaces/categories.interface"
import { IRole } from "@/interfaces/user.interface"

const TableManageRoles = () => {
    const keyword = useAppSelector((state) => state.search.keyword)
    const { data, isLoading } = useGetRolesQuery({ keyword: keyword })

    const roles = data?.data as IRole[]

    const getMenuActions = useMenuActions()

    const columns: ColumnsType<ICategory> = [
        {
            title: <span className=" font-bold">Index</span>,
            align: "center" as AlignType,
            key: "inex",
            width: "10%",
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
            title: <span className="font-bold">Description</span>,
            key: "description",
            dataIndex: "description",
            width: "40%",
            render: (description: string) => <span className="text-sm font-medium">{description}</span>
        },
        {
            title: <span className="font-bold">Total Subcategories</span>,
            key: "totalSubcategories",
            dataIndex: "subcategories",
            width: "20%",
            align: "center" as AlignType,
            sorter: (a, b) => a.subcategories.length - b.subcategories.length,
            render: (subcategories: ISubcategory[]) => (
                <span className="text-sm font-medium">{subcategories.length}</span>
            )
        },
        {
            title: <span className="text-center font-bold">Action</span>,
            key: "action",
            width: "10%",
            align: "center" as AlignType,
            render: (record: IFaculty) => {
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
            <Table pageSize={9} dataSource={roles} columns={columns} rowKey={(record) => record.id} />
        </Spin>
    )
}

export default TableManageRoles
