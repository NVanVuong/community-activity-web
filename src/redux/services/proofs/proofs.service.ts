import {
    IProofCreateRequest,
    IProofId,
    IProofQuery,
    IProofResponse,
    IProofUpdateRequest
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
        createProof: builder.mutation<IProofResponse, IProofCreateRequest>({
            query(body) {
                return {
                    url: "/proofs",
                    method: "POST",
                    body
                }
            },
            invalidatesTags: ["proofs"]
        }),
        updateProof: builder.mutation<IProofResponse, IProofUpdateRequest>({
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
        aprroveProof: builder.mutation<IProofResponse, { id: string }>({
            query(id) {
                return {
                    url: `/proofs/${id}/approve`,
                    method: "POST"
                }
            },
            invalidatesTags: ["proofs"]
        }),
        rejectProof: builder.mutation<IProofResponse, { id: string }>({
            query(id) {
                return {
                    url: `/proofs/${id}/reject`,
                    method: "POST"
                }
            },
            invalidatesTags: ["proofs"]
        })
    })
})

export const {
    useGetProofsQuery,
    useCreateProofMutation,
    useUpdateProofMutation,
    useDeleteProofMutation,
    useAprroveProofMutation,
    useRejectProofMutation
} = proofApi
