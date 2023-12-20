import { WelcomePageModals } from 'src/libs/account/welcome/types'
export const welcomePageData = {
  orderDetailsData: {
    trackingNumbers: [
      {
        id: '92845325970718945',
        url: '/buy',
      },

      {
        id: '345436563532323',
        url: '/new',
      },
    ],
    appointment: {
      canBeReachedTelephoneNumber: '654545454',
      endDate: '2023-07-07',
      startDate: '2023-07-07',
    },
    completionDate: '2023-07-07',
    createDate: '2023-07-07',
    deactivatedDate: '2029-07-07',
    dueDate: '2023-07-20',
    id: '92845325970718945',
    isModifiable: false,
    orderType: ' string',
    orderTypeDescription: ' string',
    productsAdded: [
      {
        action: 'string',
        description: 'string',
        filteredDescription: 'string',
        id: 'string',
        quantity: 'string',
      },
    ],
    productsRemoved: [],
    serviceAddress: {
      streetNumber: '12',
      preDirectional: 'string',
      streetName: 'NY',
      streetSuffix: 'NY',
      postDirectional: 'NY',
      secondaryDesignator: 'NY',
      secondaryNumber: 'NY',
      cityName: 'LAKE HAVASU CITY',
      stateAbbreviation: 'AZ',
      zipCode: '86406000',
      plus4: 'string',
    },
    stageCode: 'stageCode',
    stageDescription: 'stageDescription',
    status: 'active',
    uuid: '7e7ace35-148d-67a6-n62n-0004ac1be08b',
    wtn: ' 9779898998989898',
    installationType: 'INSTALL',
  },
  updateContextObject: () => null,
  orderDetailAPIError: false,
  modal: null,
  setModal: () => null,
  isSelfInstallationOrder: false,
  isNoInstallationOrder: false,
  isCancelledOrder: false,
  isTechInstallationOrder: true,
}

export const prepareForInstallationCard = {
  installationTitle: {
    value: 'Install Devices',
  },
  servicesTitle: {
    value: 'Services',
  },
  techInstall: {
    list: [
      {
        title: {
          value: 'testing1',
        },
      },
    ],
  },
  noInstall: [],
  selfInstall: [],
}

export const orderInfo = {
  orderNumber: '1',
  status: 'Status',
  cancelled: 'cancelled',
  serviceReadyDate: '2023-07-07',
  upsTrackingNumber: 'UPST1250',
  servicesOrdered: '2023-07-05',
}

export const orderDetailsCard = {
  title: 'Order Details',
  installationAppointmentTitle: 'Installation Appointment',
}

export const confirmAppointment = {
  title: 'Confirm',
  description: 'Confirm Appointment Modal',
}

export const editAppointmentInfo = {
  appointmentScheduleContent: 'Appointment Schedule',
  selectDateandTimeContent: '2023-07-10 10.00 AM',
  title: 'Edit Appointment',
}

export const contactNumber = {
  contactNumber: '9843216919',
  numberUsedByTechnician: '9742219696',
  changingThisNumber: '9842219696',
  noPhoneNumber: 'No Phone Number',
  edit: 'Edit',
  save: 'Save',
  cancel: 'Cancel',
  inVaildMobileError: 'Invalid Mobile Number',
}

export const dimensionsData = {
  width: 500,
}

export const orderDetailsData = {
  id: '043395440',
  status: 'In-Progress',
  createDate: '2023-04-27',
  dueDate: '2023-05-19',
  deactivatedDate: '',
  isModifiable: true,
  orderType: 'RI',
  orderTypeDescription: 'RI',
  serviceAddress: {
    streetNumber: '708',
    streetName: 'WEBSTER',
    streetSuffix: 'RD',
    cityName: 'SUMMERSVILLE',
    stateAbbreviation: 'WV',
    zipCode: '26651',
    plus4: '0000',
    preDirectional: '',
    postDirectional: '',
    secondaryDesignator: '',
    secondaryNumber: '',
  },
  completionDate: '2023-04-27',
  installationType: 'SELF_INSTALL',
  stageCode: 'DIS',
  stageDescription: 'DISPATCH (VNET)',
  productsAdded: [
    {
      action: 'Add',
      quantity: '1',
      id: 'RNCV1',
      filteredDescription: 'Unlimited Voice',
      description: 'Unlimited Voice',
    },
    {
      action: 'Add',
      quantity: '1',
      id: 'EUAR',
      filteredDescription: '',
      description: 'Primary Federal Subscriber Line Charge',
    },
    {
      action: 'Add',
      quantity: '1',
      id: 'CCRSR',
      filteredDescription: '',
      description: 'Carrier Cost Recovery Surcharge',
    },
  ],
  productsRemoved: [],
  wtn: '3048724099',
  uuid: 'D804D0014B0E1A9D909E0004AC1EA1AD',
  appointment: {
    canBeReachedTelephoneNumber: '8124576933',
    endDate: '2023-04-27',
    startDate: '2023-04-27',
  },
}
export const trackOrderData = {
  techInstall: {
    targetItem: {
      title: {
        value: 'Tech Install Title',
      },
      description: {
        value: 'Tech Install Description',
      },
      imgUrl: {
        src: 'https://content-qat.frontier.com/-/jssmedia/Project/Frontier/Dotcom/Images/account-pages/welcome/iphone-12-mini--screen.svg?rev=197c5a7f04fa4f0e80531ff8b03ffd09',
        alt: 'tech-install',
      },
    },
  },
}

export const welcomeContext = {
  orderDetailsData,
  orderDetailAPIError: false,
  modal: WelcomePageModals.Init,
  setModal: jest.fn(),
  isSelfInstallationOrder: false,
  isNoInstallationOrder: false,
  isCancelledOrder: false,
  isTechInstallationOrder: true,
  updateContextObject: jest.fn(),
}

export const welcomePageModalContext = {
  orderDetailsData,
  orderDetailAPIError: false,
  modal: WelcomePageModals.EditAppointment,
  setModal: jest.fn(),
  isSelfInstallationOrder: false,
  isNoInstallationOrder: false,
  isCancelledOrder: false,
  isTechInstallationOrder: true,
  updateContextObject: jest.fn(),
}

export const orderDetails = {
  technicianArrival: {
    value: 'Technical arrival',
  },
  editAppointment: {
    value: 'Edit Appointment',
  },
}

export const updateAppointment = {
  selectDateTitle: 'Date Title',
  selectTimeTitle: 'Time Title',
  reschuduleContent: 'Reschedule Content',
  keepAppointment: 'Keep Appointment',
  technicanArrival: 'Technician Arrival',
  mrngSlot: 'Morning Slot',
  noonSlot: 'Noon Slot',
}
