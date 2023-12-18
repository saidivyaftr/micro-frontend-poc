import { useState } from 'react'

type ILink = {
  href: string
  rel?: 'stylesheet' | 'preload' | 'preconnect'
  lazyLoad?: boolean
  as?: string
  crossOrigin?: string
}
const StyleSheet = (props: ILink) => {
  const { href = '', rel = 'stylesheet', lazyLoad = false } = props
  const [media, setMedia] = useState(lazyLoad ? 'print' : 'all')
  return (
    <link rel={rel} href={href} media={media} onLoad={() => setMedia('all')} />
  )
}

export default StyleSheet