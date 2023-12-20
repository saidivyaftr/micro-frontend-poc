import { Appointment } from 'src/libs/account/welcome/types'

/* eslint-disable @typescript-eslint/no-namespace */
export namespace ServiceOrders {
  export type ServiceAddress = {
    streetNumber: string
    preDirectional: string
    streetName: string
    streetSuffix: string
    postDirectional: string
    secondaryDesignator: string
    secondaryNumber: string
    cityName: string
    stateAbbreviation: string
    zipCode: string
    plus4: string
  }

  export type Product = {
    action: string
    description: string
    filteredDescription: string
    id: string
    quantity: string
  }

  export type UpdateAppointmentPayload = {
    serviceId: string
    issueType?: string
    id: string
    appointment: Appointment
  }

  export type ServiceOrderDetails = {
    appointment: {
      canBeReachedTelephoneNumber: string
      endDate: string
      startDate: string
    }
    completionDate: string
    createDate: string
    deactivatedDate: string
    dueDate: string
    id: string
    isModifiable: boolean
    orderType: string
    orderTypeDescription: string
    productsAdded: Array<Product>
    productsRemoved: Array<Product>
    serviceAddress: ServiceAddress
    stageCode: string
    stageDescription: string
    status: string
    trackingNumbers?: any
    uuid: string
    wtn: string
    installationType: 'SELF_INSTALL' | 'FULL_INSTALL' | 'NO_INSTALL'
  }

  export type ServiceOrderList = Array<ServiceOrderDetails>

  export type ServiceOrderContact = {
    serviceId: string
    id: string
    appointment: {
      canBeReachedTelephoneNumber: string
    }
    issueType?: string
  }
}
/* eslint-disable @typescript-eslint/indent */
export type PostPaymentPayload = {
  email: string
  date: string
  fundingType: string
  addToWallet: boolean
  token: string
  amount: string
  customerType: string
  customerName: string
  referenceCode?: string
  error?: any
  description?: string
}

export type AutoPayPayload = {
  customerType: string
  email: string
  paymentMethodId: string | number
}

export type ExpressPayLoginPayload =
  | {
      accountNumber: string
      email: string
    }
  | {
      accountNumber: string
      zipCode: string
    }

export type ExpressPayPayload = {
  amount: string
  email: string
  token: string
  sessionToken: string
  accountId: string
  customerType: string
  customerName: string
  paymentType: string
  messageId: string
}

export type PostPaymentMethodPayload = {
  customerName: string
  customerType: string
  isDefault: boolean
  nickName: string
  token: string
}

export type CheckingPaymentMethodPayload = {
  type: 'Checking'
  nickName: string
  setAsDefault: boolean
}

export type CardPaymentMethodPayload = {
  type: 'Card'
  nickName?: string
  zipCode?: string
  expiration?: string
  setAsDefault?: boolean
}

export type PaymentMethodPayload =
  | CheckingPaymentMethodPayload
  | CardPaymentMethodPayload

export type UpdatePasscodePayload = {
  accountPin: string
}

export type UpdateProfileEmailPayload = {
  changeProfileEmail: boolean
  email: string
}

export type UpdatePasswordPayload = {
  changePassword: boolean
  newPassword: string
  oldPassword: string
}

export type IPayment = {
  amount: number
  apportioning: any[]
  automaticPaymentMethodId?: string
  batchId?: string
  confirmation: string
  date: string
  deletable: boolean
  emailAddress: string
  method: string
  paymentId: string
  paymentMethodId: string
  postdate: string
  source: string
  status: string
  updateable: boolean
}

export type DiscoverAuthenticate = {
  token: string
  apiNumber: number
  authentication: { id: string; value?: string }
}

export type CancelOrderTicket = {
  action: string
  ticketNumber: string
  ticketType: string
}

export type UpdateVacationPayload = {
  enable: boolean
  endDate?: string
}
