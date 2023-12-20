import CryptoJS from 'crypto-js'
import crypto from 'crypto'
import { CRYPTO_ALG, CRYPTO_PW } from 'src/constants/crypto'

const key = process.env.APIGEE_API_KEY || ''

export const encryptPayload = (data: any) => {
  return CryptoJS?.AES?.encrypt?.(JSON.stringify(data), key).toString()
}

export const decryptPayload = (data: any) => {
  try {
    const bytes = CryptoJS?.AES?.decrypt?.(data as string, key)
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
  } catch (error) {
    return {}
  }
}

export const decrypt = async (text: string, cb?: any) => {
  try {
    const decipher = crypto.createDecipher(CRYPTO_ALG, CRYPTO_PW)
    let decrypted = decipher.update(text, 'hex', 'utf8')
    decrypted += decipher.final('utf8')
    const decryptedObj = JSON.parse(decrypted)
    return decryptedObj
  } catch (error) {
    if (cb) cb()
  }
}
