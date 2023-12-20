import { useMemo } from 'react'
import { makeStyles } from '@material-ui/core'
import { Typography, FourTiles, InjectHTML } from '@/shared-ui/components'
import { COMPONENT_WRAPPER } from 'src/constants'
import { useAppData } from 'src/hooks'

const SpecialAboutFiber = () => {
  const classes = useStyles()
  const { title, subTitle, list } = useAppData('specialAboutFiber', true)

  const listItem = useMemo(() => {
    if (!list?.targetItems) {
      return []
    }
    const tilesList = list?.targetItems.map((item: any) => {
      return {
        title: item?.title?.value,
        description: item?.description?.value,
        icon: <InjectHTML value={item?.icon?.value} />,
      }
    })
    return tilesList
  }, [list])

  return (
    <div id="special-about-fiber">
      <div className={classes.wrapper}>
        {title?.value && (
          <Typography tagType="h2" styleType="h3" className={classes.h2Title}>
            {title?.value}
          </Typography>
        )}
        {subTitle?.value && (
          <Typography className={classes.title} styleType="p1">
            {subTitle?.value}
          </Typography>
        )}
        <div className={classes.tilesWrapper}>
          <FourTiles
            type="dark"
            textAlign="left"
            tiles={listItem}
            titleStyleType="h5"
            titleClassName={classes.tileTitle}
            descriptionClassName={classes.description}
            isClickable={false}
            cardClassName={classes.cardStyles}
          />
        </div>
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  wrapper: {
    ...COMPONENT_WRAPPER,
    padding: '80px 16px',
    [breakpoints.down('xs')]: {
      padding: '64px 16px',
    },
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
  },
  h2Title: {
    textAlign: 'center',
    marginBottom: 16,
  },
  tileCard: {
    paddingBottom: 60,
  },
  tilesWrapper: {
    marginTop: 32,
  },
  legalDisclaimer: {
    marginTop: '1rem',
    fontSize: '.625rem',
    lineHeight: '1rem',
    '& sup': { lineHeight: '0' },
  },
  tileTitle: {
    fontSize: '1.125rem',
    lineHeight: '1.165rem',
    marginTop: 30,
    marginBottom: 20,
    [breakpoints.down('xs')]: {
      marginTop: 0,
      marginBottom: 8,
    },
  },
  description: {
    fontSize: '1rem',
    lineHeight: '1.5rem',
    '& sup': {
      lineHeight: 0,
    },
  },
  primaryBtn: {
    display: 'block',
    maxWidth: 278,
    margin: 'auto',
    marginTop: 48,
    marginBottom: 0,
    [breakpoints.down('xs')]: {
      maxWidth: '100%',
    },
  },
  cardStyles: {
    borderRadius: 16,
    padding: 32,
    '& svg': {
      minHeight: 49,
    },
  },
}))

export default SpecialAboutFiber
