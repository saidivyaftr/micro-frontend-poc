import { AppConfig } from './types/appConfigTypes'
import { AcpPage, AcpUsageState } from './types/acpTypes'
import { DpAckState } from './types/dpTypes'
import { CCPAPage } from './types/ccpaTypes'
import { BgaPage } from './types/bgaTypes'
import { FreezePage } from './types/freezeTypes'
import { VerifyPage } from './types/tpverifyTypes'
import { CPNIPage } from './types/cpniTypes'
import { AccountState } from './types/accountTypes'
import { PaymentState } from './types/payments'
import { BillsState } from './types/billTypes'
import { ProductsState } from './types/productTypes'
import { Register } from './types/registerTypes'
import { Login } from './types/loginTypes'
import { Session } from './types/sessionTypes'
import { MultifamilyPage } from './types/multifamilyTypes'
import { equipmentReturnFindPage } from './types/equipmentReturnsTypes'
import { Profile } from './types/profile'
import { AccountAccess } from './types/accountAccessTypes'

export type State = {
  account: AccountState
  appConfig: AppConfig
  acp: AcpPage
  acpUsage: AcpUsageState
  dpAck: DpAckState
  ccpa: CCPAPage
  bga: BgaPage
  freeze: FreezePage
  verify: VerifyPage
  cpni: CPNIPage
  payment: PaymentState
  bills: BillsState
  products: ProductsState
  appData: any
  quickLinks: any
  register: Register
  login: Login
  session: Session
  multifamily: MultifamilyPage
  equipmentReturnFind: equipmentReturnFindPage
  Profile: Profile
  accountAccess: AccountAccess
  orderTicket: any
}

export * from './types/acpTypes'
export * from './types/dpTypes'
