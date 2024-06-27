import { useMemo, useState } from "react"
import { Tabs } from "antd"
import { useAppDispatch } from "@/redux/hook"
import { setOrganization } from "@/redux/features/search/search.slice"
import useAuth from "@/hooks/useAuth"

const NavBar = () => {
    const { faculty } = useAuth()

    const items = useMemo(
        () => [
            {
                key: "",
                label: "All activities"
            },
            {
                key: "Đại học Đà Nẵng",
                label: "Đại học Đà Nẵng"
            },
            {
                key: "Đại học Bách Khoa",
                label: "Đại học Bách Khoa"
            },
            {
                key: faculty,
                label: "Khoa"
            }
        ],
        [faculty]
    )

    const [activeKey, setActiveKey] = useState("")
    const dispatch = useAppDispatch()

    const handleTabChange = (key: string) => {
        setActiveKey(key)
        dispatch(setOrganization(key))
    }

    return (
        <Tabs
            activeKey={activeKey}
            items={items}
            moreIcon={null}
            onChange={handleTabChange}
            indicator={{ size: (origin) => origin - 20, align: "start" }}
        />
    )
}

export default NavBar
