import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from '@reduxjs/toolkit'
import reduxThunk from 'redux-thunk'
import { RootState } from './RootState'
import {
  appDataSlice,
  appConfigSlice,
  acpSlice,
  loginSlice,
  acpUsageSlice,
  ccpaSlice,
  bgaSlice,
  freezeSlice,
  verifySlice,
  cpniSlice,
  paymentSlice,
  billsSlice,
  accountSlice,
  productsSlice,
  registerSlice,
  sessionSlice,
  quickLinksSlice,
  multifamilySlice,
  yttvSlice,
  serviceSlice,
  appErrorsSlice,
  dpAckSlice,
  apiErrorsSlice,
  equipmentReturnFindSlice,
  profileSlice,
  orderTicketSlice,
  welcomeSlice,
} from './slicers'
import { accountAccessSlice } from './slicers/accountAccess'

const reducer = combineReducers<RootState>({
  account: accountSlice.reducer,
  payment: paymentSlice.reducer,
  bills: billsSlice.reducer,
  appData: appDataSlice.reducer,
  appConfig: appConfigSlice.reducer,
  appErrors: appErrorsSlice.reducer,
  acp: acpSlice.reducer,
  login: loginSlice.reducer,
  acpUsage: acpUsageSlice.reducer,
  dpAck: dpAckSlice.reducer,
  ccpa: ccpaSlice.reducer,
  bga: bgaSlice.reducer,
  freeze: freezeSlice.reducer,
  equipmentReturnFind: equipmentReturnFindSlice.reducer,
  verify: verifySlice.reducer,
  cpni: cpniSlice.reducer,
  quickLinks: quickLinksSlice.reducer,
  products: productsSlice.reducer,
  register: registerSlice.reducer,
  session: sessionSlice.reducer,
  multifamily: multifamilySlice.reducer,
  yttv: yttvSlice.reducer,
  service: serviceSlice.reducer,
  apiErrors: apiErrorsSlice.reducer,
  profile: profileSlice.reducer,
  accountAccess: accountAccessSlice.reducer,
  orderTicket: orderTicketSlice.reducer,
  welcome: welcomeSlice.reducer,
})

const store = configureStore({
  reducer,
  middleware: [...getDefaultMiddleware(), reduxThunk],
  devTools: process.env.NODE_ENV !== 'production',
})

export type AppDispatch = typeof store.dispatch
export type TStore = ReturnType<typeof store.getState>
export default store
