import { useLocation } from "react-router-dom"
import { useAppDispatch } from "@/redux/hook"
import { resetExternal, setExternal } from "@/redux/features/search/search.slice"
import { Checkbox } from "antd"
import { useEffect } from "react"

const IsExternal = () => {
    const dispatch = useAppDispatch()
    const location = useLocation()

    useEffect(() => {
        dispatch(resetExternal())
    }, [location, dispatch])

    return (
        <div className="">
            <Checkbox
                onChange={(e) => {
                    dispatch(setExternal(e.target.checked))
                }}
                className="font-medium text-primary"
            >
                External
            </Checkbox>
        </div>
    )
}

export default IsExternal
