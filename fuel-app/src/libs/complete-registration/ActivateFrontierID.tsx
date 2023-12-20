import { useEffect, useState } from 'react'
import APIClient from '../../api-client'
import CompleteRegistration from './CompleteRegistration'
import { setCompleteRegistration } from 'src/redux/actions/register'
import { useDispatch } from 'react-redux'

const ActivateFrontierID = () => {
  const [showRegister, setShowRegister] = useState(false)
  const dispatch = useDispatch()
  const getRegistration = async () => {
    const params = window.location.href
    const params1 = params.split('/')
    const token = params1[params1.length - 1]
    const response: any = await APIClient.getCompleteRegistration(token)
    dispatch(setCompleteRegistration(response.data))
    if (response.data.frontier_is_blank_password === true) {
      if (response.data.expired === true) {
        setShowRegister(false)
        window.location.href =
          '/invite/expired/?email=' +
          encodeURIComponent(response.data.profile_email)
      } else {
        setShowRegister(true)
      }
    } else {
      setShowRegister(false)
      const icid = 'fid_existing_email'
      window.location.href = '/invite/account-exist?icid=' + icid
    }
  }

  useEffect(() => {
    getRegistration()
  }, [])

  return <> {showRegister && <CompleteRegistration />}</>
}

export default ActivateFrontierID
