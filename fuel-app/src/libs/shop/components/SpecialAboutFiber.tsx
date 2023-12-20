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

const SpecialAboutFiber = ({ styles }: IShopComponents) => {
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
  }: any = useAppData('specialAboutFiber', true)

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
          tooltipIcon={<InfoIconWhite />}
          dropShadow={false}
          tooltipContent={tiles.targetItems[index]?.toolTip?.value}
          tooltipClassName={classes.tooltipStyles}
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
    <div
      id="special-about-fiber"
      data-testid="special-about-fiber"
      style={styles}
    >
      <div className={classes.wrapper}>
        <Typography tagType="h2" styleType="h3" className={classes.h2Title}>
          {title?.value}
        </Typography>
        <div className={classes.titleContainer}>
          <Typography className={classes.title} styleType="p1">
            {subTitle?.value}
          </Typography>
          {toolTipText?.value && (
            <TooltipPopover
              tooltipIcon={<InfoIconWhite />}
              tooltipContent={toolTipText?.value}
              tooltipDirection={tooltipDirection?.value}
              tooltipClassName={classes.tooltip}
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
    paddingBottom: '5rem',
    [breakpoints.down('sm')]: {
      paddingBottom: '2.5rem',
    },
  },
  title: {
    display: 'inline',
  },
  titleContainer: {
    textAlign: 'center',
  },
  tooltip: {
    display: 'inline',
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
    },
  },
  legalDisclaimer: {
    marginTop: '1rem',
    '& sup': { lineHeight: '0' },
  },
  tileTitle: {
    fontSize: '1.125rem',
    lineHeight: '1.165rem',
    marginTop: 30,
    marginBottom: 20,
    [breakpoints.down('xs')]: {
      marginTop: 0,
      marginBottom: 8,
    },
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
    padding: '40px 32px 40px 32px',
    [breakpoints.down('xs')]: {
      padding: '16px 32px',
    },
  },
  tooltipStyles: {
    display: 'inline',
  },
}))

export default SpecialAboutFiber
