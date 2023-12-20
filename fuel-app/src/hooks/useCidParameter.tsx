import { useRouter } from 'next/router'
import { useMemo } from 'react'

const useCidParameter = () => {
  const router = useRouter()
  const { cid } = router?.query
  const cidParameter = useMemo(() => cid, [cid])
  return cidParameter
}

export default useCidParameter
