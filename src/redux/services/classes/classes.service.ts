import { createApiWithAuth } from "../auth/auth.service"
import {
    IClazzQuery,
    IClazzResponse,
    IClazzCreate,
    IClazzDelete,
    IAcademicYearResponse,
    IClazzByFacultyQuery
} from "@/interfaces/clazz.interface"

const creatApiUserWithAuth = createApiWithAuth("classApi", ["Classes"])
export const classApi = creatApiUserWithAuth.injectEndpoints({
    endpoints: (builder) => ({
        getClasses: builder.query<IClazzResponse, IClazzQuery>({
            query({ keyword = "" }) {
                return `/classes?keyword=${keyword}`
            },
            providesTags: ["Classes"]
        }),
        getClassesByFaculty: builder.query<IClazzResponse, IClazzByFacultyQuery>({
            query({ facultyId }) {
                return `/classes/faculty/${facultyId}`
            },
            providesTags: ["Classes"]
        }),
        getAcademicYears: builder.query<IAcademicYearResponse, void>({
            query() {
                return "/academic-years"
            },
            providesTags: ["AcademicYears"]
        }),
        createClass: builder.mutation<IClazzResponse, IClazzCreate>({
            query(body) {
                return {
                    url: "/classes",
                    method: "POST",
                    body
                }
            },
            invalidatesTags: ["Classes"]
        }),
        deleteClass: builder.mutation<IClazzResponse, IClazzDelete>({
            query(id) {
                return {
                    url: `/classes/${id}`,
                    method: "DELETE"
                }
            },
            invalidatesTags: ["Classes"]
        })
    })
})

export const {
    useGetClassesQuery,
    useGetClassesByFacultyQuery,
    useGetAcademicYearsQuery,
    useCreateClassMutation,
    useDeleteClassMutation
} = classApi
