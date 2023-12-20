export const mockData = {
  orderSummaryData: {
    summaryForOrderNumber: {
      value: '1234567890',
    },
    newServicesList: [
      {
        serviceTitle: { value: 'HomeShield Elite' },
        serviceAmount: { value: '$0.99/mo' },
      },
      {
        serviceTitle: { value: '3 month discount' },
        serviceAmount: {
          value: '$6.00/mo',
          type: 'DISCOUNT',
        },
      },
      {
        serviceTitle: { value: 'My Premium Tech Pro' },
        serviceAmount: { value: '$5.00/mo' },
      },
    ],
    monthlyTotalAmount: {
      value: '$5.99/mo',
    },
    partialMonthChargesList: [
      {
        partialMonthServiceTitle: { value: 'HomeShield Elite' },
        partialMonthServiceAmount: { value: '$0.03/mo' },
      },
    ],
    oneTimeChargesList: [
      {
        oneTimeChargeTitle: { value: 'Whole-Home WiFi equipment delivery fee' },
        oneTImeChargeAmount: { value: '$10' },
      },
    ],
    totalOneTimeChargeAmount: {
      value: '$10',
    },
    existingServiceAmount: {
      value: '$64.99/mo',
    },
    totalBillAmount: {
      value: '$71.01/mo',
    },
  },
  accountInfo: {
    serviceAddress: {
      value: '1234 Service Address road - 98252 - TX',
    },
    paymentMethod: {
      value: 'Monthly bill charge',
    },
  },
  nextSteps: {
    emailAddress: {
      value: 'emailaddress@ftr.com',
    },
  },
}
