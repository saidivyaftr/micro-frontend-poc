import { makeStyles } from '@material-ui/core'
import { useEffect } from 'react'
import { WarningIcon } from '@/shared-ui/react-icons'
import { Typography } from '@/shared-ui/components'
import {
  COMPONENT_WRAPPER,
  CUSTOMER,
  SERVICEABLE,
  REG_TECHNICALERR_MODAL,
  WIFI,
} from 'src/constants'
import { registerSlice } from 'src/redux/slicers/register'
import { State } from 'src/redux/types'
import { useDispatch, useSelector } from 'react-redux'
import ModalWrapper from './ModalWrapper'
import useAppData from '@/shared-ui/hooks/useAppData'
//import ChatWithUsLine from '../components/./ChatWithUs'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import { formatUrl } from 'src/utils/urlHelpers'

const ApiErrorModal = () => {
  const classes = useStyles()
  const { title, info, info2 } = useAppData('genericErrorModal', true)
  const dispatch = useDispatch()
  const { hasApiFailed, flowType } =
    useSelector((state: State) => state?.register) || {}
  const isWIFI = flowType === WIFI
  useEffect(() => {
    if (hasApiFailed) {
      DTMClient.triggerEvent({
        pageName: REG_TECHNICALERR_MODAL,
        eVar22: CUSTOMER,
        eVar49: SERVICEABLE,
      })
    }
  }, [hasApiFailed])
  const dismissModal = () => {
    if (isWIFI) {
      window.location.href = formatUrl('/login')
    } else {
      dispatch(registerSlice.actions.setApiErrorModal(false))
    }
  }
  return (
    <>
      <ModalWrapper
        isOpen={hasApiFailed}
        handleClose={dismissModal}
        modalContent={
          <div className={classes.root} data-tid="api-error-modal">
            <div className={classes.warningIcon}>
              <WarningIcon />
            </div>
            <div className={classes.warningMessage}>
              <Typography
                tagType="h3"
                styleType="h6"
                data-tid="api-error-modal-title"
              >
                {title?.value}
              </Typography>
              <Typography tagType="p" styleType="p2">
                {info?.value}
              </Typography>
            </div>
            <div className={classes.warningMessage}>
              <Typography tagType="p" styleType="p2">
                {info2?.value}
              </Typography>
            </div>
            {/* <div className={classes.infoWrapper}>
              <ChatWithUsLine handleClose={dismissModal} />
            </div> */}
          </div>
        }
      />
    </>
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
  warningMessage: {
    margin: '20px 48px',
    textAlign: 'center',
  },
  btnWrapper: {
    width: 246,
    margin: '0 auto',
  },
  btnStyle: {
    marginTop: 20,
    fontSize: '14px',
    padding: '0',
  },
  textCenter: {
    textAlign: 'center',
  },
  infoWrapper: {
    textAlign: 'center',
    marginTop: 32,
  },
  textWrongNo: {
    fontWeight: 500,
  },
  updateLinkBtn: {
    marginLeft: '10px',
    textDecoration: 'underline',
    cursor: 'pointer',
    fontSize: 14,
  },
}))

export default ApiErrorModal
