import { Typography, Card } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core'
import { useState } from 'react'
import { COMPONENT_WRAPPER } from 'src/constants'
import { FindAccount } from './FindAccount'
import { VerifyAccount } from './VerifyAccount'
import { WhereToFindAccountModal } from './modals/WhereToFindAccountModal'
import { CannotProceedFurtherModal } from './modals/CannotProceedFurtherModal'
import { GreenCircleCheckOverlay } from '@/shared-ui/react-icons/index'
import { AccountLinked } from './AccountLinked'
import { VerifyAccessCodeOTPModal } from './modals/VerifyAccessCodeOTPModal'
import useAppData from '@/shared-ui/hooks/useAppData'

export type CurrentStep = 'FIND' | 'VERIFY' | 'SUCCESS'
export type ModalType =
  | 'FIND_ACCOUNT'
  | 'FIND_PIN'
  | 'VERIFY_ACCESS_OTP'
  | 'CANT_FIND_ACCOUNT'
  | 'CANT_VERIFY_ACCESS'
  | null

export const LinkAccountContainer = () => {
  const classes = useStyles()
  const linkAccountData = useAppData('linkAccountData', true)

  const [currentStep, setCurrentStep] = useState<CurrentStep>('FIND')
  const [modal, setModal] = useState<ModalType>(null)
  const [selectedAccessCodeId, setSelectedAccessCodeId] = useState({
    id: '',
    token: '',
  })

  const stepValue =
    currentStep !== 'SUCCESS' &&
    linkAccountData?.step?.value?.replace?.(
      '{{VALUE}}',
      currentStep === 'FIND' ? '1' : '2',
    )

  const getTitle = () => {
    switch (currentStep) {
      case 'FIND':
        return linkAccountData?.findAccountTitle?.value
      case 'VERIFY':
        return linkAccountData?.verifyAccountTitle?.value
      case 'SUCCESS':
      default:
        return linkAccountData?.accountLinked?.value
    }
  }

  const getDescription = () => {
    switch (currentStep) {
      case 'FIND':
        return linkAccountData?.findAccountDescription?.value
      case 'VERIFY':
        return linkAccountData?.verifyAccountDescription?.value
      case 'SUCCESS':
      default:
        return ''
    }
  }

  const renderStepForm = () => {
    switch (currentStep) {
      case 'FIND':
        return (
          <FindAccount setCurrentStep={setCurrentStep} setModal={setModal} />
        )
      case 'VERIFY':
        return (
          <VerifyAccount
            setSelectedAccessCodeId={setSelectedAccessCodeId}
            setCurrentStep={setCurrentStep}
            setModal={setModal}
          />
        )
      case 'SUCCESS':
      default:
        return <AccountLinked />
    }
  }

  return (
    <section className={classes.wrapper}>
      <div className={classes.root}>
        <Card className={classes.card}>
          <div>
            {stepValue && (
              <Typography
                color="primary"
                styleType="p2"
                fontType="boldFont"
                className={classes.step}
              >
                {stepValue}
              </Typography>
            )}
            {currentStep === 'SUCCESS' && (
              <GreenCircleCheckOverlay
                height={48}
                width={48}
                className={classes.successIcon}
              />
            )}
            <Typography styleType="h5" className={classes.title}>
              {getTitle()}
            </Typography>
            <Typography styleType="p2" className={classes.description}>
              {getDescription()}
            </Typography>
            {renderStepForm()}
            <WhereToFindAccountModal
              isOpen={modal === 'FIND_ACCOUNT' || modal === 'FIND_PIN'}
              isAccountPinInfo={modal === 'FIND_PIN'}
              handleClose={() => setModal(null)}
            />
            <CannotProceedFurtherModal
              isOpen={
                modal === 'CANT_FIND_ACCOUNT' || modal === 'CANT_VERIFY_ACCESS'
              }
              isVerifyFailed={modal === 'CANT_VERIFY_ACCESS'}
              handleClose={() => setModal(null)}
            />
            <VerifyAccessCodeOTPModal
              selectedAccessCodeId={selectedAccessCodeId}
              setSelectedAccessCodeId={setSelectedAccessCodeId}
              isOpen={modal === 'VERIFY_ACCESS_OTP'}
              handleClose={() => setModal(null)}
              setCurrentStep={setCurrentStep}
              setModal={setModal}
            />
          </div>
        </Card>
      </div>
    </section>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  wrapper: {
    paddingBottom: '4rem',
  },
  root: {
    ...COMPONENT_WRAPPER,
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    padding: 0,
  },
  card: {
    padding: 64,
    [breakpoints.down('xs')]: {
      padding: '32px 16px',
    },
  },
  step: {
    marginBottom: 8,
  },
  title: {
    marginBottom: 8,
  },
  description: {
    marginBottom: 32,
    fontSize: 16,
    lineHeight: '24px',
  },
  successIcon: {
    marginBottom: 16,
  },
}))
