import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

//Create the API

export const appApi = createApi({
  reducerPath: 'appApi',
  // baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000' }),
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}`,
  }),
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (user) => ({
        url: '/users/signup',
        method: 'POST',
        body: user,
      }),
    }),

    login: builder.mutation({
      query: (user) => ({
        url: '/users/login',
        method: 'POST',
        body: user,
      }),
    }),

    createProduct: builder.mutation({
      query: (product) => ({
        url: '/products',
        body: product,
        method: 'POST',
      }),
    }),

    deleteProduct: builder.mutation({
      query: ({ product_id, user_id }) => ({
        url: `/products/${product_id}`,
        body: {
          user_id,
        },
        method: 'DELETE',
      }),
    }),

    updateProduct: builder.mutation({
      query: (product) => ({
        url: `/products/${product.id}`,
        body: product,
        method: 'PATCH',
      }),
    }),

    //Add products to the cart
    addToCart: builder.mutation({
      query: (cartInfo) => ({
        url: '/products/add-to-cart',
        body: cartInfo,
        method: 'POST',
      }),
    }),

    //Remove products to the cart
    removeFromCart: builder.mutation({
      query: (body) => ({
        url: '/products/remove-from-cart',
        body,
        method: 'POST',
      }),
    }),

    //Increse Cart Products
    increseCartProduct: builder.mutation({
      query: (body) => ({
        url: '/products/increase-cart',
        body,
        method: 'POST',
      }),
    }),

    //Decrease Cart Products
    decreaseCartProduct: builder.mutation({
      query: (body) => ({
        url: '/products/decrease-cart',
        body,
        method: 'POST',
      }),
    }),

    //Create order
    createOrder: builder.mutation({
      query: (body) => ({
        url: '/orders',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const {
  useSignupMutation,
  useLoginMutation,
  useCreateProductMutation,
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useIncreseCartProductMutation,
  useDecreaseCartProductMutation,
  useCreateOrderMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
} = appApi

export default appApi
