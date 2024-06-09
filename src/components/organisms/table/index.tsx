import { Table as TableAntd } from "antd"
import { TablePaginationConfig } from "antd/lib/table"

interface ITable<T> {
    dataSource: T[]
    columns: any
    rowKey: (record: T) => string
    pagination?: false | TablePaginationConfig
    pageSize?: number
    total?: number
}

const Table = <T extends object>({ pagination, pageSize, total, ...props }: ITable<T>) => {
    const paginationConfig: false | TablePaginationConfig =
        pagination !== false
            ? {
                  position: ["bottomCenter"] as TablePaginationConfig["position"],
                  prevIcon: "Previous",
                  nextIcon: "Next",
                  pageSize: pageSize || 8,
                  showSizeChanger: false,
                  responsive: true,
                  showLessItems: true,
                  total: total,
                  ...pagination
              }
            : false

    return (
        <TableAntd
            {...props}
            pagination={paginationConfig}
            rowKey={props.rowKey}
            columns={props.columns}
            dataSource={props.dataSource}
        />
    )
}

export default Table
