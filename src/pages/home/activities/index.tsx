import { useGetActivitiesQuery } from "@/redux/services/activities/activities.service"
import Card from "./card"
import { IActivity } from "@/interfaces/activity.interface"
import { useEffect, useState } from "react"
import ActivityDetail from "./card-detail"
import { useAppSelector } from "@/redux/hook"
import Toolbar from "./toolbar"
import { Empty, Pagination } from "antd"
import ModalActivity from "./modal"
import { PaginationProps } from "antd/lib"

const itemRender: PaginationProps["itemRender"] = (_, type, originalElement) => {
    if (type === "prev") {
        return <a>Previous</a>
    }
    if (type === "next") {
        return <a>Next</a>
    }
    return originalElement
}

function ListActivities() {
    const keyword = useAppSelector((state) => state.search.keyword)
    const organization = useAppSelector((state) => state.search.organization)
    const filter = useAppSelector((state) => state.filter) as {
        status: string[]
        startDate: Date[]
        score: number[]
        category: string[]
    }
    const { data } = useGetActivitiesQuery({ keyword: keyword })

    const activities = data?.data as IActivity[]

    const [filteredActivities, setFilteredActivities] = useState<IActivity[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(4)

    useEffect(() => {
        if (!activities) return

        const filtered = activities.filter((activity) => {
            if (filter.status.length && !filter.status.includes(activity.status)) {
                return false
            }

            if (
                filter.startDate.length &&
                (activity.startDate < filter.startDate[0] || activity.startDate > filter.startDate[1])
            ) {
                return false
            }

            if (activity.score < filter.score[0] || activity.score > filter.score[1]) {
                return false
            }

            if (filter.category.length) {
                const activityCategory = activity.subcategory?.category?.id
                if (!activityCategory || !filter.category.includes(activityCategory)) {
                    return false
                }
            }

            if (organization && activity.organization.includes(organization) === false) {
                return false
            }

            return true
        })
        setFilteredActivities(filtered)
    }, [activities, filter, organization])

    const [activitySelected, setActivitySelected] = useState<IActivity>({} as IActivity)
    const [isOpen, setIsOpen] = useState(false)

    const handleClick = (activity: IActivity) => {
        setIsOpen(true)
        setActivitySelected(activity)
    }

    const handlePageChange = (page: number, pageSize?: number) => {
        setCurrentPage(page)
        if (pageSize) {
            setPageSize(pageSize)
        }
    }

    const paginatedActivities = filteredActivities.slice((currentPage - 1) * pageSize, currentPage * pageSize)

    const nullData = (
        <div className="my-6 flex w-full flex-col pl-2 pr-6">
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        </div>
    )

    return (
        <div className="my-6 flex w-full flex-col pl-2 pr-6">
            <Toolbar />
            {filteredActivities.length !== 0 ? (
                <>
                    <div className="mt-6 flex w-full flex-grow flex-col gap-6">
                        {paginatedActivities?.map((activity) => (
                            <div key={activity.id}>
                                <Card
                                    {...activity}
                                    onClick={() => handleClick(activity)}
                                    active={activity.id === activitySelected.id}
                                />
                            </div>
                        ))}
                    </div>
                    <Pagination
                        className="mt-6 flex w-full justify-center"
                        current={currentPage}
                        pageSize={pageSize}
                        total={filteredActivities.length}
                        onChange={handlePageChange}
                        itemRender={itemRender}
                    />
                    <ActivityDetail
                        title="Activity Details"
                        placement="right"
                        onClose={() => {
                            setIsOpen(false)
                            setActivitySelected({} as IActivity)
                        }}
                        open={isOpen}
                        width={800}
                        activity={activitySelected}
                    />
                    <ModalActivity />
                </>
            ) : (
                nullData
            )}
        </div>
    )
}

export default ListActivities
