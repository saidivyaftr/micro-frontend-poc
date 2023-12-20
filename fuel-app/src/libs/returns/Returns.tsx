import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { equipmentReturnFindSlice } from 'src/redux/slicers'
import ReturnsAddress from './ReturnsAddress'
import ReturnsList from './ReturnsList'
import { State } from 'src/redux/types'
import ReturnsReview from './ReturnsReview'
import ReturnsThank from './ReturnsThank'
import ReturnsFind from './ReturnsFind'

const Returns = () => {
  const dispatch = useDispatch()
  const { step } =
    useSelector((state: State) => state?.equipmentReturnFind) || {}

  const renderStep = () => {
    switch (step) {
      case 'RETURNS_FIND':
        return <ReturnsFind />
      case 'EQUIPMENT_LIST':
        return <ReturnsList />
      case 'EQUIPMENT_ADDRESS':
        return <ReturnsAddress />
      case 'EQUIPMENT_REVIEW':
        return <ReturnsReview />
      case 'EQUIPMENT_SUBMIT_SUCCESS':
        return <ReturnsThank />
      default:
        return <ReturnsFind />
    }
  }

  useEffect(() => {
    dispatch(equipmentReturnFindSlice.actions.setStep('RETURNS_FIND'))
  }, [])

  return <>{renderStep()}</>
}

export default Returns
