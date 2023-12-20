import { useMemo } from 'react'
import { makeStyles } from '@material-ui/core'
import {
  Typography,
  FourTiles,
  Button,
  InjectHTML,
  TooltipPopover,
} from '@/shared-ui/components'
import colors from '@/shared-ui/colors'
import { COMPONENT_WRAPPER, SPECIAL_ABOUT_FIBER } from 'src/constants'
import { useAppData } from 'src/hooks'
import InfoIconWhite from '@/shared-ui/react-icons/info-icon-white'

const SpecialAboutFiber = () => {
  const classes = useStyles()
  const {
    title,
    subTitle,
    list: tiles,
    primaryButtonText,
    primaryButtonValue,
    disclaimerText,
  }: any = useAppData('specialAboutFiber', true)

  const list = useMemo(() => {
    if (!tiles?.targetItems) {
      return []
    }
    const tilesList = []
    for (const item of tiles?.targetItems) {
      const payload: any = {
        title: item?.title?.value,
        description: item?.description?.value,
        icon: <InjectHTML value={item?.icon?.value} />,
      }
      tilesList.push(payload)
    }
    return tilesList
  }, [tiles])

  if (!tiles?.targetItems) {
    return null
  }

  const renderData = (index: any) => {
    if (tiles.targetItems[index]?.toolTip?.value) {
      return (
        <TooltipPopover
          tooltipContent={tiles.targetItems[index]?.toolTip?.value}
          tooltipIcon={<InfoIconWhite />}
          dropShadow={false}
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
    <div id="special-about-fiber" className={classes.root}>
      <div className={classes.wrapper}>
        <Typography tagType="h2" styleType="h3" className={classes.h2Title}>
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
            titleClassName={classes.tileTitle}
            descriptionClassName={classes.description}
            isClickable={false}
            cardClassName={classes.cardStyles}
            renderData={renderData}
          />
        </div>
        {primaryButtonText?.value && primaryButtonValue?.url && (
          <Button
            className={classes.primaryBtn}
            type="link"
            text={primaryButtonText?.value}
            href={primaryButtonValue?.url}
            onClick={onButtonClick}
          />
        )}
        {disclaimerText?.value && (
          <InjectHTML
            styleType="legal"
            className={classes.legalDisclaimer}
            value={disclaimerText?.value}
          />
        )}
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    background: colors.main.lightGray,
  },
  wrapper: {
    ...COMPONENT_WRAPPER,
    paddingBottom: 80,
    paddingTop: 60,
    [breakpoints.down('xs')]: {
      padding: '60px 0px 64px 0px',
    },
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
    [breakpoints.down('xs')]: {
      fontSize: '1.125rem',
      lineHeight: '26px',
      width: '81.5%',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  h2Title: {
    textAlign: 'center',
    marginBottom: 16,
    [breakpoints.down('xs')]: {
      width: '81.5%',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  tilesWrapper: {
    marginTop: 32,
  },
  tileTitle: {
    [breakpoints.down('xs')]: {
      fontSize: '1.5rem',
    },
  },
  description: {
    fontSize: '1.125rem',
    lineHeight: '1.625rem',
    display: 'inline',
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
    borderRadius: '1rem',
    [breakpoints.down('xs')]: {
      paddingLeft: '40px',
      paddingRight: '46px',
      margin: '0 1rem',
    },
  },

  legalDisclaimer: {
    marginTop: '1rem',
  },
}))

export default SpecialAboutFiber
