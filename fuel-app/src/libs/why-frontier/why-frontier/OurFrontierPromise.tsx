import { useMemo } from 'react'
import { makeStyles } from '@material-ui/core'
import { Typography, FourTiles, InjectHTML } from '@/shared-ui/components'
import colors from '@/shared-ui/colors'
import { useAppData } from 'src/hooks'
import { COMPONENT_WRAPPER } from 'src/constants'

const OurFrontierPromise = () => {
  const classes = useStyles()
  const { title, subTitle, tiles }: any = useAppData('ourFrontierPromise', true)

  const list = useMemo(() => {
    if (!tiles?.list) {
      return []
    }
    const tilesList = []
    for (const item of tiles?.list) {
      const payload: any = {
        title: item?.title?.value,
        icon: <InjectHTML value={item?.icon?.rendered} />,
      }
      tilesList.push(payload)
    }
    return tilesList
  }, [tiles])

  if (!tiles?.list) {
    return null
  }

  return (
    <div id="frontier-promise" className={classes.root}>
      <div className={classes.wrapper}>
        <Typography
          tagType="h2"
          styleType="h2"
          color="tertiary"
          className={classes.title}
        >
          {title?.value}
        </Typography>
        <Typography
          tagType="p"
          styleType="h5"
          className={classes.subTitle}
          color="tertiary"
        >
          {subTitle?.value}
        </Typography>
        <div className={classes.tilesWrapper}>
          <FourTiles
            type="light"
            textAlign="center"
            tiles={list}
            titleClassName={classes.cardTitle}
            cardClassName={classes.card}
            titleStyleType="h4"
            isClickable={false}
          />
        </div>
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    background: colors.main.brightRed,
  },
  wrapper: {
    ...COMPONENT_WRAPPER,
    padding: '60px 16px',
    [breakpoints.up('md')]: {
      paddingBottom: 74,
    },
  },
  title: {
    textAlign: 'center',
    margin: 'auto',
    marginBottom: 16,
    lineHeight: '1.2',
    padding: '0 1rem',
  },
  subTitle: {
    textAlign: 'center',
    maxWidth: 1000,
    margin: 'auto',
    marginBottom: '2.5rem',
    padding: '0 1rem',
  },
  tilesWrapper: {
    marginTop: 32,
    padding: '0 16px',
  },
  card: {
    padding: '41px 32px 20px',
    maxWidth: '100%',
    [breakpoints.up('md')]: {
      padding: '41px 32px 36px',
    },
  },
  cardTitle: {
    [breakpoints.down('sm')]: {
      fontSize: 24,
    },
  },
  primaryBtn: {
    display: 'block',
    maxWidth: 400,
    margin: 'auto',
    marginTop: 48,
    [breakpoints.down('xs')]: {
      marginTop: 56,
      maxWidth: '100%',
    },
  },
}))

export default OurFrontierPromise
