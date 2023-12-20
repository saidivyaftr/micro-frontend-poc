export const mockDataByDate = {
  accountNumber: '72737501101206965',
  statementDate: '2022-10-10',
  statementPeriod: '10/10/22 to 11/09/22',
  billInserts: {
    fromDate: '2022-10-10',
    toDate: '2022-10-10',
    success: true,
  },
  totals: {
    current: '141.54',
    prior: '0.00',
  },
  due: {
    amount: '141.54',
    date: '2022-11-03',
  },
  sections: [
    {
      heading: 'frontier monthly service charges',
      heading_value: '175.95',
      rows: [
        {
          description: 'FiberOptic Triple Play',
          value: '86.98',
        },
        {
          description: 'FiberOptic Internet 50/50',
          value: '0.00',
        },
        {
          description: 'FiberOptic Digital Voice',
          value: '9.00',
        },
        {
          description: 'VoIP Administrative Fee',
          value: '12.99',
        },
        {
          description: 'Prime TV',
          value: '79.99',
        },
        {
          description: 'Customer Appreciation Credit',
          value: '-25.00',
        },
        {
          description: '$15.00 Discount through 03/09/23',
          value: '90.00',
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
          value: '15.95',
        },
      ],
    },
    {
      heading: 'taxes and other charges',
      heading_value: '15.59',
      rows: [
        {
          description: 'Federal Taxes and Charges',
          value: '3.99',
        },
        {
          description: 'State Taxes and Other Charges',
          value: '11.51',
        },
        {
          description: 'Video',
          value: '0.09',
        },
        {
          description: 'TOTAL TAXES AND OTHER CHARGES',
          value: '15.59',
        },
      ],
    },
  ],
}

export const mockComparingDataByDate = {
  accountNumber: '72737501101206965',
  statementDate: '2022-09-10',
  statementPeriod: '9/10/22 to 10/09/22',
  billInserts: {
    fromDate: '2022-10-10',
    toDate: '2022-10-10',
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

export const mockCurrentBill = {}
