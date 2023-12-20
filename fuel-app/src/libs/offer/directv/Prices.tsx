import { PriceCard } from '@/shared-ui/components'
import { useMemo } from 'react'
import { makeStyles } from '@material-ui/core'
import useAppData from '@/shared-ui/hooks/useAppData'
import { SITE_INTERACTION, OFFER_DIRECTV_PAGE } from 'src/constants'
const Prices = () => {
  const classes = useStyles()
  const { priceList } = useAppData('prices', true)
  const list = useMemo(() => {
    const tilesList = priceList?.list?.map((item: any) => ({
      title: item?.title?.value,
      price: item?.price?.value,
      subText: item?.subText?.value,
      ctaText: item?.ctaText.value,
      ctaLink: item?.ctaLink?.value,
      bottomDescription: item?.bottomDescription?.value,
      mostPopular: item?.mostPopular?.value,
    }))
    return tilesList
  }, [priceList])
  return (
    <div className={classes.wrapper}>
      {list?.map((item: any) => {
        return (
          <PriceCard
            key={item?.title}
            price={item?.price}
            mostPopular={item?.mostPopular}
            title={item?.title}
            subText={item?.subText}
            ctaLink={item?.ctaLink}
            ctaText={item?.ctaText}
            bottomDescription={item?.bottomDescription}
            triggerAnalytics={true}
            interactionType={SITE_INTERACTION}
            eventObj={{
              events: 'event14',
              eVar14: `${OFFER_DIRECTV_PAGE}:${item?.ctaText
                ?.toLowerCase()
                ?.replace(' ', '-')}`,
            }}
          />
        )
      })}
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  wrapper: {
    marginTop: 150,
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
    flexWrap: 'wrap',
    [breakpoints.down('xs')]: {
      padding: '1rem',
    },
  },
}))

export default Prices
