// This component enables use of next-gen image formats
// Pass in `image: '[jpg src]'` and `webp: '[webp src]'` inside the desktop, tablet, and mobile props
// Alt text is required: https://webaim.org/techniques/alttext/
// Other resources: https://web.dev/learn/design/picture-element/
import { IPictureProps } from './types'
import css from './Picture.module.scss'
import clx from 'classnames'
import Image from 'next/future/image'

const Picture = (props: IPictureProps) => {
  const {
    desktop,
    tablet,
    mobile,
    className,
    testId = 'cardImage',
    altText,
  } = props
  return (
    // The browser will serve the first compatible image within the picture tag
    <picture className={clx(css.pictureContainer)}>
      <source
        media="(min-width: 1024px)"
        srcSet={desktop.webp}
        type="image/webp"
      />
      <source media="(min-width: 1024px)" srcSet={desktop.image} />
      <source
        media="(min-width: 768px)"
        srcSet={tablet?.webp}
        type="image/webp"
      />
      <source media="(min-width: 768px)" srcSet={tablet?.image} />
      <source srcSet={mobile?.webp} type="image/webp" />
      <source srcSet={mobile?.image} />
      <Image
        loader={() => desktop.image}
        data-testid={testId}
        className={className}
        src={desktop.image}
        alt={altText}
        // loading="lazy"
      />
    </picture>
  )
}

export default Picture
