import { currentBillMock } from './currentBillMock'

export interface IPaymentMethodProp {
  id: number | string
  nickName?: string
  isDefault: boolean
  name?: string
  paymentMode?: string
  paymentModeValue?: string
  accountType?: string
  fundingType?: string
  isAutopayEnabled?: boolean
}

export const paymentMethods: IPaymentMethodProp[] = [
  {
    id: 1065431,
    nickName: 'Test',
    isDefault: false,
    name: currentBillMock.firstName,
    paymentMode: 'banking',
    paymentModeValue: '8348559522591515',
    accountType: 'PERSONAL',
    fundingType: 'Checking',
    isAutopayEnabled: true,
  },
  {
    id: 1065432,
    nickName: 'Nick',
    isDefault: true,
    paymentMode: 'creditCard',
    paymentModeValue: '1234567891112940',
  },
]
