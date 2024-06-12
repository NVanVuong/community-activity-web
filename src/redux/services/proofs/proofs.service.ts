import {
    IProofCreateRequest,
    IProofId,
    IProofQuery,
    IProofResponse,
    IProofSubmitRequest
} from "@/interfaces/proof.interface"
import { createApiWithAuth } from "../auth/auth.service"

const creatApiUserWithAuth = createApiWithAuth("proofApi", ["proofs"])
export const proofApi = creatApiUserWithAuth.injectEndpoints({
    endpoints: (builder) => ({
        getProofs: builder.query<IProofResponse, IProofQuery>({
            query({ keyword = "" }) {
                return `/proofs?keyword=${keyword}`
            },
            providesTags: ["proofs"]
        }),
        getMyProofs: builder.query<IProofResponse, IProofQuery>({
            query({ keyword = "" }) {
                return `/proofs/me?keyword=${keyword}`
            },
            providesTags: ["proofs"]
        }),
        updateProof: builder.mutation<IProofResponse, IProofSubmitRequest>({
            query({ id, formData: body }) {
                return {
                    url: `/proofs/${id}`,
                    method: "PUT",
                    body
                }
            },
            invalidatesTags: ["proofs"]
        }),
        deleteProof: builder.mutation<IProofResponse, IProofId>({
            query(id) {
                return {
                    url: `/proofs/${id}`,
                    method: "DELETE"
                }
            },
            invalidatesTags: ["proofs"]
        }),
        aprroveProof: builder.mutation<IProofResponse, string>({
            query(id) {
                return {
                    url: `/proofs/${id}/approve`,
                    method: "POST"
                }
            },
            invalidatesTags: ["proofs"]
        }),
        rejectProof: builder.mutation<IProofResponse, string>({
            query(id) {
                return {
                    url: `/proofs/${id}/reject`,
                    method: "POST"
                }
            },
            invalidatesTags: ["proofs"]
        }),
        submitProofExternal: builder.mutation<IProofResponse, IProofCreateRequest>({
            query(body) {
                return {
                    url: `/proofs`,
                    method: "POST",
                    body
                }
            },
            invalidatesTags: ["proofs"]
        })
    })
})

export const {
    useGetProofsQuery,
    useGetMyProofsQuery,
    useUpdateProofMutation,
    useDeleteProofMutation,
    useAprroveProofMutation,
    useRejectProofMutation,
    useSubmitProofExternalMutation
} = proofApi
