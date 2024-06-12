import {
    IActivityResponse,
    IActivityQuery,
    IActivityCreateRequest,
    IActivityUpdateRequest,
    IActivityId
} from "@/interfaces/activity.interface"
import { createApiWithAuth } from "../auth/auth.service"
import { IUserActivityQuery, IUserActivityResponse } from "@/interfaces/useractivity.interface"
import { IProofResponse, IProofSubmitRequest } from "@/interfaces/proof.interface"

const creatApiUserWithAuth = createApiWithAuth("activityApi", ["activities"])
export const activityApi = creatApiUserWithAuth.injectEndpoints({
    endpoints: (builder) => ({
        getActivities: builder.query<IActivityResponse, IActivityQuery>({
            query({ keyword = "" }) {
                return `/activities?keyword=${keyword}`
            },
            providesTags: ["activities"]
        }),
        getMyActivities: builder.query<IUserActivityResponse, IUserActivityQuery>({
            query({ keyword = "" }) {
                return `/my-activities?keyword=${keyword}`
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
        }),
        submitProof: builder.mutation<IProofResponse, IProofSubmitRequest>({
            query({ id, formData: body }) {
                return {
                    url: `/proofs/${id}/submit`,
                    method: "POST",
                    body
                }
            },
            invalidatesTags: ["activities"]
        })
    })
})

export const {
    useGetActivitiesQuery,
    useGetMyActivitiesQuery,
    useCreateActivityMutation,
    useUpdateActivityMutation,
    useDeleteActivityMutation,
    useRegisterActivityMutation,
    useCancelActivityMutation,
    useSubmitProofMutation
} = activityApi
