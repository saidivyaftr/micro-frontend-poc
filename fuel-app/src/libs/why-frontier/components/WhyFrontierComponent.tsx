import { makeStyles } from '@material-ui/core'
import { useMemo } from 'react'
import { FourTiles, InjectHTML } from '@/shared-ui/components'
import { COMPONENT_WRAPPER } from 'src/constants'
import { useAppData } from 'src/hooks'
import colors from '@/shared-ui/colors'

const WhyFrontierComponent = () => {
  const classes = useStyles()
  const { heading, cards }: any = useAppData('whyFrontier', true)
  const list = useMemo(() => {
    if (!cards?.list) {
      return []
    }
    const cardsList = []
    for (const item of cards?.list) {
      const payload: any = {
        title: item?.title?.value,
        description: item?.description?.value,
      }
      cardsList.push(payload)
    }
    return cardsList
  }, [cards])

  return (
    <div id="why-frontier" className={classes.root}>
      <div className={classes.wrapper}>
        {heading && (
          <InjectHTML
            tagType="h2"
            styleType="h1"
            fontType="boldFont"
            className={classes.title}
            value={heading?.value}
          />
        )}

        {list?.length > 0 && (
          <div className={classes.cardsClass}>
            <FourTiles
              type="light"
              mobileOneCol
              isClickable={false}
              tabletOneCol
              titleStyleType="h4"
              textAlign="left"
              cardClassName={classes.cardClass}
              titleClassName={classes.cardTitle}
              descriptionClassName={classes.cardDescription}
              tiles={list}
            />
          </div>
        )}
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {},
  wrapper: {
    ...COMPONENT_WRAPPER,
    padding: '4rem 1rem',
    [breakpoints.up('md')]: {
      padding: '6rem 1.25rem',
    },
    [breakpoints.up('sm')]: {
      padding: '3rem 1.25rem',
    },
  },
  cardsClass: {
    marginTop: 30,
  },
  cardClass: {
    border: 'none',
    padding: 0,
    maxWidth: '100%',
    [breakpoints.up('md')]: {
      maxWidth: '300px',
    },
  },
  cardTitle: {
    margin: '1.25rem 0',
    [breakpoints.down('sm')]: {
      fontSize: '1.5rem',
    },
  },
  cardDescription: {
    fontWeight: 400,
    paddingBottom: '1rem',
    margin: 0,
    lineHeight: '1.6875rem',
    fontSize: '1rem',
  },
  title: {
    paddingBottom: '1.875rem',
    borderBottom: `4px solid ${colors.main.brightRed}`,
    textTransform: 'none',
  },
}))

export default WhyFrontierComponent
