import axios from 'axios'

const verifyRecaptcha = async (responseToken: string) => {
  const url = 'https://www.google.com/recaptcha/api/siteverify'
  const key = process.env.GOOGLE_CAPTCHA_V3_SECRET_KEY || ''
  const params = new URLSearchParams({
    secret: key,
    response: responseToken,
  })
  const response = await axios.post(url, params)
  const data = response.data
  const threshold = process.env.GOOGLE_CAPTCHA_V3_SCORE_THRESHOLD || 0.5
  return data.success && data.score >= threshold
}

export default verifyRecaptcha
