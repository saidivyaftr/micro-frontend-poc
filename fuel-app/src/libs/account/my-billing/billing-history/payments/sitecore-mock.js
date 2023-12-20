export const hero = {
  title: {
    value: 'Billing History',
  },
  breadcrumb: [
    {
      title: {
        value: 'My Account',
      },
      href: {
        value: '/account/dashboard',
      },
    },
    {
      title: {
        value: 'My Billing',
      },
      href: {
        value: '/account/billing',
      },
    },
    {
      title: {
        value: 'Billing history',
      },
    },
  ],
}

export const errorMessages = {
  fetchFailed: {
    value:
      "We're having trouble displaying those details. Please try again later.",
  },
}

export const billingTabs = {
  list: {
    targetItems: [
      {
        title: {
          value: 'Statements',
        },
        url: {
          value: '/account/billing/billing-history',
        },
      },
      {
        title: {
          value: 'Payments',
        },
        url: {
          value: '/account/billing/billing-history/payments',
        },
      },
    ],
  },
}

export const paymentsTable = {
  noSchedulePayments: {
    value: 'You have no scheduled payments at this time.',
  },
  noPastPayments: {
    value: 'You currently do not have any payments in your payment history',
  },
  pastPayments: {
    value: 'Past payments',
  },
  scheduledPayments: {
    value: 'Scheduled payments',
  },
  failedPayments: {
    value: 'Failed payments',
  },
  schedulePaymentHeaders: [
    {
      value: 'Payment date',
    },
    {
      value: 'Status',
    },
    {
      value: 'Method',
    },
    {
      value: 'Amount',
    },
    {
      value: 'Actions',
    },
  ],
  pastPaymentsHeaders: [
    {
      value: 'Payment date',
    },
    {
      value: 'Status',
    },
    {
      value: 'Method',
    },
    {
      value: 'Amount',
    },
  ],
  failedPaymentsHeaders: [
    {
      value: 'Failed payment',
    },
    {
      value: 'Payment method',
    },
    {
      value: 'Failed reason code',
    },
    {
      value: 'Amount',
    },
  ],
  cancelPayment: {
    value: 'Cancel payment?',
  },
  amountlabel: {
    value: 'Amount',
  },
  dateLabel: {
    value: 'Date',
  },
  paymentMethod: {
    value: 'Payment method',
  },
  dontCancel: {
    value: "Don't Cancel",
  },
  yesCancel: {
    value: 'Yes Cancel',
  },
  cancel: {
    value: 'Cancel',
  },
  editPayment: {
    value: 'Edit Payment',
  },
  saveChanges: {
    value: 'Save Changes',
  },
  paymentFailureTitle: {
    value: "We couldn't process your payment",
  },
  paymentFailureDesc: {
    value: 'Please check your payment method and try again.',
  },
  tryAgain: {
    value: 'Try Again',
  },
  paymentSuccessTitle: {
    value: 'Payment scheduled!',
  },
  paymentSuccessDesc: {
    value:
      'It may take up to 30 minutes for your payment to be reflected in your account. Confirmation sent to',
  },
  details: {
    value: 'Details',
  },
  scheduledFor: {
    value: 'scheduled for',
  },
  returnedPayment: {
    value: 'Returned Payment',
  },
}
