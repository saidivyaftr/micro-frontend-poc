export default {
  failedPayments: [
    {
      account: {
        invoiceBillingAccountNumber: '21422214660725185',
      },
      transmissionDate: '2023-05-18',
      paymentAmount: '189.40',
      paymentMethod: 'Scheduled Payment - Card',
      confirmationNumber: '',
      processDateTime: '2023-05-18T03:08:38-05:00',
      paymentChannel: 'ftrcom',
      agentId: 'ftrcom',
      reason: {
        processorResponseCode: 326,
        customerMessage: 'Expired Card',
        cardDeclineType: 'SOFT',
      },
    },
  ],
  history: [
    {
      source: 'Fiserv',
      batchId: '',
      paymentId: 'p224LBMD5D',
      date: '2022-11-09T04:00:00.000Z',
      status: 'Pending',
      amount: '40',
      postdate: '',
      method: 'Bank Account ending in 0728',
      confirmation: 'p224LBMD5D',
      updateable: false,
      deletable: false,
    },
  ],
  scheduled: [
    {
      source: 'DST',
      batchId: '',
      paymentId: 'p224LBMFKL',
      date: '2022-11-10T04:00:00.000Z',
      status: 'Successful',
      amount: 525.4,
      postdate: '2022-11-10T17:23:25.000Z',
      method: 'Bank',
      description: '1x ACH - Online',
      confirmation: 'p224LBMFKL',
      updateable: false,
      deletable: false,
    },
  ],
}
