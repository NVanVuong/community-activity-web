import { IRoleQuery, IRoleResponse } from "@/interfaces/user.interface"
import { createApiWithAuth } from "../auth/auth.service"

const creatApiUserWithAuth = createApiWithAuth("roleApi", ["roles"])
export const roleApi = creatApiUserWithAuth.injectEndpoints({
    endpoints: (builder) => ({
        getRoles: builder.query<IRoleResponse, IRoleQuery>({
            query({ keyword = "" }) {
                return `/Roles?keyword=${keyword}`
            },
            providesTags: ["roles"]
        }),
        createRole: builder.mutation<IRoleResponse, IRoleQuery>({
            query(body) {
                return {
                    url: "/Roles",
                    method: "POST",
                    body
                }
            },
            invalidatesTags: ["roles"]
        }),
        deleteRole: builder.mutation<IRoleResponse, string>({
            query(id) {
                return {
                    url: `/Roles/${id}`,
                    method: "DELETE"
                }
            },
            invalidatesTags: ["roles"]
        }),
        addSubcategoriesToRole: builder.mutation<IRoleResponse, { id: string; subcategoryIds: string[] }>({
            query({ id, subcategoryIds }) {
                return {
                    url: `/Roles/${id}/subcategories`,
                    method: "POST",
                    body: { subcategoryIds }
                }
            },
            invalidatesTags: ["roles"]
        })
    })
})

export const { useGetRolesQuery, useCreateRoleMutation, useDeleteRoleMutation, useAddSubcategoriesToRoleMutation } =
    roleApi
