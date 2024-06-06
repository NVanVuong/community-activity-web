import { Table as TableAntd } from "antd"
import { TableProps, TablePaginationConfig } from "antd/lib/table"

interface ITable<T> extends TableProps<T> {
    pageSize?: number
}

const Table = <T extends object>({ pagination, pageSize, ...props }: ITable<T>) => {
    const paginationConfig: false | TablePaginationConfig =
        pagination !== false
            ? {
                  position: ["bottomCenter"] as TablePaginationConfig["position"],
                  prevIcon: "Previous",
                  nextIcon: "Next",
                  pageSize: pageSize || 8,
                  showSizeChanger: false,
                  responsive: true,
                  showLessItems: true
              }
            : false

    return (
        <TableAntd
            pagination={paginationConfig}
            dataSource={props.dataSource}
            columns={props.columns}
            rowKey={props.rowKey}
            {...props}
        />
    )
}

export default Table
