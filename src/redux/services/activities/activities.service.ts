import {
    IActivityResponse,
    IActivityQuery,
    IActivityCreateRequest,
    IActivityUpdateRequest,
    IActivityId
} from "@/interfaces/activity.interface"
import { createApiWithAuth } from "../auth/auth.service"

const creatApiUserWithAuth = createApiWithAuth("activityApi", ["activities"])
export const activityApi = creatApiUserWithAuth.injectEndpoints({
    endpoints: (builder) => ({
        getActivities: builder.query<IActivityResponse, IActivityQuery>({
            query({ keyword = "" }) {
                return `/activities?keyword=${keyword}`
            },
            providesTags: ["activities"]
        }),
        createActivity: builder.mutation<IActivityResponse, IActivityCreateRequest>({
            query(body) {
                return {
                    url: "/activities",
                    method: "POST",
                    body
                }
            },
            invalidatesTags: ["activities"]
        }),
        updateActivity: builder.mutation<IActivityResponse, IActivityUpdateRequest>({
            query({ id, formData: body }) {
                return {
                    url: `/activities/${id}`,
                    method: "PUT",
                    body
                }
            },
            invalidatesTags: ["activities"]
        }),
        deleteActivity: builder.mutation<IActivityResponse, IActivityId>({
            query(id) {
                return {
                    url: `/activities/${id}`,
                    method: "DELETE"
                }
            },
            invalidatesTags: ["activities"]
        }),
        registerActivity: builder.mutation<IActivityResponse, IActivityId>({
            query(id) {
                return {
                    url: `/activities/${id}/register`,
                    method: "POST"
                }
            },
            invalidatesTags: ["activities"]
        }),
        cancelActivity: builder.mutation<IActivityResponse, IActivityId>({
            query(id) {
                return {
                    url: `/activities/${id}/cancel`,
                    method: "POST"
                }
            },
            invalidatesTags: ["activities"]
        })
    })
})

export const {
    useGetActivitiesQuery,
    useCreateActivityMutation,
    useUpdateActivityMutation,
    useDeleteActivityMutation,
    useRegisterActivityMutation,
    useCancelActivityMutation
} = activityApi
