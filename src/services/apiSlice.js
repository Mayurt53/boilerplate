import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ 
    baseUrl: process.env.REACT_APP_API_BASE_URL || 'https://api.example.com',
    prepareHeaders: (headers, { getState }) => {
      // You can add auth headers here if needed
      const token = getState()?.auth?.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['User', 'Post', 'Comment', 'Product', 'Order', 'Applicant', 'Staff'], // Define tag types for cache invalidation
  endpoints: (builder) => ({
    // Example endpoint - remove or modify as needed
    getUsers: builder.query({
      query: () => 'users',
      providesTags: ['User'],
    }),
    getUserById: builder.query({
      query: (id) => `users/${id}`,
      providesTags: (result, error, id) => [{ type: 'User', id }],
    }),
    createUser: builder.mutation({
      query: (user) => ({
        url: 'users',
        method: 'POST',
        body: user,
      }),
      invalidatesTags: ['User'],
    }),
    updateUser: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `users/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'User', id }],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
    // PRODUCTS
    getProducts: builder.query({
      query: () => 'products',
      providesTags: (result = [], error, arg) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Product', id })),
              { type: 'Product', id: 'LIST' },
            ]
          : [{ type: 'Product', id: 'LIST' }],
    }),
    addProduct: builder.mutation({
      query: (product) => ({
        url: 'products',
        method: 'POST',
        body: product,
      }),
      invalidatesTags: [{ type: 'Product', id: 'LIST' }],
    }),
    updateProduct: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `products/${id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Product', id },
        { type: 'Product', id: 'LIST' },
      ],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Product', id },
        { type: 'Product', id: 'LIST' },
      ],
    }),
    // ORDERS
    getOrders: builder.query({
      query: () => 'orders',
      providesTags: (result = [], error, arg) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Order', id })),
              { type: 'Order', id: 'LIST' },
            ]
          : [{ type: 'Order', id: 'LIST' }],
    }),
    addOrder: builder.mutation({
      query: (order) => ({
        url: 'orders',
        method: 'POST',
        body: order,
      }),
      invalidatesTags: [{ type: 'Order', id: 'LIST' }],
    }),
    updateOrder: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `orders/${id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Order', id },
        { type: 'Order', id: 'LIST' },
      ],
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `orders/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Order', id },
        { type: 'Order', id: 'LIST' },
      ],
    }),
    // APPLICANTS
    getApplicants: builder.query({
      query: () => 'applicants',
      providesTags: (result = [], error, arg) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Applicant', id })),
              { type: 'Applicant', id: 'LIST' },
            ]
          : [{ type: 'Applicant', id: 'LIST' }],
    }),
    addApplicant: builder.mutation({
      query: (applicant) => ({
        url: 'applicants',
        method: 'POST',
        body: applicant,
      }),
      invalidatesTags: [{ type: 'Applicant', id: 'LIST' }],
    }),
    updateApplicant: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `applicants/${id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Applicant', id },
        { type: 'Applicant', id: 'LIST' },
      ],
    }),
    deleteApplicant: builder.mutation({
      query: (id) => ({
        url: `applicants/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Applicant', id },
        { type: 'Applicant', id: 'LIST' },
      ],
    }),
    // STAFF
    getStaff: builder.query({
      query: () => 'staff',
      providesTags: (result = [], error, arg) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Staff', id })),
              { type: 'Staff', id: 'LIST' },
            ]
          : [{ type: 'Staff', id: 'LIST' }],
    }),
    addStaff: builder.mutation({
      query: (staff) => ({
        url: 'staff',
        method: 'POST',
        body: staff,
      }),
      invalidatesTags: [{ type: 'Staff', id: 'LIST' }],
    }),
    updateStaff: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `staff/${id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Staff', id },
        { type: 'Staff', id: 'LIST' },
      ],
    }),
    deleteStaff: builder.mutation({
      query: (id) => ({
        url: `staff/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Staff', id },
        { type: 'Staff', id: 'LIST' },
      ],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetOrdersQuery,
  useAddOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
  useGetApplicantsQuery,
  useAddApplicantMutation,
  useUpdateApplicantMutation,
  useDeleteApplicantMutation,
  useGetStaffQuery,
  useAddStaffMutation,
  useUpdateStaffMutation,
  useDeleteStaffMutation,
} = apiSlice; 