import { ICategory } from "@/interfaces/categories.interface"
import { resetFilters, setFilters } from "@/redux/features/filter/filter.slice"
import { useAppDispatch, useAppSelector } from "@/redux/hook"
import { useGetCategoriesQuery } from "@/redux/services/categories/categories.slice"
import { ACTIVITY_STATUS, ACTIVITY_STATUS_TEXT } from "@/utils/enums/status.enum"
import { Button, Checkbox, DatePicker, Popover, Select, Slider } from "antd"
import dayjs from "dayjs"
import { useState } from "react"
import { TbFilterSearch } from "react-icons/tb"

const { RangePicker } = DatePicker

function Filter() {
    const dispatch = useAppDispatch()
    const { data: categoriesData, isLoading: categoriesLoading } = useGetCategoriesQuery({ keyword: "" })
    const categories = categoriesData?.data as ICategory[]

    const filters = useAppSelector((state) => state.filter)
    const [localFilters, setLocalFilters] = useState({
        ...filters,
        startDate: filters.startDate.map((date) => dayjs(date))
    })

    const [open, setOpen] = useState(false)
    const hide = () => {
        setOpen(false)
    }

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen)
    }

    const handleFilterChange = (field: any, value: any) => {
        setLocalFilters({
            ...localFilters,
            [field]: value
        })
    }

    const handleStatusChange = (status: ACTIVITY_STATUS, checked: any) => {
        const updatedStatus = checked
            ? [...localFilters.status, status]
            : localFilters.status.filter((s) => s !== status)
        setLocalFilters({
            ...localFilters,
            status: updatedStatus
        })
    }

    const applyFilters = () => {
        console.log(localFilters)
        dispatch(setFilters(localFilters))
    }

    const resetLocalFilters = () => {
        setLocalFilters({
            status: [],
            startDate: [],
            score: [3, 30],
            category: []
        })
        dispatch(resetFilters())
    }

    const convertToDayjs = (dates: any): [dayjs.Dayjs | null, dayjs.Dayjs | null] => {
        if (!dates || dates.length !== 2) {
            return [null, null]
        }
        return [dayjs(dates[0]), dayjs(dates[1])]
    }

    const content = (
        <div className="w-112 p-4">
            <div className="mb-4">
                <label className="mb-1 block text-sm font-medium text-primary">Status</label>
                <div className="flex flex-col gap-2">
                    {Object.values(ACTIVITY_STATUS).map((status) => (
                        <Checkbox
                            key={status}
                            checked={localFilters.status.includes(status)}
                            onChange={(e) => handleStatusChange(status, e.target.checked)}
                        >
                            <span className="capitalize">{ACTIVITY_STATUS_TEXT[status]}</span>
                        </Checkbox>
                    ))}
                </div>
            </div>
            <div className="mb-4">
                <label className="mb-1 block text-sm font-medium text-primary">Start Date</label>
                <RangePicker
                    className="w-full"
                    value={localFilters.startDate.length ? convertToDayjs(localFilters.startDate) : undefined}
                    onChange={(dates) => handleFilterChange("startDate", dates)}
                />
            </div>
            <div className="mb-4">
                <label className="mb-1 block text-sm font-medium text-primary">Score</label>
                <div className="flex items-center space-x-2">
                    <Slider
                        className="w-full"
                        range
                        max={30}
                        min={3}
                        value={localFilters.score}
                        onChange={(value) => handleFilterChange("score", value)}
                    />
                </div>
            </div>
            <div className="mb-4">
                <label className="mb-1 block text-sm font-medium text-primary">Category</label>
                <Select
                    mode="multiple"
                    className="w-full"
                    placeholder="Select categories"
                    loading={categoriesLoading}
                    value={localFilters.category}
                    onChange={(value) => handleFilterChange("category", value)}
                >
                    {categories?.map((category) => (
                        <Select.Option key={category.id} value={category.id}>
                            {category.name}
                        </Select.Option>
                    ))}
                </Select>
            </div>
            <div className="flex justify-end space-x-4">
                <Button onClick={resetLocalFilters}>Reset</Button>
                <Button
                    type="primary"
                    onClick={() => {
                        applyFilters()
                        hide()
                    }}
                >
                    Apply
                </Button>
            </div>
        </div>
    )

    return (
        <Popover open={open} placement="bottom" onOpenChange={handleOpenChange} trigger="click" content={content}>
            <div className="rounded-md bg-white p-2 shadow hover:cursor-pointer hover:shadow-md">
                <TbFilterSearch className="h-5 w-5 text-black/60 transition duration-100 hover:text-black" />
            </div>
        </Popover>
    )
}

export default Filter
