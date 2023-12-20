import { useMemo } from 'react'
import { makeStyles } from '@material-ui/core'
import { Typography, FourTiles, InjectHTML } from '@/shared-ui/components'
import colors from '@/shared-ui/colors'
import { useAppData } from 'src/hooks'
import { COMPONENT_WRAPPER } from 'src/constants'

const WhyFrontier = () => {
  const classes = useStyles()
  const { title, subTitle, tiles }: any = useAppData('whyFrontier', true)

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
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <Typography tagType="h2" styleType="h3" className={classes.title}>
          {title?.value}
        </Typography>
        <Typography
          tagType="p"
          styleType="h5"
          fontType="boldFont"
          className={classes.title}
        >
          {subTitle?.value}
        </Typography>
        <div className={classes.tilesWrapper}>
          <FourTiles
            type="dark"
            textAlign="center"
            tiles={list}
            titleClassName={classes.cardTitle}
            cardClassName={classes.card}
            titleStyleType="h5"
            isClickable={false}
          />
        </div>
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    backgroundColor: colors.main.newBackgroundGray,
  },
  wrapper: {
    ...COMPONENT_WRAPPER,
    padding: '64px 16px',
  },
  title: {
    textAlign: 'center',
    maxWidth: 665,
    margin: 'auto',
    marginBottom: 16,
  },
  tilesWrapper: {
    marginTop: 32,
    '& >div': { columnGap: '2rem' },
  },
  card: {
    padding: '41px 48px 64px 48px',
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

export default WhyFrontier
