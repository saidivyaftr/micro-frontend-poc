export const returnsData = {
  returnsFind: {
    title: {
      value: 'Request Prepaid Mailers for Equipment Return',
    },
    description: {
      value:
        "To request a prepaid return mailer to ship us your equipment, we need to look up your account.Please enter the reference number on the communication you received.<br>If you don't have a reference number, please enter your 17-digit Frontier account number.",
    },
    AccountLabel: {
      value: 'Account OR Reference Number',
    },
    buttonLabel: {
      value: 'Continue',
    },
  },

  returnsList: {
    title: {
      value: 'Equipment to be Returned',
    },
    description: {
      value:
        'Below is a list of return-eligible equipment on your account. Upon receiving the receiving mailers, please return equipment within 30 days. Items not returned properly, or returning equipment damaged beyond reasonable wear and tear, will result in a fee of up to $150 per device.',
    },
    continueButtonLabel: {
      value: 'Continue',
    },
    tableData: {
      title: [
        { value: 'Make' },
        { value: 'Model' },
        { value: 'Serial Number' },
        { value: 'Return Status' },
        { value: 'Charge (if not returned)' },
      ],
      values: [
        { value: 'Arris' },
        { value: 'ABCD1234' },
        { value: '1234567' },
        { value: 'Not returned' },
        { value: '$100.00' },
      ],
    },
  },
  returnsAddress: {
    title: {
      value: 'Shipping Address for<br> Prepaid Mailers',
    },
    description: {
      value:
        'Return mailers will be shipped to the address used on your Frontier account. Please select <span>Continue</span> if this is where you wish to have the mailers shipped.<br><br>If you would like to have the mailers shipped to an alternative address, please enter that address below and then select <span>Continue</span>',
    },
    continueButtonLabel: {
      value: 'Continue',
    },
    addressLineOneLabel: {
      value: 'Address Line 1',
    },
    addressLineTwoLabel: {
      value: 'Address Line 2',
    },
    cityLabel: {
      value: 'City',
    },
    stateLabel: {
      value: 'State',
    },
    zipcodeLabel: {
      value: 'Zip Code',
    },
  },
  returnsReview: {
    title: {
      value: 'Review and Confirm <br>Information',
    },
    description: {
      value:
        'Please make sure all devices listed below are returned to avoid being charged.If you have updated your shipping address, confirm the address is correct. If you encounter an error, select <span>Edit Address</span> to make adjustments.If you are satisfied with the information provided, select <span>Submit</span>.</p>',
    },
    continueButtonLabel: {
      value: 'Continue',
    },
    editButtonLabel: {
      value: 'Edit Address',
    },
    tableData: {
      title: [
        { value: 'Make' },
        { value: 'Model' },
        { value: 'Serial Number' },
        { value: 'Return Status' },
        { value: 'Charge (if not returned)' },
      ],
      values: [
        { value: 'Arris' },
        { value: 'ABCD1234' },
        { value: '1234567' },
        { value: 'Not returned' },
        { value: '$100.00' },
      ],
    },
    addressTitle: {
      value: 'Shipping Address',
    },
  },
  returnsThank: {
    title: {
      value: 'We’ve Received Your Request',
    },
    description: {
      value:
        '<p>Your prepaid return mailer is on the way and should arrive via UPS ground within 5-7 business days.</p><p>Please ship your old equipment back immediately to avoid incurring unreturned equipment fees.</p>',
    },
    desktopImage: {
      src: '/pages/images/eqr-circuit-bg.jpg',
      alt: 'Thank you page',
    },
    ReturnButtonLabel: {
      value: 'Return to Home >',
    },
  },
}
