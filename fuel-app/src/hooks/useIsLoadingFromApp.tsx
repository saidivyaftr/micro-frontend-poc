import { useRouter } from 'next/router'
import { useMemo } from 'react'

const useIsLoadingFromApp = () => {
  const router = useRouter()
  const { source } = router?.query
  const sourceTypes = ['myfrontierapp', 'commercial']
  const isNavless = useMemo(
    () => sourceTypes.includes(source as string),
    [source],
  )
  return isNavless
}

export default useIsLoadingFromApp
