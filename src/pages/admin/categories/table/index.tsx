import { ColumnsType } from "antd/es/table"
import { AlignType } from "rc-table/lib/interface"
import { FaEllipsis } from "react-icons/fa6"
import { Dropdown, Space, Spin } from "antd"
import Table from "@/components/organisms/table"
import { useAppSelector } from "@/redux/hook"
import { IFaculty } from "@/interfaces/faculty.interface"
import { useGetCategoriesQuery } from "@/redux/services/categories/categories.service"
import { ICategory } from "@/interfaces/categories.interface"
import { useMenuActions } from "../hooks/useMenuActions"

const TableManageCategories = () => {
    const keyword = useAppSelector((state) => state.search.keyword)
    const { data, isLoading } = useGetCategoriesQuery({ keyword: keyword })

    const categories = data?.data as ICategory[]

    const getMenuActions = useMenuActions()

    const columns: ColumnsType<ICategory> = [
        {
            title: <span className=" font-bold">Index</span>,
            align: "center" as AlignType,
            key: "inex",
            dataIndex: "index",
            width: "10%",
            render: (index: number) => <span className=" text-sm font-semibold">{index}</span>
        },
        {
            title: <span className="font-bold">Name</span>,
            key: "name",
            dataIndex: "name",
            width: "80%",
            render: (name: string) => <span className="text-sm font-medium">{name}</span>
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
            <Table pageSize={9} dataSource={categories} columns={columns} rowKey={(record) => record.id} />
        </Spin>
    )
}

export default TableManageCategories
