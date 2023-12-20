import colors from '@/shared-ui/colors'
import { FourTiles, Typography } from '@/shared-ui/components'
import { DownArrow, LeftRightArrow, WifiCrop } from '@/shared-ui/react-icons'
import { makeStyles } from '@material-ui/core'
import { useMemo } from 'react'
import { COMPONENT_WRAPPER } from 'src/constants'
import { PP_OBJECT_SANS_MEDIUM } from 'src/constants/fontFamilyNames'
import { useAppData } from 'src/hooks'

const ServiceHelp = () => {
  const classes = useStyles()
  const { title, tiles } = useAppData('serviceHelp', true)

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'leftRightArrow':
        return <LeftRightArrow className={classes.svg} />
      case 'wifiCrop':
        return <WifiCrop className={classes.svg} />
      case 'DownArrow':
        return <DownArrow className={classes.svg} />
      default:
        return null
    }
  }

  const list = useMemo(() => {
    if (!tiles?.targetItems) {
      return []
    }
    const tilesList = tiles?.targetItems?.map((item: any) => {
      return {
        title: item?.title?.value as string,
        description: item?.description?.value as string,
        icon: renderIcon(item?.svgIcon?.value?.field?.value),
      }
    })
    return tilesList
  }, [tiles])

  if (!title?.value) {
    return null
  }

  return (
    <div data-testid="service-help" className={classes.root}>
      <div className={classes.wrapper}>
        <Typography
          tagType="h2"
          styleType="h3"
          color="tertiary"
          className={classes.title}
        >
          {title?.value}
        </Typography>
        <FourTiles
          type="light"
          textAlign="left"
          tiles={list}
          mobileOneCol
          roundedBorders
          tilesWrapperClassName={classes.tilesWrapper}
          iconClassName={classes.iconStyles}
          cardClassName={classes.cardStyles}
          descriptionClassName={classes.descriptionStyles}
          descriptionStyleType="p1"
          isClickable={false}
          titleStyleType="h5"
          disableHover={true}
        />
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    background: colors.main.midnightExpress,
    marginBottom: '4rem',
    [breakpoints.down('xs')]: {
      marginBottom: 0,
    },
  },
  wrapper: {
    ...COMPONENT_WRAPPER,
    padding: '5rem 2rem',
    [breakpoints.down('sm')]: {
      padding: '2.5rem 1rem',
    },
  },
  tilesWrapper: {
    columnGap: '2rem',
    [breakpoints.down('xs')]: {
      columnGap: '1rem',
    },
  },
  cardStyles: {
    padding: '2rem',
    borderRadius: '1rem',
  },
  descriptionStyles: {
    marginBottom: 'unset',
    '& a': {
      display: 'inline',
      fontFamily: PP_OBJECT_SANS_MEDIUM,
      textDecoration: 'underline',
    },
    '& a:hover': {
      color: colors.main.brightRed,
      cursor: 'pointer',
    },
  },
  iconStyles: {
    marginBottom: '2rem !important',
    [breakpoints.down('xs')]: {
      marginBottom: '1rem !important',
    },
  },
  svg: {
    width: '3rem',
    height: '3rem',
    [breakpoints.down('xs')]: {
      width: '2rem',
      height: '2rem',
    },
  },
  title: {
    textAlign: 'center',
    marginBottom: '3rem',
    [breakpoints.down('xs')]: {
      marginBottom: '1.4375rem',
    },
  },
}))

export default ServiceHelp
