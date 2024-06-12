import { useState } from "react"
import { Tabs } from "antd"
import { TabsProps } from "antd/lib"

const items: TabsProps["items"] = [
    {
        key: "all",
        label: "All Activities"
    },
    {
        key: "dhdn",
        label: "Da Nang University"
    },
    {
        key: "dhbk",
        label: "DUT"
    },
    {
        key: "faculty",
        label: "Faculty"
    }
]

const NavBar = () => {
    const [activeKey, setActiveKey] = useState("all")

    const handleTabChange = (key: string) => {
        setActiveKey(key)
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
