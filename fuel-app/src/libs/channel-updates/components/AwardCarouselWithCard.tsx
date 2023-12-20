import { makeStyles } from '@material-ui/core'
import { AwardCarouselWithCard as AwardCarouselWithCardComponent } from '@/shared-ui/components'

const AwardCarouselWithCard = (data: any) => {
  const classes = useStyles()

  const {
    cards,
    backgroundColor,
    paginationColor,
    cardTitleColor,
    cardSubTitleColor,
    cardLegalTextColor,
    cardTitleTagName,
    cardSubTitleTagName,
    title,
  }: any = data?.data

  return (
    <AwardCarouselWithCardComponent
      rootClassName={classes.rootClassName}
      titleClassName={classes.titleClassName}
      cards={cards?.targetItems || []}
      backgroundColor={backgroundColor?.value}
      paginationColor={paginationColor?.value}
      cardTitleColor={cardTitleColor?.value}
      cardSubTitleColor={cardSubTitleColor?.value}
      cardLegalTextColor={cardLegalTextColor?.value}
      cardTitleTagName={cardTitleTagName?.value}
      cardSubTitleTagName={cardSubTitleTagName?.value}
      title={title}
    />
  )
}

const useStyles = makeStyles(({ breakpoints }: { breakpoints: any }) => ({
  rootClassName: {
    padding: '3rem 0',
    margin: '5rem auto',
    [breakpoints.down('sm')]: {
      padding: '2.5rem 1rem',
      margin: '3.5rem 0',
    },
  },
  titleClassName: {
    marginTop: 0,
    [breakpoints.down('sm')]: {
      marginBottom: '1rem',
    },
  },
}))

export default AwardCarouselWithCard
