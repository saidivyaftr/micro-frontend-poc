import { ImgHTMLAttributes, useState } from 'react'
import { makeStyles } from '@material-ui/core'
import Image, { ImageProps } from 'next/image'

interface ExtraProps {
  renderNextImage?: boolean
}

const ImageWithPlaceholder = (
  props: (ImageProps | ImgHTMLAttributes<HTMLImageElement>) & ExtraProps,
) => {
  const classes = imageStyles()
  const [loading, setLoading] = useState(true)
  const hidePlaceholder = () => setLoading(false)
  const { renderNextImage, ...imageProps } = props
  const shouldRenderNextImage = () =>
    renderNextImage ||
    (!isNaN(props.width as number) && !isNaN(props.height as number))

  return (
    <div
      className={classes.image_container}
      style={{
        width: isNaN(props.width as number) ? props.width : `${props.width}px`,
        height: isNaN(props.height as number)
          ? props.height
          : `${props.height}px`,
      }}
    >
      {shouldRenderNextImage() && (
        <Image
          {...(imageProps as ImageProps)}
          onLoad={hidePlaceholder}
          onError={hidePlaceholder}
          alt={'image'}
        />
      )}
      {!shouldRenderNextImage() && (
        <img
          {...(imageProps as ImgHTMLAttributes<HTMLImageElement>)}
          onLoad={hidePlaceholder}
          onError={hidePlaceholder}
          loading="lazy"
          alt={'image'}
        />
      )}
      {/* Display placeholder while image is loading */}
      {loading && <div className={classes.placeholder}></div>}
    </div>
  )
}

const imageStyles = makeStyles(() => ({
  '@keyframes placeload': {
    '0%': {
      transform: 'translateX(-100%)',
    },
    to: {
      transform: 'translateX(100%)',
    },
  },
  image_container: {
    position: 'relative',
  },
  placeholder: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,.05)',
    overflow: 'hidden',
    'z-index': 20,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '200%',
      content: `" "`,
      animation: `$placeload 1.3s linear infinite forwards`,
      background:
        'linear-gradient(90deg,hsla(0,0%,100%,0),hsla(0,0%,100%,.65) 50%,hsla(0,0%,100%,0))',
      transform: 'translateX(-100%)',
    },
  },
}))

export default ImageWithPlaceholder
