export const emailSearchResponse = {
  success: { status: 200, body: { grantToken: 'FAKE_TOKEN' } },
  noAccounts: {
    status: 404,
    body: {
      message: 'Account not found',
      errorCode: 2,
      errorDescription: 'No accounts found',
    },
  },
  multipleAccounts: {
    status: 404,
    body: {
      message: 'Account not found',
      errorCode: 3,
      errorDescription: 'Multiple accounts found',
    },
  },
  alreadyRegistered: {
    status: 404,
    body: {
      Error: {
        message: 'Account not found',
        errorCode: 1,
        errorDescription: 'Already registered',
      },
    },
  },
}

export const primaryValidateMFA = {
  success: {
    status: 200,
    body: {
      account: {
        accountName: {
          givenName: 'KELLY',
          familyName: 'DAVIS',
          companyName: 'DAVIS, KELLY',
        },
        accountNumber: '31037450190610145',
        emailInformation: {
          emailId: '121212',
          isEmailVerified: false,
        },
        phoneInformation: {
          phoneId: 12345,
          isPhoneVerified: false,
        },
        phoneNumber: {
          phoneNumber: 3103745019,
          sequenceNumber: 0,
        },
        accountUuid: 'eacca005-409f-1a06-a62b-0004ac1be08b',
      },
      authorization: {
        authorizationToken: '2ea25b97-1371-4285-accc-b60e3f33a92c',
        expirationTimestamp: '2023-02-14T04:44:13.5345253Z',
      },
      grantToken: '0df70b1b-abe0-49c7-9503-c776960e4305',
    },
  },
  accountLocked: {
    status: 401,
    body: {
      message:
        'Unauthorized!. Failed attempts: 3. Account locked until {{untilTime}}',
      errorCode: 0,
      errorDescription: 'No error details are available',
    },
  },
  incorrect: {
    status: 401,
    body: {
      message: 'Unauthorized!. Failed attempts: 1',
      errorCode: 0,
      errorDescription: 'No error details are available',
    },
  },
}

export const secondaryValidateMFA = {
  success: { status: 200, body: {} },
  accountLocked: {
    status: 401,
    body: {
      message:
        'Unauthorized!. Failed attempts: 3. Account locked until {{untilTime}}',
      errorCode: 0,
      errorDescription: 'No error details are available',
    },
  },
  incorrect: {
    status: 401,
    body: {
      remainingAttempts: '2',
    },
  },
}
