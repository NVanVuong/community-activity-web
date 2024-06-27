import useAuth from "@/hooks/useAuth"
import { IAcademicYear, IClazz } from "@/interfaces/clazz.interface"
import { IFaculty } from "@/interfaces/faculty.interface"
import { setClassId, setFacultyId, setYearId } from "@/redux/features/search/search.slice"
import { useAppDispatch } from "@/redux/hook"
import { useGetClassesQuery } from "@/redux/services/classes/classes.service"
import { ROLE } from "@/utils/enums/role.enum"
import { Button, Select } from "antd"
import { useEffect, useState } from "react"
import { GrPowerReset } from "react-icons/gr"

function UserQuery() {
    const dispatch = useAppDispatch()
    const { data: classesData, isLoading } = useGetClassesQuery({ keyword: "" })

    const classes = classesData?.data as IClazz[]

    const [faculties, setFaculties] = useState<IFaculty[]>([])
    const [academicYears, setAcademicYears] = useState<IAcademicYear[]>([])

    const { role } = useAuth()

    useEffect(() => {
        if (classes) {
            const faculties = classes.map((item) => item.faculty)
            const uniqueFaculties = Array.from(new Set(faculties.map((faculty) => faculty.id))).map((id) => {
                return faculties.find((faculty) => faculty.id === id)
            }) as IFaculty[]

            setFaculties(uniqueFaculties)

            const academicYears = classes.map((item) => item.academicYear)
            const uniqueAcademicYears = Array.from(new Set(academicYears.map((academicYear) => academicYear.id))).map(
                (id) => {
                    return academicYears.find((year) => year.id === id)
                }
            ) as IAcademicYear[]

            setAcademicYears(uniqueAcademicYears)
        }
    }, [classes])

    const [selectedFacultyId, setSelectedFacultyId] = useState()
    const [selectedAcademicYearId, setSelectedAcademicYearId] = useState()

    const filteredClasses = classes?.filter((clazz) => {
        if (selectedFacultyId && selectedAcademicYearId) {
            return clazz.faculty.id === selectedFacultyId && clazz.academicYear.id === selectedAcademicYearId
        } else if (selectedFacultyId) {
            return clazz.faculty.id === selectedFacultyId
        } else if (selectedAcademicYearId) {
            return clazz.academicYear.id === selectedAcademicYearId
        } else {
            return true
        }
    })

    const handleFacultyChange = (value: any) => {
        setSelectedFacultyId(value)
    }

    const handleAcademicYearChange = (value: any) => {
        setSelectedAcademicYearId(value)
    }

    useEffect(() => {
        dispatch(setFacultyId(selectedFacultyId))
        dispatch(setYearId(selectedAcademicYearId))
    }, [selectedFacultyId, selectedAcademicYearId])

    const handleClear = () => {
        setSelectedFacultyId(undefined)
        setSelectedAcademicYearId(undefined)
        dispatch(setFacultyId(""))
        dispatch(setYearId(""))
        dispatch(setClassId(""))
    }

    return (
        <div className="flex gap-4">
            <Button onClick={handleClear} className="flex h-10 w-10 items-center justify-center" type="default">
                <GrPowerReset className="h-4 w-4" />
            </Button>
            {role !== ROLE.FACULTY && (
                <Select
                    onChange={handleFacultyChange}
                    placeholder="Faculty"
                    className="h-10 w-52"
                    value={selectedFacultyId}
                    loading={isLoading}
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input: any, option: any) =>
                        option && option.children && option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    <Select.Option value="">All</Select.Option>
                    {faculties.map((faculty) => (
                        <Select.Option value={faculty.id} key={faculty.id}>
                            {faculty.name}
                        </Select.Option>
                    ))}
                </Select>
            )}
            <Select
                onChange={handleAcademicYearChange}
                placeholder="Year"
                className="h-10 w-32"
                loading={isLoading}
                value={selectedAcademicYearId}
                showSearch
                optionFilterProp="children"
                filterOption={(input: any, option: any) =>
                    option && option.children && option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                <Select.Option value="">All</Select.Option>
                {academicYears.map((year) => (
                    <Select.Option value={year.id} key={year.id}>
                        {year.code}
                    </Select.Option>
                ))}
            </Select>
            <Select
                onChange={(value: string) => {
                    dispatch(setClassId(value))
                }}
                placeholder="Class"
                className="h-10 w-32"
                loading={isLoading}
                showSearch
                optionFilterProp="children"
                filterOption={(input: any, option: any) =>
                    option && option.children && option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                <Select.Option value="">All</Select.Option>
                {filteredClasses?.map((clazz) => (
                    <Select.Option value={clazz.id} key={clazz.id}>
                        {clazz.name}
                    </Select.Option>
                ))}
            </Select>
        </div>
    )
}

export default UserQuery
