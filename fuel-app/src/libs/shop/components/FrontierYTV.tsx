/* eslint-disable @typescript-eslint/indent */
/* eslint-disable prettier/prettier */
import BillIcon from '@/shared-ui/react-icons/BillIcon'
import { NoDataCapIcon, OfferIcon } from '@/shared-ui/react-icons/index'
import { makeStyles } from '@material-ui/core'
import { parseCookies } from 'nookies'
import { useMemo } from 'react'
import {
  FourTiles,
  InjectHTML,
  Typography,
  ButtonWithChatLink,
} from 'src/blitz'
import { COMPONENT_WRAPPER } from 'src/constants'
import { useAppData } from 'src/hooks'
import colors from 'src/styles/theme/colors'
import {
  TV_PAGE_EXISTING_CUST_CHAT_EVENT,
  TV_PAGE_PROSPECT_CUST_CHAT_EVENT,
} from 'src/constants'
import { IShopComponents } from './types'
import { useEffect, useState } from 'react'

const FrontierYTV = ({ styles }: IShopComponents) => {
  const classes = useStyles()
  const data = useAppData('FrontierYTV', true)
  const {
    title,
    subTitle,
    customerlist,
    prospectlist,
    chatNowButtonText,
    bottomText,
    availabilityButtonText,
    availabilityButtonURL,
    chatNowLink,
  }: any = data
  const { frontieramp = false } = parseCookies()
  const [isCustomer, setCustomer] = useState(false)
  useEffect(() => {
    setCustomer(!(!frontieramp || frontieramp != 'true'))
  }, [frontieramp])

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'NoDataCapIcon':
        return <NoDataCapIcon />
      case 'OfferIcon':
        return <OfferIcon />
      case 'BillIcon':
        return <BillIcon color={colors.main.greenishBlue} />
      default:
        return null
    }
  }
  const list = useMemo(() => {
    let items = []
    if (isCustomer) {
      items = customerlist?.targetItems
    } else {
      items = prospectlist?.targetItems
    }
    if (!items) {
      return []
    }
    const tilesList = items?.map((item: any) => {
      return {
        title: item?.title?.value,
        description: item?.description?.value,
        icon: renderIcon(item?.icon?.value?.field?.value),
      }
    })
    return tilesList
  }, [customerlist, prospectlist])

  if (!title?.value) {
    return null
  }

  return (
    <div id="frontier-ytv" className={classes.root} style={styles}>
      <div className={classes.wrapper}>
        <InjectHTML
          tagType="h2"
          styleType="h3"
          className={classes.h3Title}
          color="tertiary"
          value={title?.value}
        />
        <div className={classes.titleContainer}>
          <Typography className={classes.title} styleType="p1">
            {subTitle?.value}
          </Typography>
        </div>

        <div className={classes.tilesWrapper}>
          <FourTiles
            type="dark"
            textAlign="left"
            tiles={list}
            titleStyleType="h5"
            tilesWrapperClassName={
              list.length > 2
                ? classes.tilesContainer
                : classes.twoColumnTilesContainer
            }
            titleClassName={classes.tileTitle}
            descriptionClassName={classes.description}
            descriptionStyleType="p1"
            isClickable={false}
            cardClassName={classes.cardStyles}
            iconClassName={classes.iconStyles}
          />
        </div>
        {chatNowButtonText?.value !== '' &&
          availabilityButtonText?.value !== '' && (
            <div className={classes.bottomText}>
              <ButtonWithChatLink
                isReturningUser={isCustomer}
                buttonName={
                  isCustomer
                    ? chatNowButtonText?.value
                    : availabilityButtonText?.value
                }
                buttonLink={isCustomer ? '' : availabilityButtonURL?.value}
                chatClassName={classes.primaryBtn}
                buttonTarget="_self"
                hoverVariant="secondary"
                bgType="dark"
                labelLinkText={chatNowLink?.value}
                labelName={bottomText?.value}
                labelNameColor="white"
                labelLinkTextColor="white"
                labelStyleType="p1"
                labelTagType="p"
                chatParams={{
                  launchOption: isCustomer
                    ? TV_PAGE_EXISTING_CUST_CHAT_EVENT
                    : TV_PAGE_PROSPECT_CUST_CHAT_EVENT,
                }}
              />
            </div>
          )}
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    backgroundColor: colors.main.dark,
  },
  wrapper: {
    ...COMPONENT_WRAPPER,
    margin: 'auto',
    padding: '80px 16px',
    [breakpoints.down('sm')]: {
      padding: '40px 16px',
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
  h3Title: {
    textAlign: 'center',
  },
  tilesWrapper: {
    marginTop: '2rem',
    [breakpoints.down('xs')]: {
      marginTop: '1rem',
    },
  },
  tilesContainer: {
    gap: '2rem',
    [breakpoints.down('xs')]: {
      gap: '1rem',
    },
  },
  twoColumnTilesContainer: {
    gap: '2rem',
    [breakpoints.down('xs')]: {
      gap: '1rem',
    },
    gridTemplateColumns: 'repeat(2,1fr)',
  },
  iconStyles: {
    display: 'flex !important',
    [breakpoints.down('xs')]: {
      '& svg': {
        width: 32,
        height: 32,
      },
    },
  },
  tileTitle: {
    margin: '1rem 0',
    [breakpoints.down('xs')]: {
      marginTop: '0',
    },
  },
  description: {
    display: 'inline',
    '& sup': {
      lineHeight: 0,
    },
    '& a': {
      display: 'inline',
      '&:hover': {
        color: colors.main.brightRed,
      },
    },
  },
  primaryBtn: {
    margin: 'auto',
    display: 'block',
    marginTop: '2rem',
    [breakpoints.down('xs')]: {
      marginTop: '1rem',
    },
  },
  cardStyles: {
    backgroundColor: colors.main.darkShadeBlue,
    border: 'none',
    borderRadius: 32,
    display: 'flex',
    flexDirection: 'column',
    padding: '2rem',
    [breakpoints.down('xs')]: {
      borderRadius: '1rem',
    },
  },
  tooltipStyles: {
    display: 'inline',
  },
  bottomContainer: {
    marginTop: '1rem',
    textAlign: 'center',
  },
  bottomText: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '2rem',
  },
}))

export default FrontierYTV
