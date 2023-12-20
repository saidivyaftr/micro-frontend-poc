export const currentBillMock = {
  id: '72737501101206965',
  accountNumber: '72737501101206965',
  pin: '7603',
  accountPin: {
    accountUuid: '90459005-40a8-1a06-a62b-0004ac1be08b',
    pinNumber: '36900',
    created: {
      userId: null,
      source: 'CDB',
      dateTime: '2022-01-14T00:43:58-05:00',
    },
    updated: {
      userId: null,
      source: 'CDB',
      dateTime: '2022-01-14T01:43:12-05:00',
    },
  },
  dataRegion: 'FT',
  firstName: 'MARIANNE',
  lastName: 'BALDA',
  accountType: 'Residential',
  fundingType: 'CHECKING',
  paperless: true,
  paperBillFee: '2.99',
  statementPeriod: '9/10/22 to 10/09/22',
  statementDate: '2022-09-10',
  paymentMethod: 'Checking ending in 9492',
  bill: {
    balanceBeforeCurrentCharges: {
      amount: 0,
    },
    lastStatementBalance: {
      amount: 192.14,
      date: '2022-09-10',
    },
    paymentSinceLastStatement: {
      amount: 192.14,
      date: '',
    },
    paymentReceivedSinceLastStatement: {
      amount: 192.14,
    },
    creditsOrAdjustments: {
      amount: 0,
      status: 'applied',
    },
    pendingPayment: {
      amount: 0,
      date: '',
      isAutoPayMode: true,
    },
    pendingPayments: {
      amount: 0,
    },
    scheduledPayments: {
      amount: 0,
    },
    pastDueBalance: {
      amount: 0,
      date: '2022-09-10',
    },
    currentBalance: {
      amount: 0,
      dueDate: '2022-10-04',
    },
    manageBillData: {
      balanceBeforeCurrentCharges: 0,
      currentCharges: 192.14,
      amountOfLastBill: 185.61,
      paymentReceivedThruText: 'Payments Received ',
      lastBillDate: '2022-09-06',
      paymentReceivedThruAmount: -185.61,
    },
    isPastDue: false,
    consolidatedBalance: {
      pendingEBPPPaymentsNotInDPI: {
        amount: '0',
      },
      pendingUnpostedPayments: {
        amount: '0',
      },
      postedUnbilledBelowTheLineAdjustments: {
        amount: '0',
      },
      currentBalanceInDPI: {
        amount: '0',
      },
      consolidatedBalanceDue: {
        amount: '0',
      },
    },
  },
  billingAddress: {
    street: ['9101 CALLE ALTA'],
    city: 'NEW PRT RICHY',
    state: 'FL',
    zip: '346555243',
  },
  billingContactEmail: 'MIMI6140@VERIZON.NET',
  primaryContact: 'mimi6140@aol.com',
  serviceRefreshEligible: true,
  preferredLanguageCode: 'ENG',
  obpStatus: true,
  constraints: {
    payments: {
      minimumAmount: 1,
      maximumAmount: 3000,
      latestScheduledPaymentDate: '2022-11-19',
    },
    blocking: {
      isBlockedForACH: false,
      isBlockedForCard: false,
      isBlockedForPaymentVelocity: false,
    },
  },
  autopayType: 'fiserv',
  ecommerceEnabled: false,
}

export const currentBillMockTableData = {
  charges: [
    {
      header: 'Frontier Monthly Service Charges',
      totalAmount: 175,
      feeItems: [
        {
          title: 'FiberOptic Triple Play',
          amount: 56.98,
        },
        {
          title: 'FiberOptic Internet 50/50',
          amount: 0,
        },
        {
          title: 'FiberOptic Digital Voice',
          amount: 0,
        },
        {
          title: 'VoIP Administrative Fee',
          amount: '6.99',
        },
        {
          title: 'PrimeTV',
          amount: '79.99',
        },
        {
          title: 'Customer Appreciation Credit',
          amount: '-15',
        },
        {
          title: '$15.00 Discount through 03/09/23',
          amount: '0',
        },
        {
          title: 'QIP Whole-Home DVR',
          amount: '17.00',
        },
        {
          title: 'QIP HD STB',
          amount: '13.00',
        },
        {
          title: 'Sports/Broadcast TV Fee',
          amount: '16.99',
        },
        {
          title: 'TOTAL MONTHLY SERVICE CHARGES',
          amount: '175.95',
        },
      ],
    },
    {
      header: 'Taxes and Other Charges',
      totalAmount: 16.19,
      feeItems: [
        {
          title: 'Federal Taxes and Charges',
          amount: 4.56,
        },
        {
          title: 'State Taxes and Other Charges',
          amount: 11.54,
        },
        {
          title: 'Video',
          amount: 0.09,
        },
        {
          title: 'TOTAL TAXES AND OTHER CHARGES',
          amount: 16.19,
        },
      ],
    },
  ],
  addOns: [
    {
      title: 'Balance Forward',
      amount: 0,
    },
    {
      title: 'New Charges',
      amount: 192.14,
    },
    {
      title: 'Total Bill Amount',
      amount: 192.14,
    },
  ],
}

export const mockCurrentBillData = {
  accountNumber: '23901064500924105',
  statementDate: '2022-10-25',
  statementPeriod: '10/25/22 to 11/24/22',
  billInserts: {
    fromDate: '2022-10-25',
    toDate: '2022-10-25',
    success: true,
  },
  totals: {
    current: '0.00',
    prior: '-185.71',
  },
  due: {
    amount: '-185.71',
  },
  sections: [
    {
      heading: 'frontier monthly service charges',
      heading_value: '0.00',
      rows: [
        {
          description: 'TOTAL MONTHLY SERVICE CHARGES',
          value: '0.00',
        },
      ],
    },
  ],
}
