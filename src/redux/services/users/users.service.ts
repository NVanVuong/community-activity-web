import {
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
            query: ({ keyword = "" }) => `/users?keyword=${keyword}`,
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
        })
    })
})

export const {
    useGetUsersQuery,
    useGetUsersByClassQuery,
    useGetMyInfoQuery,
    useUpdateMyInfoMutation,
    useUpdatePasswordMutation
} = userApi
