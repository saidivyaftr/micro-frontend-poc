import { AccountState } from './types/accountTypes'
import { AcpPage, AcpUsageState } from './types/acpTypes'
import { AppConfig } from './types/appConfigTypes'
import { BgaPage } from './types/bgaTypes'
import { BillsState } from './types/billTypes'
import { CCPAPage } from './types/ccpaTypes'
import { CPNIPage } from './types/cpniTypes'
import { FreezePage } from './types/freezeTypes'
import { PaymentState } from './types/payments'
import { ProductsState } from './types/productTypes'
import { VerifyPage } from './types/tpverifyTypes'
import { Profile } from './types/profile'

import { appErrorsState } from './slicers/appErrors'
import { apiErrorsState } from './slicers/apiErrors'
import { YTTVState } from './slicers/yttv'
import { ServiceState } from './types/serviceTypes'
import { AccountAccess } from './types/accountAccessTypes'
import { WelcomeState } from './types/welcomeTypes'

export type RootState = {
  account: AccountState
  payment: PaymentState
  bills: BillsState
  appConfig: AppConfig
  acp: AcpPage
  products: ProductsState
  appData: any
  login: any
  acpUsage: AcpUsageState
  dpAck: any
  ccpa: CCPAPage
  bga: BgaPage
  freeze: FreezePage
  verify: VerifyPage
  equipmentReturnFind: any
  cpni: CPNIPage
  register: any
  session: any
  quickLinks: any
  multifamily: any
  yttv: YTTVState
  service: ServiceState
  appErrors: appErrorsState
  apiErrors: apiErrorsState
  profile: Profile
  accountAccess: AccountAccess
  orderTicket: any
  welcome: WelcomeState
}
