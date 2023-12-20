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
// import { useAppData } from 'src/hooks'
import InfoIconWhite from '@/shared-ui/react-icons/info-icon-white'
import colors from '@/shared-ui/colors'
import useAppData from '@/shared-ui/hooks/useAppData'
import { IShopComponents } from './types'

const GetMoreValue = ({ styles }: IShopComponents) => {
  const classes = useStyles()
  const {
    title,
    subTitle,
    list: tiles,
    primaryButtonText,
    primaryButtonValue,
    legalDisclaimer,
  }: any = useAppData('getMoreValue', true)
  const list = useMemo(() => {
    if (!tiles?.targetItems) {
      return []
    }
    const tilesList = tiles?.targetItems?.map((item: any) => {
      return {
        title: item?.title?.value,
        description: item?.description?.value,
      }
    })
    return tilesList
  }, [tiles])

  if (!title?.value) return null

  const renderData = (index: any) => {
    if (tiles.targetItems[index]?.toolTip?.value) {
      return (
        <TooltipPopover
          tooltipContent={tiles.targetItems[index]?.toolTip?.value}
          tooltipIcon={<InfoIconWhite />}
          dropShadow={false}
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
    <div className={classes.root} data-testid="get-more-value" style={styles}>
      <div className={classes.wrapper}>
        <InjectHTML
          tagType="h2"
          styleType="h3"
          color="tertiary"
          data-testId="h2Title"
          className={classes.h2Title}
          value={title?.value}
        />
        <Typography
          className={classes.title}
          styleType="p1"
          data-testId="subTitle"
        >
          {subTitle?.value}
        </Typography>
        <div className={classes.tilesWrapper} data-testId="tiles">
          <FourTiles
            type="dark"
            textAlign="left"
            tiles={list}
            titleStyleType="h6"
            titleClassName={classes.tileTitle}
            descriptionClassName={classes.description}
            isClickable={false}
            cardClassName={classes.cardStyles}
            renderData={renderData}
            mobileOneCol={true}
            descriptionStyleType="p1"
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
            data-testID="button"
          />
        )}
        {legalDisclaimer?.value && (
          <InjectHTML
            styleType="legal"
            color="tertiary"
            className={classes.legalDisclaimer}
            value={legalDisclaimer?.value}
            data-testId="legalDisclaimer"
          />
        )}
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    width: '100%',
    backgroundColor: colors.main.dark,
  },
  wrapper: {
    ...COMPONENT_WRAPPER,
    paddingBottom: 80,
    [breakpoints.down('xs')]: {
      padding: '40px 16px 64px 16px',
    },
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
  },
  h2Title: {
    textAlign: 'center',
    marginBottom: 64,
    paddingTop: 80,
    [breakpoints.down('xs')]: {
      marginBottom: 16,
      paddingTop: 16,
      '& br': {
        display: 'none',
      },
    },
  },

  tilesWrapper: {
    marginTop: 32,
  },
  legalDisclaimer: {
    marginTop: '1rem',
  },
  tileTitle: {
    color: colors.main.greenishBlue,
    minHeight: 52,
    [breakpoints.down(1100)]: {
      minHeight: 80,
    },
    [breakpoints.down(850)]: {
      minHeight: 110,
    },
    [breakpoints.down('xs')]: {
      marginTop: 0,
      marginBottom: 8,
      minHeight: 'auto',
    },
  },
  description: {
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
    padding: '2rem',
    border: 'none !important',
    backgroundColor: colors.main.darkShadeBlue,
    [breakpoints.down('xs')]: {
      padding: '32px 32px',
    },
  },
  tooltipStyles: {
    display: 'inline',
  },
}))

export default GetMoreValue
