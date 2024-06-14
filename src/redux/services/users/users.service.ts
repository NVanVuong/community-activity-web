import {
    ICreateUserRequest,
    IMyInfoRespone,
    IUpdateMyInfoRequest,
    IUpdateMyInfoResponse,
    IUpdatePassword,
    IUserByClassQuery,
    IUserQuery,
    IUsersResponse
} from "@/interfaces/user.interface"
import { createApiWithAuth } from "../auth/auth.service"

const creatApiUserWithAuth = createApiWithAuth("userApi", ["Users"])
export const userApi = creatApiUserWithAuth.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query<IUsersResponse, IUserQuery>({
            query: ({ keyword = "", classId = "", facultyId = "", yearId = "", page = 1, limit = 10 }) =>
                `/users?keyword=${keyword}&classId=${classId}&facultyId=${facultyId}&yearId=${yearId}&page=${page}&limit=${limit}`,
            providesTags: ["Users"]
        }),
        getUsersByClass: builder.query<IUsersResponse, IUserByClassQuery>({
            query: ({ classId }) => `/users/class/${classId}`,
            providesTags: ["Users"]
        }),
        getMyInfo: builder.query<IMyInfoRespone, void>({
            query: () => "/users/me/info",
            providesTags: ["Users"]
        }),
        updateMyInfo: builder.mutation<IUpdateMyInfoResponse, IUpdateMyInfoRequest>({
            query: (data) => ({
                url: "/users/me/update",
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["Users"]
        }),
        updatePassword: builder.mutation<IUsersResponse, IUpdatePassword>({
            query: (data) => ({
                url: "/users/me/password",
                method: "PUT",
                body: data
            })
        }),
        createUser: builder.mutation<IUsersResponse, ICreateUserRequest>({
            query: (data) => ({
                url: "/users",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Users"]
        }),
        deleteUser: builder.mutation<IUsersResponse, string>({
            query: (id) => ({
                url: `/users/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Users"]
        })
    })
})

export const {
    useGetUsersQuery,
    useGetUsersByClassQuery,
    useGetMyInfoQuery,
    useUpdateMyInfoMutation,
    useUpdatePasswordMutation,
    useCreateUserMutation,
    useDeleteUserMutation
} = userApi
