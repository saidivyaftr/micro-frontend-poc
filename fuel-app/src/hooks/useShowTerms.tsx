import { useSelector, useDispatch } from 'react-redux'
import { State } from 'src/redux/types'
import { appConfigSlice } from 'src/redux/slicers/appConfigSlice'

const useShowTerms = (): ShowTermsState => {
  const showTerms = useSelector(
    (state: State) => state?.appConfig?.configs?.showTerms,
  )
  const dispatch = useDispatch()
  const setShowTerms = (value: boolean) => {
    try {
      dispatch(appConfigSlice.actions.setConfig({ showTerms: value }))
    } catch (error) {
      console.log(error)
    }
  }
  return { showTerms, setShowTerms }
}

type ShowTermsState = {
  showTerms: boolean
  // eslint-disable-next-line no-unused-vars
  setShowTerms: (value: boolean) => void
}

export default useShowTerms
