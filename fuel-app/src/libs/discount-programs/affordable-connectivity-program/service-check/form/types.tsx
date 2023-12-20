export type IFormValues = {
  // part 1
  applicationId: string
  hasApplicationId: string
  subscriberFirstName: string
  subscriberMiddleName: string
  subscriberLastName: string
  subscriberDob: Date | null | undefined
  subscriberState: string
  subscriberPersonalId: string
  subscriberTribalId: string
  subscriberEmail: string
  subscriberPhoneNumber: string
  subscriberServiceAddress: string
  subscriberServiceAddressStreet: string
  subscriberServiceAddressApartment: string
  subscriberServiceAddressCity: string
  subscriberServiceAddressState: string
  subscriberServiceAddressZipCode: string
  subscriberLast4Social: string

  // part 2
  communicationPreference: string
  enrollInTribalBenefit: string
  contactEmail: string
  contactMobile: string

  // part 3
  isCustomerInfoSame: string
  benefitQualifiedPersonFirstName: string
  benefitQualifiedPersonMiddleName: string
  benefitQualifiedPersonLastName: string
  benefitQualifiedPersonDob: Date | null | string | undefined
  benefitQualifiedPersonalId: string
  benefitQualifiedPersonTribalId: string
  benefitQualifiedPersonLast4Social: string
}

export interface IacpForm {
  environment?: string
  controlNumber?: string
}
export type IsetSubmitting = {
  // eslint-disable-next-line no-unused-vars
  setSubmitting: (arg: boolean) => void
}
