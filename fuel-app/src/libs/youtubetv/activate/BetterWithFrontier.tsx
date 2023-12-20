import { useMemo } from 'react'
import { makeStyles } from '@material-ui/core'
import { FourTiles, InjectHTML } from '@/shared-ui/components'
import colors from 'src/styles/theme/colors'
import { useAppData } from 'src/hooks'
import { COMPONENT_WRAPPER } from 'src/constants'

const BetterWithFrontier = () => {
  const classes = useStyles()
  const { title, tiles }: any = useAppData('BetterWithFrontier', true)

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
    <div id="special-about-fiber" className={classes.root}>
      <div className={classes.wrapper}>
        <InjectHTML
          value={title?.value}
          tagType="h2"
          styleType="h3"
          className={classes.title}
        />

        <div className={classes.tilesWrapper}>
          <FourTiles
            type="light"
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

const useStyles = makeStyles(({}) => ({
  root: {
    background: colors.main.dark,
  },
  wrapper: {
    ...COMPONENT_WRAPPER,
    paddingBottom: 80,
    paddingTop: 60,
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
    color: colors.main.white,
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
    marginTop: 32,
    '& .title': {
      color: colors.main.dark,
    },
  },
}))

export default BetterWithFrontier
