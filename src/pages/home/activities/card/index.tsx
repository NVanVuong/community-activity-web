import { IActivity } from "@/interfaces/activity.interface"
import { openModal } from "@/redux/features/modal/modal.slice"
import { useAppDispatch } from "@/redux/hook"
import { MODAL } from "@/utils/constants/modal"
import { ACTIVITY_STATUS, ACTIVITY_STATUS_COLOR, ACTIVITY_STATUS_TEXT } from "@/utils/enums/status.enum"
import { formatDate, styleOrEmpty } from "@/utils/helpers"
import { Button, Tag } from "antd"
import { FaRegCalendarAlt, FaRegHeart } from "react-icons/fa"
import { FaPeopleGroup } from "react-icons/fa6"
import { MdLocationOn, MdSportsScore } from "react-icons/md"

interface ICardProps extends IActivity {
    active: boolean
    onClick: () => void
}

function Card(props: ICardProps) {
    const { active, onClick, ...activity } = props

    const dispatch = useAppDispatch()

    return (
        <div
            onClick={props.onClick}
            className={`${styleOrEmpty(props.active, "shadow-lg ring-2 ring-primary ring-offset-4")} relative flex h-40 w-full items-center gap-6 rounded-xl bg-white p-6 shadow-md hover:cursor-pointer`}
        >
            <img className="h-full w-40 rounded-xl backdrop-blur-md" src={props.image} alt={props.name} />
            <div className="flex w-full flex-col gap-2 overflow-hidden">
                <div className="flex items-center gap-4">
                    <h1 className="text-lg font-semibold">{props.name}</h1>
                    <Tag className="!m-0 h-fit capitalize" color={ACTIVITY_STATUS_COLOR[props.status]}>
                        {ACTIVITY_STATUS_TEXT[props.status]}
                    </Tag>
                    <span className="ml-auto">
                        <FaRegHeart className="h-5 w-5 text-primary transition duration-100 hover:scale-105" />
                    </span>
                </div>
                <p className="truncate text-xs text-gray-400">{props.organizer}</p>
                <p className="truncate text-sm">{props.subcategory?.name}</p>
                <div className="flex items-center gap-10 text-xs font-medium text-gray-600/80">
                    <p className="mt-2 flex items-center gap-1">
                        <MdSportsScore className="h-5 w-5" /> {props.score}
                    </p>
                    <p className="mt-2 flex items-center gap-1">
                        <FaPeopleGroup className="h-5 w-5" />
                        {props.participants}/{props.maxParticipants === -1 ? "Unlimited" : props.maxParticipants}
                    </p>
                    <p className="mt-2 flex items-center gap-1">
                        <FaRegCalendarAlt className="h-5 w-5" />
                        {formatDate(props.startDate)}
                    </p>

                    <p className="mt-2 flex items-center gap-1">
                        <MdLocationOn className="h-5 w-5" />
                        {props.address}
                    </p>
                </div>

                {props.status === ACTIVITY_STATUS.REGISTRATION_OPEN && (
                    <Button
                        onClick={(e) => {
                            e.stopPropagation()
                            dispatch(openModal({ type: MODAL.REGISTER.ACTIVITY, data: activity }))
                        }}
                        type="primary"
                        className="absolute bottom-5 right-6 z-50 w-fit py-1 text-xs font-medium"
                    >
                        Register Now
                    </Button>
                )}
            </div>
        </div>
    )
}
export default Card
