import { IPriceCardProps } from './types'
import { Typography, InjectHTML, Button } from '@/shared-ui/components'
import css from './PriceCard.module.scss'
import { Add } from '@/shared-ui/react-icons'
const PriceCard = (props: IPriceCardProps) => {
  const {
    price = '',
    mostPopular = '',
    title = '',
    subText = '',
    ctaLink = '',
    ctaText = '',
    bottomDescription = '',
    triggerAnalytics = false,
    interactionType = '',
    eventObj = {},
  } = props
  return (
    <div key={price} className={css.card}>
      {!mostPopular ? (
        <div className={css.borderTop} />
      ) : (
        <div className={css.mostPopular}>
          <Add />
          <InjectHTML
            className={css.popular}
            value={mostPopular}
            styleType="p3"
            fontType="boldFont"
          />
        </div>
      )}
      <InjectHTML
        tagType="div"
        className={css.title}
        value={title}
        styleType="h5"
        fontType="regularFont"
      />
      <InjectHTML
        className={css.price}
        value={price}
        styleType="h3"
        tagType="div"
        fontType="mediumFont"
      />
      <Typography
        styleType="p2"
        tagType="div"
        className={css.subText}
        fontType="mediumFont"
      >
        {subText}
      </Typography>
      <Button
        className={css.btn}
        type="link"
        variant="primary"
        hoverVariant="primary"
        href={ctaLink}
        text={ctaText}
        target="_blank"
        triggerEvent={triggerAnalytics}
        interactionType={interactionType}
        eventObj={eventObj}
      />
      <Typography styleType="p2" className={css.bottomDescription}>
        {bottomDescription}
      </Typography>
    </div>
  )
}

export default PriceCard
