import axios from 'axios'
const APIGEE_BASE_URL = process.env.APIGEE_BASE_URL
const APIGEE_API_KEY = process.env.APIGEE_API_KEY
const APIGEE_API_SECRET = process.env.APIGEE_API_SECRET

export const generateApigeeToken = async () => {
  return axios.get(
    `${APIGEE_BASE_URL}oauth/v1/accesstoken?grant_type=client_credentials`,
    {
      auth: {
        username: APIGEE_API_KEY || '',
        password: APIGEE_API_SECRET || '',
      },
    },
  )
}
