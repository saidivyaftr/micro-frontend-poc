import { useEffect } from 'react'
import { useRouter } from 'next/router'

const SSR = () => {
  const router = useRouter()
  useEffect(() => {
    router.replace('/shop/tv')
  }, [])
  return <div />
}

export default SSR
