import { useMemo } from 'react'
import { makeStyles } from '@material-ui/core'
import {
  Typography,
  FourTiles,
  Button,
  InjectHTML,
  TooltipPopover,
} from 'src/blitz'
import {
  COMPONENT_WRAPPER,
  CTA_BUTTON,
  SITE_INTERACTION,
  SPECIAL_ABOUT_FIBER,
} from 'src/constants'
import { useAppData } from 'src/hooks'
import InfoIconWhite from '@/shared-ui/react-icons/info-icon-white'
import { IShopComponents } from './types'

const WhyFrontier = ({ styles }: IShopComponents) => {
  const classes = useStyles()
  const {
    title,
    subTitle,
    list: tiles,
    primaryButtonText,
    primaryButtonValue,
    legalDisclaimer,
    toolTipText,
    tooltipDirection,
  }: any = useAppData('whyFrontier', true)
  const list = useMemo(() => {
    if (!tiles?.targetItems) {
      return []
    }
    const tilesList = tiles?.targetItems?.map((item: any) => {
      return {
        title: item?.title?.value,
        description: item?.description?.value,
        icon: <InjectHTML value={item?.icon?.value} />,
      }
    })
    return tilesList
  }, [tiles])
  const renderData = (index: any) => {
    if (tiles.targetItems[index]?.toolTip?.value) {
      return (
        <TooltipPopover
          tooltipContent={tiles.targetItems[index]?.toolTip?.value}
          tooltipIcon={<InfoIconWhite />}
        />
      )
    }
    return <></>
  }

  const onButtonClick = () => {
    //@ts-ignore
    s_objectID = SPECIAL_ABOUT_FIBER.replace('{NAME}', primaryButtonText?.value)
  }
  return (
    <div id="why-fiber-giga-internet" data-testid="whyFrontier" style={styles}>
      <div className={classes.wrapper}>
        <Typography
          data-testid="title"
          tagType="h2"
          styleType="h3"
          className={classes.h2Title}
        >
          {title?.value}
        </Typography>
        <div className={classes.titleContainer}>
          <Typography
            data-testid="subTitle"
            className={classes.title}
            styleType="p1"
          >
            {subTitle?.value}
          </Typography>
          {toolTipText?.value && (
            <TooltipPopover
              tooltipDirection={tooltipDirection?.value}
              tooltipContent={toolTipText?.value}
              tooltipIcon={<InfoIconWhite />}
            />
          )}
        </div>

        <div className={classes.tilesWrapper}>
          <FourTiles
            type="dark"
            textAlign="left"
            tiles={list}
            titleStyleType="h5"
            titleClassName={classes.tileTitle}
            descriptionClassName={classes.description}
            isClickable={false}
            cardClassName={classes.cardStyles}
            renderData={renderData}
            iconClassName={classes.iconStyles}
          />
        </div>
        {primaryButtonText?.value && primaryButtonValue?.url && (
          <Button
            className={classes.primaryBtn}
            type="link"
            text={primaryButtonText?.value}
            href={primaryButtonValue?.url}
            onClick={onButtonClick}
            triggerEvent={true}
            eventObj={{ events: 'event14', eVar14: CTA_BUTTON }}
            interactionType={SITE_INTERACTION}
          />
        )}
        {legalDisclaimer?.value && (
          <InjectHTML
            className={classes.legalDisclaimer}
            tagType="p"
            data-testid="caption"
            styleType="legal"
            value={legalDisclaimer?.value}
          />
        )}
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  wrapper: {
    ...COMPONENT_WRAPPER,
  },
  title: {
    display: 'inline',
  },
  titleContainer: {
    textAlign: 'center',
  },
  h2Title: {
    textAlign: 'center',
    marginBottom: 16,
  },
  tilesWrapper: {
    marginTop: 32,
  },
  iconStyles: {
    display: 'flex !important',
    alignItems: 'center',
    marginBottom: '0rem !important',
    height: 40,
    [breakpoints.down('xs')]: {
      minHeight: 'auto',
    },
  },
  legalDisclaimer: {
    marginTop: '1rem',
    '& sup': { lineHeight: '0' },
  },
  tileTitle: {
    marginBottom: '1rem',
  },
  description: {
    fontSize: '1rem',
    lineHeight: '1.5rem',
    display: 'inline',
    '& sup': {
      lineHeight: 0,
    },
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
  cardStyles: {
    borderRadius: 16,
    display: 'flex',
    flexDirection: 'column',
    padding: '2.5rem 2rem',
    gap: '1rem',
    [breakpoints.down('xs')]: {
      padding: '2rem',
    },
  },
}))

export default WhyFrontier
