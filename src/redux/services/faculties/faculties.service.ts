import { IFacultyCreate, IFacultyDelete, IFacultyQuery, IFacultyResponse } from "@/interfaces/faculty.interface"
import { createApiWithAuth } from "../auth/auth.service"

const creatApiUserWithAuth = createApiWithAuth("facultyApi", ["faculties"])
export const facultyApi = creatApiUserWithAuth.injectEndpoints({
    endpoints: (builder) => ({
        getFaculties: builder.query<IFacultyResponse, IFacultyQuery>({
            query({ keyword = "" }) {
                return `/faculties?keyword=${keyword}`
            },
            providesTags: ["faculties"]
        }),
        createFaculty: builder.mutation<IFacultyResponse, IFacultyCreate>({
            query(body) {
                return {
                    url: "/faculties",
                    method: "POST",
                    body
                }
            },
            invalidatesTags: ["faculties"]
        }),
        deleteFaculty: builder.mutation<IFacultyResponse, IFacultyDelete>({
            query(id) {
                return {
                    url: `/faculties/${id}`,
                    method: "DELETE"
                }
            },
            invalidatesTags: ["faculties"]
        })
    })
})

export const { useGetFacultiesQuery, useCreateFacultyMutation, useDeleteFacultyMutation } = facultyApi
