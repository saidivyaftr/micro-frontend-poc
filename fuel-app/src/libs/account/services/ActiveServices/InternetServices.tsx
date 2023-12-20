import { makeStyles } from '@material-ui/core/styles'
import { Typography, InjectHTML, Tooltip, Button } from '@/shared-ui/components'
import clx from 'classnames'
import colors from '@/shared-ui/colors'
import { useAppData, useChatState, useWindowDimensions } from 'src/hooks'
import InfoIconRed from '@/shared-ui/react-icons/info-icon-red'
import { useState } from 'react'
import ModalWrapper from 'src/libs/register/components/ModalWrapper'
import WarningIcon from '@/shared-ui/react-icons/warning'
import {
  COMPONENT_WRAPPER,
  SELF_SERVICE_EXISTING_CUSTOMER_SPEED_UPGRADE,
} from 'src/constants'

const InternetServices = (props: any) => {
  const classes = useStyles()
  const { data, shouldDisableTile, onClickCTA, tabTitle } = props
  const internetPlan = useAppData('internetPlan', true)
  const businessHoursModalData = useAppData('businessHoursModalData', true)
  const { width } = useWindowDimensions()
  const isMobileOrTablet = width <= 1023
  const isMobile = width <= 768
  const [showModal, setShowModal] = useState(false)
  const updateSpeedFromData = (str: string) => {
    let updatedString = str.replace('$upMbps$', data?.dataspeed?.upMbps)
    updatedString = updatedString.replace(
      '$downMbps$',
      data?.dataspeed?.downMbps,
    )
    return updatedString
  }

  const { setChatState, setChatParams } = useChatState()
  const hideChatButton = data?.dataspeed?.downMbps === 5000 || shouldDisableTile
  const handleChatClick = () => {
    onClickCTA(
      `${tabTitle}:${data?.productName}:${internetPlan?.chatWithUsButton?.value}`,
    )
    setChatParams({
      launchOption: SELF_SERVICE_EXISTING_CUSTOMER_SPEED_UPGRADE,
      existingInternetPlan: data,
    })
    setChatState(true)
  }
  const ModalContent = () => (
    <div className={classes.root}>
      <div className={classes.warningIcon}>
        <WarningIcon />
      </div>
      <div className={classes.warningMessage}>
        <Typography tagType="h3" styleType="h5" data-tid="modal-title">
          {businessHoursModalData?.title?.value}
        </Typography>
      </div>
      <div className={classes.description}>
        <Typography
          tagType="p"
          styleType="p1"
          className={classes.descriptionText}
        >
          {businessHoursModalData?.description?.value}
        </Typography>
      </div>
      <div className={classes.btnWrapper}>
        <Button
          type="button"
          variant="primary"
          hoverVariant="primary"
          text={businessHoursModalData?.actionButtonTitle?.value}
          onClick={() => setShowModal(false)}
        />
      </div>
    </div>
  )

  return (
    <>
      <Typography
        tagType="h4"
        styleType="h4"
        className={clx(classes.title, {
          [classes.disableTile]: shouldDisableTile,
        })}
      >
        {data?.productName}
      </Typography>

      <ul
        className={clx(classes.listContainer, {
          [classes.disableTile]: shouldDisableTile,
        })}
      >
        {data.dataNetwork !== 'COPPER' && (
          <>
            {internetPlan?.detailList?.targetItems?.map(
              (item: any, index: any) => {
                return (
                  <li key={`list_${index}`}>
                    <Typography
                      tagType="span"
                      styleType="h6"
                      className={classes.title}
                    >
                      <InjectHTML
                        className={clx(classes.textStyle, {
                          [classes.disableTile]: shouldDisableTile,
                        })}
                        value={updateSpeedFromData(item?.value?.value)}
                      />
                    </Typography>
                  </li>
                )
              },
            )}
          </>
        )}
        {!hideChatButton && (
          <li>
            <Typography tagType="span" styleType="h6" className={classes.title}>
              {!isMobileOrTablet ? (
                <>
                  <InjectHTML
                    className={clx(classes.textStyle, {
                      [classes.disableTile]: shouldDisableTile,
                    })}
                    value={internetPlan?.chatWithUsText?.value}
                  />
                  <Tooltip
                    tooltipText={
                      internetPlan?.tooltipTextForBusinessHours?.value
                    }
                    tooltipIcon={<InfoIconRed />}
                    tooltipClassName={classes.toolTipIcon}
                    tooltipContentClass={classes.toolTipContent}
                    tooltipArrowClass={classes.tooltipArrow}
                  />
                </>
              ) : (
                <>
                  <InjectHTML
                    className={clx(classes.textStyle, {
                      [classes.disableTile]: shouldDisableTile,
                    })}
                    value={internetPlan?.chatWithUsMobileText?.value}
                  />
                  <div
                    onClick={() => setShowModal(true)}
                    className={classes.businessHrsBtn}
                  >
                    <Typography styleType="p1" tagType="span">
                      {internetPlan?.businessHours?.value}
                    </Typography>
                  </div>
                </>
              )}
            </Typography>
          </li>
        )}
      </ul>
      {!hideChatButton && (
        <Button
          type="button"
          variant={isMobile ? 'secondary' : 'tertiary'}
          text={internetPlan?.chatWithUsButton?.value}
          onClick={handleChatClick}
        />
      )}
      <ModalWrapper
        isOpen={showModal}
        handleClose={() => setShowModal(false)}
        modalContent={<ModalContent />}
      />
    </>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  disableTile: {
    color: `${colors.main.gray} !important`,
  },
  title: {
    display: 'block',
    marginTop: 16,
    [breakpoints.up('sm')]: {
      display: 'inline-flex',
    },
  },
  listContainer: {
    marginLeft: -20,
  },
  toolTipIcon: {
    left: 6,
    '& svg': {
      width: 16,
      height: 16,
    },
  },
  tooltipArrow: {
    transform: 'rotate(138deg)',
    top: 5,
    left: 18,
    width: 8,
    height: 8,
  },
  toolTipContent: {
    top: -20,
    left: '22px !important',
    borderRadius: 8,
    right: '140px !important',
    boxShadow: `0px 2px 15px ${colors.main.shadowBlack}`,
    minWidth: 297,
    bottom: 'auto',
    '& > div': {
      margin: 8,
    },
  },
  textStyle: {
    fontSize: '1rem',
    lineHeight: '1.5rem',
    [breakpoints.up('sm')]: {
      fontSize: '1.125rem',
      lineHeight: '1.625rem',
    },
  },
  mobileTextStyle: {
    display: 'block',
    marginTop: 16,
  },
  businessHrsBtn: {
    textDecoration: 'underline',
    cursor: 'pointer',
    '& span': {
      fontWeight: 'bold',
    },
  },
  root: {
    ...COMPONENT_WRAPPER,
    padding: '48px 0',
    [breakpoints.down('sm')]: {
      width: 331,
    },
  },
  warningIcon: {
    width: 100,
    margin: '0 auto',
  },
  warningMessage: {
    margin: '20px 48px',
    marginBottom: 0,
    textAlign: 'center',
  },
  btnWrapper: {
    width: 246,
    margin: '2rem auto 0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  description: {
    margin: '1.25rem 1rem 0 1rem',
  },
  descriptionText: {
    fontWeight: 400,
    textAlign: 'center',
  },
}))

export default InternetServices
