import { makeStyles } from '@material-ui/core'
import { Typography, Button, Modal, InjectHTML } from '@/shared-ui/components'
import { COMPONENT_WRAPPER } from 'src/constants'
import clx from 'classnames'
import colors from '@/shared-ui/colors'
import { IButtonHoverVariant } from '@/shared-ui/components/Button/types'

const ActionModal = ({
  className,
  isOpen,
  handleClose,
  title,
  subTitle,
  info,
  primaryBtnText,
  primaryBtnAction,
  primaryBtnVariant = 'primary',
  isPrimaryBusy,
  secondaryBtnText,
  secondaryBtnAction,
  secondaryBtnVariant = 'tertiary',
  secondaryBtnHoverVariant = 'secondary',
  isSecondaryBusy,
  disclaimer,
  icon,
  bodyClassName,
  showCloseButton,
  titleClassName,
}: {
  className?: string
  isOpen?: boolean
  handleClose?: any
  title?: string | JSX.Element
  subTitle?: string
  info?: any
  primaryBtnText?: string
  primaryBtnAction?: any
  primaryBtnVariant?: any
  isPrimaryBusy?: boolean
  secondaryBtnText?: string
  secondaryBtnAction?: any
  secondaryBtnVariant?: any
  secondaryBtnHoverVariant?: IButtonHoverVariant
  isSecondaryBusy?: boolean
  disclaimer?: any
  icon?: any
  titleClassName?: string
  bodyClassName?: string
  showCloseButton?: boolean
}) => {
  const classes = useStyles()

  const modalContent = () => {
    return (
      <div className={clx(classes.root, className)}>
        {icon && <div className={classes.warningIcon}>{icon}</div>}
        <div className={classes.warningMessage}>
          <Typography
            tagType="h3"
            styleType="h4"
            data-tid="modal-title"
            className={clx(classes.title, titleClassName)}
          >
            {title}
          </Typography>
          {subTitle && (
            <InjectHTML
              className={classes.subTitle}
              styleType="p1"
              data-tid="modal-sub-title"
              value={subTitle}
            />
          )}
        </div>
        {info && (
          <div className={clx(classes.actionModalBody, bodyClassName)}>
            {info}
          </div>
        )}
        {(primaryBtnText || secondaryBtnText) && (
          <div className={classes.btnWrapper}>
            {primaryBtnText && (
              <Button
                type="button"
                text={primaryBtnText}
                className={`primaryBtn ${classes.btnStyle}`}
                variant={primaryBtnVariant}
                onClick={primaryBtnAction}
                disabled={isSecondaryBusy}
                isBusy={isPrimaryBusy}
                data-tid="modal-btn1"
              />
            )}
            {secondaryBtnText && (
              <Button
                type="button"
                variant={secondaryBtnVariant}
                text={secondaryBtnText}
                className={`secondaryBtn ${classes.btnStyle}`}
                disabled={isPrimaryBusy}
                isBusy={isSecondaryBusy}
                onClick={secondaryBtnAction}
                hoverVariant={secondaryBtnHoverVariant}
                data-tid="modal-btn2"
              />
            )}
          </div>
        )}
        {disclaimer && (
          <Typography className={classes.disclaimer} styleType="p4">
            {disclaimer}
          </Typography>
        )}
      </div>
    )
  }

  return (
    <Modal
      modalOpen={!!isOpen}
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
      showCloseButton={showCloseButton}
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
      borderRadius: 16,
      maxWidth: 'unset !important',
    },
  },
  modalCloseBtn: {
    top: '24px !important',
    right: '24px !important',
    fontWeight: 'bold',
    cursor: 'pointer',
    transform: 'none !important',
    [breakpoints.down('xs')]: {
      top: '12px !important',
      right: '12px !important',
    },
  },
  root: {
    ...COMPONENT_WRAPPER,
    padding: '104px 88px',
    paddingBottom: 80,
    [breakpoints.down('xs')]: {
      padding: '48px 16px',
    },
  },
  warningIcon: {
    width: 'fit-content',
    margin: '0 auto',
    marginBottom: 32,
    '& svg': {
      height: 80,
      width: 80,
      [breakpoints.down('xs')]: {
        height: 64,
        width: 64,
      },
    },
  },
  title: {
    marginBottom: 16,
  },
  subTitle: {
    marginBottom: 0,
  },
  warningMessage: {
    textAlign: 'center',
  },
  actionModalBody: {
    margin: '32px auto',
    marginBottom: 0,
    padding: 0,
    textAlign: 'center',
    maxHeight: 'calc(100vh - 400px)',
    overflowY: 'auto',
    maxWidth: 600,
    [breakpoints.down('xs')]: {
      margin: '16px auto',
      marginBottom: 0,
    },
  },
  info1: {
    marginTop: 32,
  },
  btnWrapper: {
    margin: '32px auto 16px auto',
    gap: 16,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  btnStyle: {
    width: 'fit-content',
    minWidth: 'fit-content',
    [breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  disclaimer: {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
  },
}))

export default ActionModal
