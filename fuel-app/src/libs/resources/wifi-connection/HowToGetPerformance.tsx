import colors from '@/shared-ui/colors'
import {
  InfoIconWhite,
  OneIcon,
  TwoIcon,
  ThreeIcon,
} from '@/shared-ui/react-icons'
import { makeStyles } from '@material-ui/core'
import { useMemo } from 'react'
import { FourTiles, InjectHTML, TooltipPopover } from 'src/blitz'
import { COMPONENT_WRAPPER } from 'src/constants'
import { useAppData } from 'src/hooks'

const HowToGetPerformance = () => {
  const classes = useStyles()
  const data = useAppData('howToGetPerformance', true)
  const { title, performanceList: tiles }: any = data

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'one':
        return <OneIcon />
      case 'two':
        return <TwoIcon />
      case 'three':
        return <ThreeIcon />
      default:
        return null
    }
  }

  const list = useMemo(() => {
    if (!tiles?.list) {
      return []
    }
    const tilesList = tiles?.list?.map((item: any) => {
      return {
        title: item?.title?.value,
        description: item?.description?.value,
        icon: renderIcon(item?.icon?.value),
      }
    })
    return tilesList
  }, [tiles])

  const renderData = (index: any) => {
    if (tiles?.list[index]?.toolTip?.value) {
      return (
        <TooltipPopover
          tooltipContent={tiles.list[index]?.toolTip?.value}
          tooltipIcon={<InfoIconWhite />}
          dropShadow={false}
          tooltipDirection="bottom"
          tooltipClassName={classes.tooltipStyles}
        />
      )
    }
    return <></>
  }

  if (!title?.value) {
    return null
  }

  return (
    <div data-testid="how-to-get-performance" className={classes.container}>
      <div className={classes.wrapper}>
        <InjectHTML
          value={title?.value}
          tagType="h2"
          styleType="h2"
          className={classes.title}
        />
        <div className={classes.tilesWrapper}>
          <FourTiles
            type="light"
            textAlign="left"
            tiles={list}
            titleStyleType="h5"
            tilesWrapperClassName={classes.tilesWrapperClass}
            titleClassName={classes.tileTitle}
            descriptionStyleType="p1"
            descriptionClassName={classes.description}
            isClickable={false}
            cardClassName={classes.cardStyles}
            renderData={renderData}
            iconClassName={classes.iconStyles}
          />
        </div>
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  container: {
    background: colors.main.newBackgroundGray,
  },
  wrapper: {
    ...COMPONENT_WRAPPER,
    padding: '80px 16px 160px 16px',
    [breakpoints.down('xs')]: {
      padding: '32px 16px 32px 16px',
    },
  },
  tooltip: {
    display: 'inline',
  },
  title: {
    textAlign: 'center',
    marginBottom: '2rem',
    [breakpoints.down(360.5)]: {
      '& br': {
        display: 'none',
      },
    },
  },
  tilesWrapper: {
    marginTop: 32,
  },
  tilesWrapperClass: {
    columnGap: '2rem',
    [breakpoints.down('xs')]: {
      columnGap: '1rem',
    },
  },
  iconStyles: {
    minHeight: '48px',
    display: 'flex !important',
    alignItems: 'center',
    marginBottom: 'unset',
    [breakpoints.down('xs')]: {
      minHeight: 'auto',
    },
  },
  tileTitle: {
    marginTop: 16,
    marginBottom: 16,
    [breakpoints.down('xs')]: {
      marginTop: 0,
    },
  },
  description: {
    display: 'inline',
    '& a': {
      fontWeight: 600,
      textDecoration: 'underline',
      display: 'unset',
      '&:hover': {
        color: colors.main.brightRed,
      },
    },
  },
  cardStyles: {
    borderRadius: 16,
    display: 'flex',
    flexDirection: 'column',
    borderRight: 'unset',
    padding: '40px 32px 40px 32px',
    [breakpoints.down('xs')]: {
      padding: '16px 32px',
    },
  },
  tooltipStyles: {
    display: 'inline',
  },
}))

export default HowToGetPerformance
