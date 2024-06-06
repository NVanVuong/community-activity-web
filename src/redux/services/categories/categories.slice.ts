import { createApiWithAuth } from "../auth/auth.service"
import {
    ICategoryId,
    ICategoryQuery,
    ICategoryCreate,
    ICategoryResponse,
    ISubcategoryId,
    ISubcategoryCreate,
    ISubcategoryResponse,
    ICategoryUpdate,
    ISubcategoryUpdate
} from "@/interfaces/categories.interface"

const creatApiUserWithAuth = createApiWithAuth("categoryApi", ["categories"])
export const categoryApi = creatApiUserWithAuth.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query<ICategoryResponse, ICategoryQuery>({
            query({ keyword = "" }) {
                return `/categories?keyword=${keyword}`
            },
            providesTags: ["categories"]
        }),
        createCategory: builder.mutation<ICategoryResponse, ICategoryCreate>({
            query(body) {
                return {
                    url: "/categories",
                    method: "POST",
                    body
                }
            },
            invalidatesTags: ["categories"]
        }),
        updateCategory: builder.mutation<ICategoryResponse, ICategoryUpdate>({
            query({ id, ...body }) {
                return {
                    url: `/categories/${id}`,
                    method: "PUT",
                    body
                }
            },
            invalidatesTags: ["categories"]
        }),
        deleteCategory: builder.mutation<ICategoryResponse, ICategoryId>({
            query(id) {
                return {
                    url: `/categories/${id}`,
                    method: "DELETE"
                }
            },
            invalidatesTags: ["categories"]
        }),
        getSubcategories: builder.query<ISubcategoryResponse, ICategoryId>({
            query(id) {
                return `/categories/${id}/subcategories`
            },
            providesTags: ["categories"]
        }),
        createSubcategory: builder.mutation<ISubcategoryResponse, ISubcategoryCreate>({
            query(body) {
                return {
                    url: "/categories/subcategories",
                    method: "POST",
                    body
                }
            },
            invalidatesTags: ["categories"]
        }),
        updateSubcategory: builder.mutation<ISubcategoryResponse, ISubcategoryUpdate>({
            query({ id, ...body }) {
                return {
                    url: `/categories/subcategories/${id}`,
                    method: "PUT",
                    body
                }
            },
            invalidatesTags: ["categories"]
        }),
        deleteSubcategory: builder.mutation<ISubcategoryResponse, ISubcategoryId>({
            query(id) {
                return {
                    url: `/categories/subcategories/${id}`,
                    method: "DELETE"
                }
            },
            invalidatesTags: ["categories"]
        })
    })
})

export const {
    useGetCategoriesQuery,
    useCreateCategoryMutation,
    useDeleteCategoryMutation,
    useGetSubcategoriesQuery,
    useCreateSubcategoryMutation,
    useDeleteSubcategoryMutation,
    useUpdateCategoryMutation,
    useUpdateSubcategoryMutation
} = categoryApi
