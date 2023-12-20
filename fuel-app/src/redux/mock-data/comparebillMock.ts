export const primaryDateMockData = {
  accountNumber: '72737501101206965',
  statementDate: '2022-09-10',
  statementPeriod: '9/10/22 to 10/09/22',
  billInserts: {
    fromDate: '2022-09-10',
    toDate: '2022-09-10',
    success: true,
  },
  totals: {
    current: '192.14',
    prior: '0.00',
  },
  due: {
    amount: '192.14',
    date: '2022-10-04',
  },
  sections: [
    {
      heading: 'frontier monthly service charges',
      heading_value: '175.95',
      rows: [
        {
          description: 'FiberOptic Triple Play',
          value: '56.98',
        },
        {
          description: 'FiberOptic Internet 50/50',
          value: '0.00',
        },
        {
          description: 'FiberOptic Digital Voice',
          value: '0.00',
        },
        {
          description: 'VoIP Administrative Fee',
          value: '6.99',
        },
        {
          description: 'Prime TV',
          value: '79.99',
        },
        {
          description: 'Customer Appreciation Credit',
          value: '-15.00',
        },
        {
          description: '$15.00 Discount through 03/09/23',
          value: '0.00',
        },
        {
          description: 'QIP Whole-Home DVR',
          value: '17.00',
        },
        {
          description: 'QIP HD STB',
          value: '13.00',
        },
        {
          description: 'Sports/Broadcast TV Fee',
          value: '16.99',
        },
        {
          description: 'TOTAL MONTHLY SERVICE CHARGES',
          value: '175.95',
        },
      ],
    },
    {
      heading: 'taxes and other charges',
      heading_value: '16.19',
      rows: [
        {
          description: 'Federal Taxes and Charges',
          value: '4.56',
        },
        {
          description: 'State Taxes and Other Charges',
          value: '11.54',
        },
        {
          description: 'Video',
          value: '0.09',
        },
        {
          description: 'TOTAL TAXES AND OTHER CHARGES',
          value: '16.19',
        },
      ],
    },
  ],
}

export const comparingDateMockData = {
  accountNumber: '72737501101206965',
  statementDate: '2022-08-10',
  statementPeriod: '8/10/22 to 9/09/22',
  billInserts: {
    fromDate: '2022-09-10',
    toDate: '2022-09-10',
    success: true,
  },
  totals: {
    current: '185.61',
    prior: '0.00',
  },
  due: {
    amount: '185.61',
    date: '2022-09-06',
  },
  sections: [
    {
      heading: 'frontier monthly service charges',
      heading_value: '170.95',
      rows: [
        {
          description: 'FiberOptic Triple Play',
          value: '46.98',
        },
        {
          description: '$10.00 Discount through 08/16/22',
          value: '0.00',
        },
        {
          description: 'FiberOptic Internet 50/50',
          value: '0.00',
        },
        {
          description: 'FiberOptic Digital Voice',
          value: '0.00',
        },
        {
          description: 'VoIP Administrative Fee',
          value: '6.99',
        },
        {
          description: 'Prime TV',
          value: '69.99',
        },
        {
          description: '$10.00 Discount through 08/16/22',
          value: '0.00',
        },
        {
          description: 'QIP Whole-Home DVR',
          value: '17.00',
        },
        {
          description: 'QIP HD STB',
          value: '13.00',
        },
        {
          description: 'Sports/Broadcast TV Fee',
          value: '16.99',
        },
        {
          description: 'TOTAL MONTHLY SERVICE CHARGES',
          value: '170.95',
        },
      ],
    },
    {
      heading: 'taxes and other charges',
      heading_value: '14.66',
      rows: [
        {
          description: 'Federal Taxes and Charges',
          value: '3.95',
        },
        {
          description: 'State Taxes and Other Charges',
          value: '10.62',
        },
        {
          description: 'Video',
          value: '0.09',
        },
        {
          description: 'TOTAL TAXES AND OTHER CHARGES',
          value: '14.66',
        },
      ],
    },
  ],
}
