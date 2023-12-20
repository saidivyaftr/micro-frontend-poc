import { WelcomePageModals } from 'src/libs/account/welcome/types'

export type AccountList = Array<Account>
export type Account = {
  accountNumber: string
  accountStatus: string
  address?: IServiceAddress 
  customerType?: string
  formattedUUID?:string
  firstName: string
  lastName: string
  id: string
  name: string
  usi: string
  pin: string
  preferred: boolean
}

export type WelcomeState = {
  isLoading: boolean
  unprovisionedServices: AccountList
  errorFetchingServices?: boolean
  selectedService: Account | null

  isLoadingServiceOrders: boolean
  unprovisionedServiceOrder: IServiceOrder | null
  orderBillingSummary: null
  errorFetchingUnprovisionedServiceOrder: boolean

  modal: WelcomePageModals
  isCancelledOrder: boolean
  isSelfInstallationOrder: boolean
  isNoInstallationOrder: boolean
  isTechInstallationOrder: boolean
  hasNoAppointment: boolean
}

export type ServiceAddress = {
  street: string
  city: string
  state: string
  zip: string

  streetName?: string
  streetNumber?: string
  stateAbbreviation?: string
  cityName?: string
  secondaryNumber?: string
}

export type BillingAddress = {
  street: Array<string> | string
  city: string
  state: string
  zip: string
}

interface ServiceAddressMasterId {
  controlNumber: number
  environment: string
}
export interface IServiceOrder {
  appointment: IAppointment
  contactNumber?: string
  id: Id
  Dispatchable?: string
  SelfInstall: string
  CreatedDate: string
  VXEventCode: string
  OrderDueDate?: string
  TicketType ?:string
  trackingNumbers?: string
  OrderNumber: string,
  ServicesOrdered?:[string]
  ServiceAddress: IServiceAddress,
}
interface Id {
  environment: string
  OrderNumber: string
}
export interface IServicesOrdered {
  Name: string
}
interface ICustomer {
  accountId: AccountId
  contactNumber: string
}
export interface IServiceAddress {
  streetNumber: string
  streetName: string
  streetSuffix: string
  postDirectional: string
  city: string
  state: string
  zipCode: string
  controlNumber?: string
  environment?: string
}
export interface IAppointment {
  isCancelable: string
  isReschedulable: string
  AppointmentStatus?: string
  IsMissed?: string
  arrivalWindow: ArrivalWindow
}
export interface ArrivalWindow {
  start: string
  end: string
  END_LOCAL: string
  customerTimeZone?: string
  MULTIDAY_END?: string
  START_LOCAL?: string
  State?: string
  MULTIDAY_START?: string
}
interface AccountId {
  usi: string
  uuid: string
}
interface StatusTracker {
  badgeCopy: string
  Agent: string
  Message: string
  Message_Chatbot: string
  comStatus: string
  Stages: Stage[]
}
interface Stage {
  Stage: string
  StageLabel: string
  StageChangedDate: string
}

export type IBillingSummary = {
  environmentCode: string
  orderNumber: string
  status: string
  uuid: string
}
