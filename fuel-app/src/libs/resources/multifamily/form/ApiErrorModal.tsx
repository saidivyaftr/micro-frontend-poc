import { makeStyles } from '@material-ui/core'
import { Typography, Button } from '@/shared-ui/components'
import { multifamilySlice } from 'src/redux/slicers'
import { useDispatch, useSelector } from 'react-redux'
import ModalWrapper from './ModalWrapper'
import { State } from 'src/redux/types'
import { COMPONENT_WRAPPER } from 'src/constants'

const ApiErrorModal = ({ data }: any) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { formErrorMessage } = useSelector((state: State) => state?.multifamily)

  const {
    errorTitle,
    errorSubtitle,
    //errorContact,
    contactUsButton,
    closeButton,
    handleDismissModal,
    emailTo,
    emailSubject,
  } = data

  const handleContactUs = () => {
    window.location.href = `mailto:${emailTo?.value}?subject=${emailSubject?.value}`
    //handleDismissModal()
    //dispatch(multifamilySlice.actions.setFormErrorMessage(''))
  }
  const dismissModal = () => {
    handleDismissModal()
    dispatch(multifamilySlice.actions.setFormErrorMessage(''))
  }

  return (
    <>
      <ModalWrapper
        isOpen={formErrorMessage?.length > 0}
        modalContent={
          <div className={classes.root}>
            <div className={classes.alignCenter}>
              <Typography tagType="h5" styleType="h5">
                {errorTitle?.value}
              </Typography>
              <Typography tagType="p" styleType="p1">
                {errorSubtitle?.value}
              </Typography>
            </div>
            {/* <div className={classes.alignCenter}>
              <Typography tagType="p" styleType="p1">
                {errorContact?.value}
              </Typography>
            </div> */}
            <div className={classes.buttonWrapper}>
              <Button
                type="button"
                variant="tertiary"
                onClick={() => handleContactUs()}
                hoverVariant="primary"
                text={contactUsButton?.text}
              />
              <Button
                type="submit"
                variant="primary"
                onClick={() => dismissModal()}
                className={classes.closeButton}
                text={closeButton?.value}
              />
            </div>
          </div>
        }
      />
    </>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    ...COMPONENT_WRAPPER,
    padding: '104px 104px 104px 88px',
    [breakpoints.down('sm')]: {
      padding: '32px',
    },
  },
  alignCenter: {
    textAlign: 'center',
  },
  closeButton: {
    width: '11.638125rem',
    [breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  buttonWrapper: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    marginTop: 32,
    [breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
}))

export default ApiErrorModal
