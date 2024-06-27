import { IRoleQuery, IRoleResponse, IRoleSubcategoryResponse } from "@/interfaces/user.interface"
import { createApiWithAuth } from "../auth/auth.service"

const creatApiUserWithAuth = createApiWithAuth("roleApi", ["roles"])
export const roleApi = creatApiUserWithAuth.injectEndpoints({
    endpoints: (builder) => ({
        getRoles: builder.query<IRoleResponse, IRoleQuery>({
            query({ keyword = "" }) {
                return `/roles?keyword=${keyword}`
            },
            providesTags: ["roles"]
        }),
        createRole: builder.mutation<IRoleResponse, IRoleQuery>({
            query(body) {
                return {
                    url: "/roles",
                    method: "POST",
                    body
                }
            },
            invalidatesTags: ["roles"]
        }),
        deleteRole: builder.mutation<IRoleResponse, string>({
            query(id) {
                return {
                    url: `/roles/${id}`,
                    method: "DELETE"
                }
            },
            invalidatesTags: ["roles"]
        }),
        addSubcategoriesToRole: builder.mutation<IRoleResponse, { id: string; subcategoryIds: string[] }>({
            query({ id, subcategoryIds }) {
                return {
                    url: `/roles/${id}/subcategories`,
                    method: "POST",
                    body: { subcategoryIds }
                }
            },
            invalidatesTags: ["roles"]
        }),
        getRoleSubcategories: builder.query<IRoleSubcategoryResponse, string>({
            query(id) {
                return `/roles/${id}/subcategories`
            }
        })
    })
})

export const {
    useGetRolesQuery,
    useCreateRoleMutation,
    useDeleteRoleMutation,
    useAddSubcategoriesToRoleMutation,
    useGetRoleSubcategoriesQuery
} = roleApi
