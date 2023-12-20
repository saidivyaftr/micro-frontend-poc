import { useEffect, useState, useCallback } from 'react'
import APIClient from 'src/api-client'

const useAddressPredictor = (inputAddress: string, inFootPrint = false) => {
  const [predictiveAddress, setPredictiveAddress] = useState([])

  const fetchPredictiveAddress = useCallback(() => {
    if (inputAddress) {
      // eslint-disable-next-line
      APIClient.getPredictiveSuggestions(inputAddress, inFootPrint).then(
        (response: any) => {
          setPredictiveAddress(response?.data?.addresses?.splice(0, 5) || [])
        },
      )
    } else {
      setPredictiveAddress([])
    }
  }, [inputAddress, setPredictiveAddress])

  useEffect(() => {
    fetchPredictiveAddress()
  }, [inputAddress, fetchPredictiveAddress])

  return predictiveAddress
}

export default useAddressPredictor
