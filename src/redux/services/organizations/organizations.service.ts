import {
    IOrganizationQuery,
    IOrganizationResponse,
    IOrganizationSubcategoriesResponse
} from "@/interfaces/organization"
import { createApiWithAuth } from "../auth/auth.service"

const creatApiUserWithAuth = createApiWithAuth("organizationApi", ["organizations"])
export const organizationApi = creatApiUserWithAuth.injectEndpoints({
    endpoints: (builder) => ({
        getOrganizations: builder.query<IOrganizationResponse, IOrganizationQuery>({
            query({ keyword = "" }) {
                return `/organizations?keyword=${keyword}`
            },
            providesTags: ["organizations"]
        }),
        createOrganization: builder.mutation<IOrganizationResponse, IOrganizationQuery>({
            query(body) {
                return {
                    url: "/organizations",
                    method: "POST",
                    body
                }
            },
            invalidatesTags: ["organizations"]
        }),
        deleteOrganization: builder.mutation<IOrganizationResponse, string>({
            query(id) {
                return {
                    url: `/organizations/${id}`,
                    method: "DELETE"
                }
            },
            invalidatesTags: ["organizations"]
        }),
        addSubcategoriesToOrganization: builder.mutation<
            IOrganizationResponse,
            { id: string; subcategoryIds: string[] }
        >({
            query({ id, subcategoryIds }) {
                return {
                    url: `/organizations/${id}/subcategories`,
                    method: "POST",
                    body: { subcategoryIds }
                }
            },
            invalidatesTags: ["organizations"]
        }),
        getOrganizationSubcategories: builder.query<IOrganizationSubcategoriesResponse, string>({
            query(id) {
                return `/organizations/${id}/subcategories`
            },
            providesTags: ["organizations"]
        })
    })
})

export const {
    useGetOrganizationsQuery,
    useCreateOrganizationMutation,
    useDeleteOrganizationMutation,
    useAddSubcategoriesToOrganizationMutation,
    useGetOrganizationSubcategoriesQuery
} = organizationApi
