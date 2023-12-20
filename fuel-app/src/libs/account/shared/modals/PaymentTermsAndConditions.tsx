import { makeStyles } from '@material-ui/core'
import colors from '@/shared-ui/colors'
import { InjectHTML, Modal, Button, Typography } from '@/shared-ui/components'
import { DownloadIcon } from '@/shared-ui/react-icons'

const PaymentTermsAndConditions = ({
  isOpen,
  handleClose,
  title,
  description,
  downloadPDFText,
  downloadPDFLink,
  primaryBtnText,
  primaryBtnAction,
}: {
  isOpen: boolean
  handleClose: () => any
  title: string
  description: string
  downloadPDFText?: string
  downloadPDFLink?: string
  primaryBtnText?: string
  primaryBtnAction?: any
}) => {
  const classes = useStyles()

  const modalContent = () => {
    return (
      <div className={classes.container}>
        <Typography tagType="h4" styleType="h4" className={classes.title}>
          {title}
        </Typography>
        <div className={classes.descriptionContainer}>
          <InjectHTML value={description} className={classes.description} />
        </div>
        {downloadPDFText && downloadPDFLink && (
          <div>
            <Button
              type="link"
              buttonSize="medium"
              variant="lite"
              className={classes.downloadBtnText}
              text={
                <>
                  {downloadPDFText}
                  <DownloadIcon />
                </>
              }
              target="_blank"
              href={downloadPDFLink}
            />
          </div>
        )}
        {primaryBtnText && (
          <Button
            type="button"
            text={primaryBtnText}
            onClick={primaryBtnAction}
            className={classes.primaryBtn}
          />
        )}
      </div>
    )
  }

  return (
    <Modal
      modalOpen={isOpen}
      setModalOpen={handleClose}
      stopDefaultExit={true}
      modalContainerClassName={classes.modalWrapper}
      strokeWidth="4"
      iconColor={colors.main.black}
      modalCloseIconClassName={classes.modalCloseBtn}
      modalContent={modalContent()}
      width="100%"
      padding="0"
      background={colors.main.white}
      borderRadius="32px"
    />
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  modalWrapper: {
    maxWidth: '750px !important',
    maxHeight: '90vh',
    borderRadius: 32,
    padding: '0 !important',
    backgroundColor: colors.main.white,
    [breakpoints.down('xs')]: {
      maxWidth: 'unset !important',
      borderRadius: 16,
    },
  },
  modalCloseBtn: {
    fontWeight: 'bold',
    cursor: 'pointer',
    top: '65px !important',
    right: '16px !important',
    [breakpoints.down('xs')]: {
      top: '25px !important',
      right: '-10px !important',
    },
  },
  container: {
    padding: 88,
    [breakpoints.down('xs')]: {
      padding: '32px 16px',
    },
  },
  title: {
    textAlign: 'center',
  },
  primaryBtn: {
    margin: 'auto',
    marginTop: 32,
    display: 'block',
  },
  description: {
    margin: 32,
    height: 200,
    overflowY: 'auto',
    [breakpoints.down('xs')]: {
      margin: 16,
    },
  },
  descriptionContainer: {
    border: `1px solid ${colors.main.borderGrey}`,
    backgroundColor: colors.main.newBackgroundGray,
    marginTop: 16,
    borderRadius: 16,
  },
  downloadBtnText: {
    display: 'flex !important',
    justifyContent: 'start',
    alignItems: 'center',
    '&:hover': {
      '& svg': {
        '& path': {
          fill: colors.main.brightRed,
        },
      },
    },
  },
}))

export default PaymentTermsAndConditions
