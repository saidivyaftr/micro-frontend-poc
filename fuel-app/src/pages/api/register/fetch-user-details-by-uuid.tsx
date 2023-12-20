import type { NextApiRequest, NextApiResponse } from 'next'
import { STATUS_CODES } from 'src/constants'
import fetcher from '../fetcherApi'

const FetchUserDetails = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const shouldMockAPI = req?.headers?.referer?.includes('mock-register')
    if (shouldMockAPI) {
      return res.status(200).json(MOCK_DATA)
    }
    const [address, email, phone] = await Promise.all([
      addressPromise(req.query?.uuid),
      emailPromise(req.query?.uuid),
      phonePromise(req.query?.uuid),
    ])
    return res.status(200).json({ address, email, phone })
  } catch (error: any) {
    return res
      .status(
        error?.statusCode ||
          error?.response?.status ||
          STATUS_CODES.SERVER_ERROR,
      )
      .json(error?.response?.data || error)
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return FetchUserDetails(req, res)
}

const addressPromise = (uuid: any) => {
  const uuidUpper = uuid?.toString().toUpperCase().replace(/-/g, '')
  return new Promise(async (resolve, reject) => {
    try {
      const addressByUUID = `esbaddress/v2/addresses/serviceability/byuuid/${uuidUpper}`
      const response = await fetcher.get(addressByUUID, {
        'Content-Type': 'application/json',
        accept: '*/*',
        requestingApplication: 'frontierdotcom',
      })
      resolve(response?.data?.address || {})
    } catch (error) {
      reject(error)
    }
  })
}

const emailPromise = (uuid: any) => {
  const uuidUpper = uuid?.toString().toUpperCase().replace(/-/g, '')
  return new Promise(async (resolve, reject) => {
    try {
      const emailByUUID = `myfrontier-admin/v2/accounts/${uuidUpper}/EmailAddresses`
      const response = await fetcher.get(emailByUUID, {
        'Content-Type': 'application/json',
        accept: '*/*',
        requestingApplication: 'frontierdotcom',
        UserName: null,
      })
      const primaryEmailObject = response?.data?.find?.(
        (x: any) => x?.isPrimary,
      )
      resolve(primaryEmailObject)
    } catch (error) {
      reject(error)
    }
  })
}

const phonePromise = (uuid: any) => {
  const uuidUpper = uuid?.toString().toUpperCase().replace(/-/g, '')
  return new Promise(async (resolve, reject) => {
    try {
      const phoneById = `myfrontier-admin/v2/accounts/${uuidUpper}/PhoneNumbers`
      const response = await fetcher.get(phoneById, {
        'Content-Type': 'application/json',
        accept: '*/*',
        requestingApplication: 'frontierdotcom',
        UserName: null,
      })
      const primaryPhoneObject = response?.data?.find?.(
        (x: any) => x?.isPrimary && x?.type?.toLowerCase() === 'mobile',
      )
      resolve(primaryPhoneObject)
    } catch (error) {
      reject(error)
    }
  })
}

const MOCK_DATA = {
  address: {
    streetNumber: '1046',
    streetName: 'PALM',
    streetSuffix: 'DR',
    city: 'HERMOSA BEACH',
    state: 'CA',
    zipCode: '902543729',
  },
  email: {
    addressOfRecord: false,
    address: 'ftrqattestdivya+qat03120722@gmail.com',
    created: {
      userId: 'corps_myf_api',
      source: 'CDB',
      dateTime: '2023-03-15T17:57:06.000',
    },
    id: '17189494',
    isFtrId: false,
    isPrimary: true,
    updated: {
      userId: 's_esb_apigee_test',
      source: 'CDB',
      dateTime: '2023-03-15T17:58:55.000',
    },
    verified: {
      application: 'myftr',
      channel: null,
      userId: 's_esb_apigee_test',
      source: 'ESBAppc',
      dateTime: null,
    },
  },
  phone: {
    id: '7275778',
    number: 9999900000,
    type: 'Mobile',
    isPrimary: true,
    addressOfRecord: true,
    created: {
      userId: '05834a2879544ba4bb865ee4142ee0c6',
      source: 'MYF',
      dateTime: '2020-07-06T22:29:05.000',
    },
    updated: {
      userId: 'corp\\s_myf_api',
      source: 'MYF',
      dateTime: '2023-03-15T17:56:15.000',
    },
  },
}
