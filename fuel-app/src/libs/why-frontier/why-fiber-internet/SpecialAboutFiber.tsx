import { useMemo } from 'react'
import { makeStyles } from '@material-ui/core'
import {
  Typography,
  FourTiles,
  Button,
  TooltipPopover,
} from '@/shared-ui/components'
import colors from '@/shared-ui/colors'
import { useAppData } from 'src/hooks'
import { COMPONENT_WRAPPER, SPECIAL_ABOUT_FIBER } from 'src/constants'
import {
  InfoIconWhite,
  FastSpeedIcon,
  SuccessBadgeIcon,
  VerifiedBadgeIcon,
} from '@/shared-ui/react-icons'

const RenderIcon = ({ iconName }: { iconName: string }) => {
  switch (iconName) {
    case 'FastSpeedIcon':
      return <FastSpeedIcon />
    case 'SuccessBadgeIcon':
      return <SuccessBadgeIcon />
    case 'VerifiedBadgeIcon':
      return <VerifiedBadgeIcon />
    default:
      return null
  }
}

const SpecialAboutFiber = () => {
  const classes = useStyles()
  const { title, subTitle, tiles, primaryButtonText, primaryButtonValue }: any =
    useAppData('specialAboutFiber', true)

  const list = useMemo(() => {
    if (!tiles?.list) {
      return []
    }
    const tilesList = []
    for (const item of tiles?.list) {
      const payload: any = {
        title: item?.title?.value,
        description: item?.description?.rendered,
        icon: <RenderIcon iconName={item?.icon?.value?.field?.value} />,
      }
      tilesList.push(payload)
    }
    return tilesList
  }, [tiles])

  const renderData = (index: any) => {
    if (tiles.list[index]?.toolTip?.value) {
      return (
        <TooltipPopover
          tooltipIcon={<InfoIconWhite />}
          dropShadow={false}
          tooltipContent={tiles.list[index]?.toolTip?.value}
          tooltipClassName={classes.tooltipStyles}
        />
      )
    }
    return <></>
  }

  if (!tiles?.list) {
    return null
  }
  const onButtonClick = () => {
    //@ts-ignore
    s_objectID = SPECIAL_ABOUT_FIBER.replace('{NAME}', primaryButtonText?.value)
  }
  return (
    <div id="special-about-fiber" className={classes.root}>
      <div className={classes.wrapper}>
        <Typography tagType="h2" styleType="h3" className={classes.title}>
          {title?.value}
        </Typography>
        <Typography className={classes.title} styleType="p1">
          {subTitle?.value}
        </Typography>
        <div className={classes.tilesWrapper}>
          <FourTiles
            type="dark"
            textAlign="left"
            tiles={list}
            titleStyleType="h5"
            isClickable={false}
            cardClassName={classes.tileCard}
            descriptionClassName={classes.description}
            renderData={renderData}
            roundedBorders={true}
          />
        </div>
        {primaryButtonText?.value && (
          <Button
            className={classes.primaryBtn}
            type="link"
            text={primaryButtonText?.value}
            href={primaryButtonValue?.value}
            onClick={onButtonClick}
          />
        )}
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    background: colors.main.grey,
  },
  wrapper: {
    ...COMPONENT_WRAPPER,
    padding: '80px 1rem',
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
  },
  tileCard: {
    borderRadius: 16,
  },
  tilesWrapper: {
    marginTop: 32,
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
  tooltipStyles: {
    display: 'inline',
  },
  description: {
    display: 'inline',
  },
}))

export default SpecialAboutFiber
