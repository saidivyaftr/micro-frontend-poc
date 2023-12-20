/* eslint-disable @typescript-eslint/indent */
import { createSlice } from '@reduxjs/toolkit'
import APIClient from 'src/api-client'
import {
  OrderPageModals,
  IPayload,
} from '../../libs/helpcenter/order-ticket-status/types'
import {
  formatOrder,
  formatNonDispatchableOrder,
} from 'src/libs/helpcenter/order-ticket-status/helper'
import { IOrderTicket } from './../types/OrderTicketTypes'
import { TStore } from '../Store'

const initialState: IOrderTicket = {
  orders: {
    isLoading: false,
    data: [],
    found: 'loading',
  },
  orderData: null,
  modal: 'INIT',
}
export const orderTicketSlice = createSlice({
  name: 'orderTicket',
  initialState,
  reducers: {
    setOrders: (state, action) => {
      const { type, data } = action.payload
      switch (type) {
        case 'Loading':
          state.orders = {
            isLoading: true,
            data: [],
            error: undefined,
            found: 'loading',
          }
          break
        case 'Success':
          state.orders = {
            isLoading: false,
            data: data,
            error: undefined,
            found: data?.length > 0 ? 'found' : 'not-found',
          }
          break
        case 'Failure':
          state.orders = {
            isLoading: false,
            data: [],
            error: true,
            found: 'loading',
          }
          break
        case 'Reset':
          state.orders = {
            isLoading: false,
            data: [],
            error: undefined,
            found: 'loading',
          }
          break
      }
    },
    setOrderData: (state, action) => {
      state.orderData = action.payload
    },
    setOrderModal: (state, action) => {
      state.modal = action.payload
    },
  },
})

export const { setOrders, setOrderModal, setOrderData } =
  orderTicketSlice.actions

export const selectOrderModal = (state: TStore) => state.orderTicket.modal
export const selectTickets = (state: TStore) => state.orderTicket.orders
export const selectOrder = (state: TStore) => state.orderTicket.orderData

export const fetchOrderTickets =
  (payload: IPayload) => async (dispatch: any) => {
    try {
      dispatch(
        setOrders({
          type: 'Loading',
        }),
      )
      let orders: any = []
      //remove legacy integration when digital api supports non dispatchable orders
      const digitalApiPromise = APIClient.searchOrderTicket(payload)
      const legacyApiPromise = APIClient.searchOrderTicketLegacy(payload)
      const promises = [digitalApiPromise, legacyApiPromise]

      const apiResponse: any = await Promise.allSettled(promises)
      const ordersTickets =
        apiResponse[0]?.value?.data?.map((order: any) => formatOrder(order)) ||
        []
      const legacyOrdersTickets = apiResponse[1]?.value?.data || []
      orders = consolidateOrdersTickets(ordersTickets, legacyOrdersTickets)
      dispatch(
        setOrders({
          type: 'Success',
          data: orders,
        }),
      )
    } catch (e) {
      dispatch(
        setOrders({
          type: 'Failure',
        }),
      )
      dispatch(setOrderModal(OrderPageModals.TechnicalError))
    }
  }

const consolidateOrdersTickets = (
  ordersTickets: any,
  legacyOrdersTickets: any,
) => {
  let legacyOrdersTicketsFormatted = []
  //step 1 delete duplicates
  if (ordersTickets.length > 0 && legacyOrdersTickets.length > 0) {
    legacyOrdersTickets = legacyOrdersTickets.filter((lOrdersTT: any) => {
      return !ordersTickets.some(
        (oTT: any) => lOrdersTT.id === oTT.ticketNumber,
      )
    })
  }
  //step 2 format legacy non dispatchable orders and append
  if (legacyOrdersTickets.length > 0) {
    legacyOrdersTicketsFormatted = legacyOrdersTickets.map((order: any) =>
      formatNonDispatchableOrder(order),
    )
  }
  const finalOrdersTickets = ordersTickets.concat(legacyOrdersTicketsFormatted)
  return finalOrdersTickets
}

export const fetchAccountTickets =
  (accountUuid: string, isOrderPage = false) =>
  async (dispatch: any) => {
    try {
      dispatch(
        setOrders({
          type: 'Loading',
        }),
      )
      const { data = [] } = await APIClient.fetchAccountTickets(accountUuid)
      const orders = isOrderPage
        ? data?.map((order: any) => formatOrder(order))
        : data
      dispatch(
        setOrders({
          type: 'Success',
          data: orders,
        }),
      )
    } catch (error: any) {
      dispatch(
        setOrders({
          type: 'Failure',
        }),
      )
    }
  }
