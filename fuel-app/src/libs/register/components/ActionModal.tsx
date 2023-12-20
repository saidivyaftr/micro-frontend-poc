import { makeStyles } from '@material-ui/core'
import { WarningIcon, ConfirmationIcon } from '@/shared-ui/react-icons'
import { Typography, Button } from '@/shared-ui/components'
import { COMPONENT_WRAPPER, CUSTOMER, SERVICEABLE } from 'src/constants'
import colors from '@/shared-ui/colors'
import { usePageLoadEvents } from 'src/hooks'
//import ChatWithUsLine from './ChatWithUs'
const ActionModal = (props: any) => {
  const classes = useStyles()
  const {
    title,
    subTitle,
    info,
    info1,
    btn1,
    btn2,
    icon = 'warning',
    trackingPageName,
    //hideChatWithUsMsg = false,
  } = props.data
  usePageLoadEvents({
    shouldTriggerDTMEvent: true,
    eventData: {
      pageName: trackingPageName || 'ftr:registration:action modal',
      eVar22: CUSTOMER,
      eVar49: SERVICEABLE,
      events: 'event68',
      eVar68: trackingPageName,
    },
  })

  return (
    <div className={classes.root}>
      <div className={classes.warningIcon}>
        {icon === 'warning' ? <WarningIcon /> : <ConfirmationIcon />}
      </div>
      <div className={classes.warningMessage}>
        <Typography tagType="h3" styleType="h5" data-tid="modal-title">
          {title?.value}
        </Typography>
        <Typography className={classes.subTitle} data-tid="modal-sub-title">
          {subTitle?.value}
        </Typography>
      </div>
      <div className={classes.actionModalBody}>
        {info?.value && (
          <Typography tagType="div" styleType="p2" data-tid="modal-info">
            {info?.value}
          </Typography>
        )}
        {info1?.value && (
          <Typography
            className={classes.info1}
            tagType="div"
            styleType="p2"
            data-tid="modal-info1"
          >
            {info1?.value}
          </Typography>
        )}
      </div>
      <div className={classes.btnWrapper}>
        {btn1?.text?.value && (
          <Button
            type="button"
            text={btn1?.text?.value}
            className={classes.btnStyle}
            onClick={props.btn1Handler}
            data-tid="modal-btn1"
          />
        )}
        {btn2?.text?.value && (
          <Button
            type="button"
            variant="secondary"
            text={btn2?.text?.value}
            className={classes.btnStyle}
            onClick={props.btn2Handler}
            data-tid="modal-btn2"
          />
        )}
      </div>
      {/* {hideChatWithUsMsg ? null : (
        <ChatWithUsLine handleClose={props?.handleClose} />
      )} */}
    </div>
  )
}

const useStyles = makeStyles(() => ({
  root: {
    ...COMPONENT_WRAPPER,
    padding: '40px 0',
  },
  warningIcon: {
    width: 100,
    margin: '0 auto',
  },
  subTitle: {
    marginBottom: 0,
  },
  warningMessage: {
    margin: '20px 48px',
    marginBottom: 0,
    textAlign: 'center',
  },
  actionModalBody: {
    padding: '32px 48px',
    paddingBottom: 0,
    marginBottom: 0,
    textAlign: 'center',
    maxHeight: 'calc(100vh - 400px)',
    overflowY: 'auto',
    maxWidth: 600,
    margin: '0 auto',
  },
  info1: {
    marginTop: 32,
  },
  btnWrapper: {
    width: 246,
    margin: '0 auto 32px auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  btnStyle: {
    marginTop: 32,
    width: 'max-content',
  },
  textCenter: {
    textAlign: 'center',
    marginTop: 32,
  },
  updateLinkBtn: {
    marginLeft: '10px',
    textDecoration: 'underline',
    cursor: 'pointer',
    fontSize: 14,
    '&:hover': {
      color: colors.main.brightRed,
    },
  },
}))

export default ActionModal
