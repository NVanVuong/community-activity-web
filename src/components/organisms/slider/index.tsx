import type { MenuProps } from "antd"
import { Menu } from "antd"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FaRegUser } from "react-icons/fa"
import { BiCategory } from "react-icons/bi"
import { MdLogout, MdOutlineClass, MdOutlineRoomPreferences } from "react-icons/md"
import { LuActivitySquare, LuFileCheck2 } from "react-icons/lu"
import { SITE_MAP } from "@/utils/enums/path.enum"
import Logo from "@/components/molecules/logo"
import Button from "@/components/atoms/button"
import ToggleExpand from "@/components/atoms/expand"

type MenuItem = Required<MenuProps>["items"][number]

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: "group"
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type
    } as MenuItem
}

const Slider = () => {
    const [isExpanding, setIsExpanding] = useState(false)
    const navigate = useNavigate()

    let items: MenuProps["items"] = [
        { type: "divider" },

        getItem(`${isExpanding ? "Users" : ""}`, "users", <FaRegUser className="h-5 w-5" />),
        getItem(`${isExpanding ? "Classes" : ""}`, "classes", <MdOutlineClass className="h-5 w-5" />),
        getItem(`${isExpanding ? "Faculties" : ""}`, "faculties", <MdOutlineRoomPreferences className="h-5 w-5" />),
        getItem(`${isExpanding ? "Activities" : ""}`, "activities", <LuActivitySquare className="h-5 w-5" />),
        getItem(`${isExpanding ? "Proofs" : ""}`, "proofs", <LuFileCheck2 className="h-5 w-5" />),
        getItem(`${isExpanding ? "Categories" : ""}`, "categories", <BiCategory className="h-5 w-5" />),

        { type: "divider" }
    ]

    const onClick: MenuProps["onClick"] = (e) => {
        switch (e.key) {
            case "users":
                navigate(SITE_MAP.USERS)
                break
            case "classes":
                navigate(SITE_MAP.CLASSES)
                break
            case "faculties":
                navigate(SITE_MAP.FACULTIES)
                break
            case "activities":
                navigate(SITE_MAP.ACTIVITIES)
                break
            case "categories":
                navigate(SITE_MAP.CATEGORIES)
                break
            default:
                break
        }
    }

    return (
        <div
            className={`${
                isExpanding ? "w-60" : "w-20"
            } trasition relative flex h-screen flex-col items-center rounded-br-3xl rounded-tr-3xl border border-gray-200 bg-white duration-200 peer-hover:bg-red-500`}
        >
            <div className="h-20 py-4">
                <Logo isOpen={isExpanding} />
            </div>

            <Menu
                onClick={onClick}
                defaultSelectedKeys={["users"]}
                mode="inline"
                items={items}
                style={{ borderInlineEnd: "none" }}
                className={`w-full rounded-br-3xl rounded-tr-3xl border-none`}
            />

            <div className="absolute bottom-4 w-full px-2">
                <Button
                    onClick={() => navigate(SITE_MAP.INDEX)}
                    className="w-full rounded-xl bg-primary py-2.5 text-white shadow-md shadow-primary/60 transition duration-150 hover:shadow-md hover:shadow-primary/90"
                >
                    <MdLogout className="h-5 w-5" /> {isExpanding ? "Logout" : ""}
                </Button>
            </div>

            <ToggleExpand isExpanding={isExpanding} onClick={() => setIsExpanding(!isExpanding)} />
        </div>
    )
}

export default Slider
