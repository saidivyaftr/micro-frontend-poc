import colors from '@/shared-ui/colors'
import ChannelIcon from '@/shared-ui/react-icons/ChannelIcon'
import InfoIconWhite from '@/shared-ui/react-icons/info-icon-white'
import SetupIcon from '@/shared-ui/react-icons/SetupIcon'
import WatchIcon from '@/shared-ui/react-icons/WatchIcon'
import { makeStyles } from '@material-ui/core'
import { useMemo } from 'react'
import { FourTiles, InjectHTML, TooltipPopover, Typography } from 'src/blitz'
import { COMPONENT_WRAPPER } from 'src/constants'
import { PP_OBJECT_SANS_MEDIUM } from 'src/constants/fontFamilyNames'
import { useAppData } from 'src/hooks'
import { IShopComponents } from './types'

const YTVThreeTiles = ({ styles }: IShopComponents) => {
  const classes = useStyles()
  const {
    title,
    subTitle,
    list: tiles,
    legalDisclaimer,
    toolTipText,
    tooltipDirection,
  }: any = useAppData('YTVThreeTiles', true) || {}

  const RenderIcon = ({ iconName }: { iconName: string }) => {
    switch (iconName) {
      case 'Watch':
        return <WatchIcon className={classes.svg} />
      case 'Channel':
        return <ChannelIcon className={classes.svg} />
      case 'Setup':
        return <SetupIcon className={classes.svg} />
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
        title: item?.title?.value,
        description: item?.description?.value,
        icon: <RenderIcon iconName={item?.icon?.value?.field?.value} />,
      }
    })
    return tilesList
  }, [tiles])

  return (
    <div data-testid="YTVThreeTiles" style={styles}>
      <div className={classes.wrapper}>
        {title?.value && (
          <Typography
            tagType="h2"
            styleType="h3"
            data-testid="title"
            className={classes.h2Title}
          >
            {title?.value}
          </Typography>
        )}
        <div className={classes.titleContainer}>
          {subTitle?.value && (
            <Typography
              data-testid="subtitle"
              className={classes.title}
              styleType="p1"
            >
              {subTitle?.value}
            </Typography>
          )}
          {toolTipText?.value && (
            <TooltipPopover
              tooltipDirection={tooltipDirection?.value}
              tooltipContent={toolTipText?.value}
              tooltipIcon={<InfoIconWhite />}
            />
          )}
        </div>

        <div data-testId="tiles" className={classes.tilesWrapper}>
          <FourTiles
            type="dark"
            textAlign="left"
            tiles={list}
            titleStyleType="h5"
            tilesWrapperClassName={classes.tilesWrapperClass}
            titleClassName={classes.tileTitle}
            descriptionClassName={classes.description}
            isClickable={false}
            cardClassName={classes.cardStyles}
            iconClassName={classes.iconStyles}
          />
        </div>

        {legalDisclaimer?.value && (
          <InjectHTML
            className={classes.legalDisclaimer}
            tagType="p"
            data-testid="caption"
            styleType="legal"
            value={legalDisclaimer?.value}
            data-testId="legalDisclaimer"
          />
        )}
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  wrapper: {
    ...COMPONENT_WRAPPER,
    paddingTop: '80px',
    [breakpoints.down('sm')]: {
      padding: '40px 16px 0px',
    },
  },
  tilesWrapperClass: {
    rowGap: '2rem',
    gridColumnGap: '2rem',
    [breakpoints.down('sm')]: {
      rowGap: '1rem',
      gridColumnGap: '1rem',
    },
  },
  title: {
    display: 'inline',
  },
  titleContainer: {
    textAlign: 'center',
    width: '90%',
    paddingLeft: '15%',
    [breakpoints.down('xs')]: {
      padding: 0,
      width: '100%',
    },
  },
  h2Title: {
    textAlign: 'center',
    marginBottom: 16,
  },

  tilesWrapper: {
    marginTop: 32,
  },

  iconStyles: {
    minHeight: '59px',
    display: 'flex !important',
    alignItems: 'center',
    [breakpoints.down('xs')]: {
      minHeight: 'auto',
      marginBottom: '11.11px !important',
    },
  },
  svg: {
    [breakpoints.down('xs')]: {
      width: '29.34px',
      height: '29.34px',
    },
  },
  legalDisclaimer: {
    marginTop: '1rem',
    '& sup': { lineHeight: '0' },
  },
  tileTitle: {
    marginTop: 16,
    marginBottom: 20,
    fontSize: 24,
    lineHeight: '32px',
    [breakpoints.down('xs')]: {
      marginTop: 0,
      marginBottom: 8,
    },
  },
  description: {
    fontSize: '1.125rem',
    lineHeight: '1.625rem',
    display: 'inline',
    '& a': {
      display: 'inline',
      fontFamily: PP_OBJECT_SANS_MEDIUM,
    },
    '& sup': {
      lineHeight: 0,
    },
    '& a:hover': {
      color: colors.main.brightRed,
      textDecoration: 'underline',
    },

    [breakpoints.down('xs')]: {
      fontSize: '1rem',
      lineHeight: '1.5rem',
    },
  },
  cardStyles: {
    borderRadius: 32,
    display: 'flex',
    flexDirection: 'column',
    padding: '40px 33px 40px 33px',
    [breakpoints.down('xs')]: {
      padding: '32px',
    },
  },
}))

export default YTVThreeTiles
