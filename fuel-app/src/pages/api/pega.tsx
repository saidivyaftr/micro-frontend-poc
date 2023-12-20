import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import getFrontierBaseUrl from 'src/utils/api/baseUrl'
import fetcher from './fetcherWithAuthToken'

const createInteraction = async (req: NextApiRequest, res: NextApiResponse) => {
  let sessionId: string
  try {
    const FRONTIER_API_URL = getFrontierBaseUrl(req?.headers?.host)
    const session = await axios.get(`${FRONTIER_API_URL}api/session`, {
      headers: { cookie: req?.headers?.cookie },
    })
    sessionId = session?.data?.sessionId || 'no_session'
  } catch (e) {
    console.log('error getting session', e)
    sessionId = 'no_session'
  }

  try {
    const identifier = req?.body?.samRecords
    identifier.excludeProspects = true
    identifier.excludeLeads = true
    const customer = await axios.get(
      `${process.env.APIGEE_BASE_URL}solrsearchservice/v1/customersearches`,
      {
        params: identifier,
        headers: {
          apiKey: process.env.CALIFORNIA_API_KEY,
        },
        auth: {
          username: process.env.PEGA_USERNAME || '',
          password: process.env.PEGA_PASSWORD || '',
        },
      },
    )

    const activeAccountNumbers = customer?.data?.response?.docs.reduce(
      (numbersList: any, doc: any) => {
        if (
          doc.btn &&
          doc.active.toLowerCase() == 'active' &&
          doc.customerType.toLowerCase() == 'customer'
        ) {
          return numbersList.concat(doc.btn)
        } else return numbersList
      },
      [],
    )

    const accountNumber = activeAccountNumbers[0]

    if (!accountNumber) {
      return res.status(200).json('no account')
    }

    const interaction = {
      Intent: 'DotcomServiceOutageCheck',
      InteractionType: 'Web',
      ChannelType: 'Mobile',
      ChannelInitiator: 'Frontier.com',
      ChannelID: sessionId || 'no_session',
      StartDateTime: new Date()
        .toISOString()
        .replace(/[-:]/g, '')
        .substring(0, 15),
      CustomerID: accountNumber?.substring(0, 10),
      CustomerIDType: 'B',
      APIVersion: 'V2',
    }

    const interactionResponse = await fetcher.post(
      'pegacase/v1/interactions',
      interaction,
      {
        common: {
          ['User-Agent']: req?.headers?.['user-agent'],
        },
      },
      true,
      process.env.APIGEE_BASE_URL,
    )

    let servicesAffected = null
    if (Array.isArray(interactionResponse?.data?.MSIServiceAffected)) {
      servicesAffected = interactionResponse?.data?.MSIServiceAffected
    } else {
      if (interactionResponse?.data?.MSIServiceAffected) {
        servicesAffected = []
        servicesAffected.push(interactionResponse?.data?.MSIServiceAffected)
      }
    }

    const ETTR = new Date(
      interactionResponse?.data?.MSIETA || interactionResponse?.data?.MSIETTR,
    )

    const resolutionDisplay = () => {
      const date = ETTR.toDateString()
      if (date != 'Invalid Date') {
        const hour = ETTR.getHours() % 12 || 12
        const minute = `${
          ETTR.getMinutes() < 10 ? '0' : ''
        }${ETTR.getMinutes()}`
        const meridiem = ETTR.getHours() > 11 ? 'pm' : 'am'
        return `${date} ${hour}:${minute} ${meridiem} (ET)`
      }
      return null
    }

    const outageInfo = {
      MSIAlertFound: interactionResponse?.data?.MSIAlertFound || null,
      MSIServiceAffected: servicesAffected || null,
      ETTR: resolutionDisplay(),
      MSISeverityLevel: interactionResponse?.data?.MSISeverityLevel || null,
    }
    return res.status(200).json(outageInfo)
  } catch (e: any) {
    console.log('error', e?.toJSON())
    return res.status(500).json('data error')
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return createInteraction(req, res)
}
