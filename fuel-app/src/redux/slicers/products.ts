/* eslint-disable @typescript-eslint/indent */
import { createSlice } from '@reduxjs/toolkit'
import mockProductDetails from '../mock-data/product-details'
import { delayUntil } from '../helper-util'
import APIClient from 'src/api-client'
import { ProductDetails, ProductsState } from '../types/productTypes'
import { TStore } from '../Store'

const initialState: ProductsState = {
  details: {
    isLoading: false,
    data: {},
  },
}

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProductDetails: (state, action) => {
      const { type, data } = action.payload
      switch (type) {
        case 'Loading': {
          state.details = {
            isLoading: true,
            data: {},
            error: undefined,
          }
          break
        }
        case 'Success': {
          state.details = {
            isLoading: false,
            data,
            error: undefined,
          }
          break
        }
        case 'Failure': {
          state.details = {
            isLoading: false,
            data: {},
            error: true,
          }
          break
        }
      }
    },
  },
})

export const fetchProductDetails =
  (accountId: string, type = 'generic') =>
  async (dispatch: any) => {
    try {
      dispatch(productsSlice.actions.setProductDetails({ type: 'Loading' }))
      let productDetails: ProductDetails
      if (process.env.NEXT_PUBLIC_USE_MOCK !== 'true') {
        const apiResponse = await APIClient.getProducts(accountId, type)
        productDetails = apiResponse.data
      } else {
        await delayUntil(1000)
        productDetails = mockProductDetails
      }
      dispatch(
        productsSlice.actions.setProductDetails({
          type: 'Success',
          data: productDetails,
        }),
      )
    } catch (error: any) {
      dispatch(productsSlice.actions.setProductDetails({ type: 'Failure' }))
    }
  }

export const selectProductDetails = (state: TStore) => state.products.details
