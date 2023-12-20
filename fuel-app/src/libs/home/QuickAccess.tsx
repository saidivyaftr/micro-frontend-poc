import { useMemo } from 'react'
import { makeStyles } from '@material-ui/core'
import { Typography, FourTiles, InjectHTML } from '@/shared-ui/components'
import colors from 'src/styles/theme/colors'
import { useAppData } from 'src/hooks'
import {
  COMPONENT_WRAPPER,
  HOMEPAGE_ID,
  HOMEPAGE_QUICK_ACCESS,
} from 'src/constants'
const QuickAccess = () => {
  const classes = useStyles()
  const { title, tiles } = useAppData('quickAccessToYourAccount', true)

  const list = useMemo(() => {
    if (!tiles?.list) {
      return []
    }
    const tilesList = tiles?.list?.map((item: any, index: number) => ({
      title: item?.title?.value,
      description: item?.description?.value,
      icon: <InjectHTML value={item?.svgIcon?.rendered} />,
      href: item?.href?.url,
      objectID: `${HOMEPAGE_QUICK_ACCESS[index]}${HOMEPAGE_ID}`,
    }))
    return tilesList
  }, [tiles])

  return (
    <div className={classes.root}>
      <Typography tagType="h2" styleType="h3" className={classes.title}>
        {title?.value}
      </Typography>
      <FourTiles
        descriptionStyleType="p1"
        tilesWrapperClassName={classes.tilesWrapper}
        cardClassName={classes.card}
        type="light"
        textAlign="center"
        tiles={list}
        mobileOneCol
      />
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    ...COMPONENT_WRAPPER,
    [breakpoints.down('sm')]: {
      padding: 16,
    },
  },
  title: {
    textAlign: 'center',
    paddingTop: '5rem',
    paddingBottom: '3rem',
    [breakpoints.down('xs')]: {
      padding: '4rem 1rem 1rem',
      fontSize: '1.5rem',
      lineHeight: '32px',
    },
  },
  tilesWrapper: {
    columnGap: 0,
  },
  card: {
    [breakpoints.up('sm')]: {
      borderRight: `1px solid ${colors.main.borderGrey}`,
      paddingTop: '0.5rem',
      paddingBottom: '0.5rem',
    },
    [breakpoints.down('xs')]: {
      borderBottom: `1px solid ${colors.main.borderGrey}`,
    },
  },
}))

export default QuickAccess
