import { useEffect } from "react"
import { message } from "antd"

export type TServerMessage = {
    error: any
    data: any
}

function useServerMessage({ data, error }: TServerMessage) {
    useEffect(() => {
        if (data && (data.status === "success" || data.success === true)) {
            console.log(data.message)

            message.success(data.message)
        } else if (error) {
            message.error(error.data?.message)
        }
        // eslint-disable-next-line
    }, [data, error])
}

export default useServerMessage
