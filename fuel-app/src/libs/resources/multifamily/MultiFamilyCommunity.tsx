import { useMemo } from 'react'
import { makeStyles } from '@material-ui/core'
import { Typography, FourTiles, InjectHTML } from '@/shared-ui/components'
import { useAppData } from 'src/hooks'
import {
  COMPONENT_WRAPPER,
  HOMEPAGE_ID,
  HOMEPAGE_POPULAR_TOPICS,
} from 'src/constants'
const MultiFamilyCommunity = () => {
  const classes = useStyles()
  const { title, list, description }: any = useAppData(
    'multiFamCommunity',
    true,
  )
  const listTiles = useMemo(() => {
    if (!list?.targetItems) {
      return []
    }
    const tilesList = list?.targetItems.map((item: any, index: number) => ({
      title: item?.title?.value,
      description: item?.description?.value,
      icon: <InjectHTML value={item?.icon?.value} />,
      href: item?.href?.url,
      objectID: `${HOMEPAGE_POPULAR_TOPICS[index]}${HOMEPAGE_ID}`,
    }))
    return tilesList
  }, [list])

  return (
    <div className={classes.root}>
      {title?.value ? (
        <Typography tagType="h2" styleType="h3" className={classes.title}>
          {title?.value}
        </Typography>
      ) : null}
      {description?.value ? (
        <Typography tagType="p" styleType="p1" className={classes.description}>
          {description?.value}
        </Typography>
      ) : null}
      <div className={classes.tileContainer}>
        <FourTiles
          type="dark"
          textAlign="left"
          tiles={listTiles}
          isClickable={false}
          cardClassName={classes.cardClassName}
          iconClassName={classes.iconStyles}
          mobileOneCol
          titleStyleType="h5"
          descriptionClassName={classes.descriptionStyles}
        />
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints, typography }) => ({
  root: {
    ...COMPONENT_WRAPPER,
    padding: `${typography.pxToRem(80)} ${typography.pxToRem(16)}`,
    [breakpoints.down('sm')]: {
      padding: `${typography.pxToRem(16)}`,
    },
  },
  icon: {
    height: 48,
    width: 48,
  },
  iconStyles: {
    minHeight: '56px',
    [breakpoints.down('xs')]: {
      minHeight: 'auto',
    },
  },
  descriptionStyles: {
    fontSize: '1.125rem',
    lineHeight: '1.625rem',
    maxWidth: 287,
    [breakpoints.down('xs')]: {
      fontSize: '1rem',
      lineHeight: '1.5rem',
      maxWidth: '100%',
    },
  },
  title: {
    textAlign: 'center',
    margin: `${typography.pxToRem(16)} 0`,
    [breakpoints.down('xs')]: {
      padding: `0 ${typography.pxToRem(16)}`,
      fontSize: '1.5rem',
      lineHeight: `${typography.pxToRem(32)}`,
    },
  },
  description: {
    textAlign: 'center',
  },
  tileContainer: {
    margin: `${typography.pxToRem(48)} 0`,
    [breakpoints.down('sm')]: {
      margin: `${typography.pxToRem(32)} 0`,
    },
  },
  cardClassName: {
    borderRadius: `${typography.pxToRem(16)}`,
  },
}))

export default MultiFamilyCommunity
