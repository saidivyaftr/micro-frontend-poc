import { useMemo } from 'react'
import { makeStyles } from '@material-ui/core'
import { Typography, FourTiles, InjectHTML } from '@/shared-ui/components'
import colors from 'src/styles/theme/colors'
import { useAppData } from 'src/hooks'
import { COMPONENT_WRAPPER } from 'src/constants'

const GetStarted = () => {
  const classes = useStyles()
  const { title, tiles }: any = useAppData('GetStarted', true)

  const list = useMemo(() => {
    if (!tiles?.list) {
      return []
    }
    const tilesList = []
    for (const item of tiles?.list) {
      const payload: any = {
        title: item?.title?.value,
        description: item?.description?.rendered,
        icon: <InjectHTML value={item?.icon?.rendered} />,
      }
      tilesList.push(payload)
    }
    return tilesList
  }, [tiles])

  return (
    <div id="start-watching-youtubetv" className={classes.root}>
      <div className={classes.wrapper}>
        <Typography tagType="h2" styleType="h3" className={classes.title}>
          {title?.value}
        </Typography>
        <div className={classes.tilesWrapper}>
          <FourTiles
            type="dark"
            textAlign="left"
            tiles={list}
            titleStyleType="h5"
            isClickable={false}
            roundedBorders={true}
            cardClassName={classes.card}
            iconClassName="stepNumber"
            descriptionClassName={classes.description}
          />
        </div>
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    background: colors.main.white,
    marginTop: 0,
  },
  wrapper: {
    ...COMPONENT_WRAPPER,
    paddingBottom: 80,
    paddingTop: 60,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexWap: 'nowrap',
    gap: 32,
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
  },
  tileCard: {
    paddingBottom: 60,
  },
  card: {
    borderRadius: '2rem',
    padding: '2rem',
  },
  description: {
    fontSize: '1.125rem',
  },
  tilesWrapper: {
    '& .title': {
      color: colors.main.greenishBlue,
    },
    '& .stepNumber span': {
      color: colors.main.greenishBlue,
      fontSize: '64px',
      lineHeight: '64px',
      fontFamily: 'Bandwidth Display',
      fontWeight: 400,
      [breakpoints.down('sm')]: {
        fontSize: '36px',
        lineHeight: '36px',
      },
    },
  },
}))

export default GetStarted
