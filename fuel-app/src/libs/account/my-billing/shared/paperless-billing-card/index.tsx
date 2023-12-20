/* eslint-disable @typescript-eslint/indent */
import { makeStyles } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { Button, Skeleton, Typography } from 'src/blitz'
import { RightArrowIcon } from 'src/blitz/assets/react-icons'
import { CardWithTitle } from 'src/blitz/components/Card/Card'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import ErrorMessage from 'src/libs/account/shared/ErrorMessage'
import colors from 'src/styles/theme/colors'
import { useState } from 'react'
import Paper from 'src/blitz/assets/react-icons/paper'
import ConfirmationModal from './Confirmations'
import APIClient from '../../../../../api-client'
import { accountSlice } from 'src/redux/slicers'
import { useAccountList, useActiveAccount } from 'src/selector-hooks'
import mockData from '../../mockData'
import { pick } from 'src/utils/appData/dataExtractor'
import {
  PaperlessOff,
  PaperlessOn,
  PaperlessSaving,
  PaperlessSavingTitle,
  PaperlessSavingOff,
  SomethingWentWrong,
} from 'src/constants/billing'
import { paperBillingCard as paperBillingCardMock } from './sitecore-mock'
import useAppData from '@/shared-ui/hooks/useAppData'

const PaperLessBillingCard = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [openModal, setModalOpen] = useState<boolean>(false)
  const [updateStatus, setUpdateStatus] = useState<string>('init')
  const paperBillingCard = useAppData('paperBillingCard', true)
  const autoPayCardData = useAppData('autoPayCard')

  const billingConstantsMock = mockData.billing
  const billingConstants =
    Object.keys(autoPayCardData?.fields?.data?.datasource || {})?.length > 0
      ? autoPayCardData
      : billingConstantsMock

  const { enrollPaperLess } =
    Object.keys(paperBillingCard)?.length > 0
      ? paperBillingCard
      : paperBillingCardMock

  const { isLoading, data, error } = useActiveAccount()
  const { isLoading: isAccountListLoading } = useAccountList()

  const paperlessTurnOff = () => {
    setModalOpen(true)
    const EVENT = 'my account:disable paperless click'
    DTMClient.triggerEvent(
      {
        events: 'event14',
        eVar14: EVENT,
      },
      'tl_o',
      EVENT,
    )
  }

  const closeAndResetModal = () => {
    setModalOpen(false)
    setUpdateStatus('init')
  }

  const updatePaperlessBillPreference = async (payload: {
    amount: number | string
    paperless: boolean
  }) => {
    setModalOpen(true)
    setUpdateStatus('inprogress')
    try {
      await APIClient.postPaperlessBillPreference(data.id, payload)
      dispatch(
        accountSlice.actions.setActiveAccountDetails({
          type: 'Success',
          data: { ...data, paperless: payload.paperless },
        }),
      )
      setUpdateStatus('success')
    } catch (err) {
      setUpdateStatus('error')
    }
  }

  const confirmTurnOff = async () => {
    await updatePaperlessBillPreference({
      amount: data.paperBillFee,
      paperless: false,
    })
  }

  const enrollPaperless = async () => {
    const ENROLL_PAPERLESS_EVENT_NAME = `my account:enable paperless click`
    DTMClient.triggerEvent(
      {
        events: 'event14',
        eVar14: ENROLL_PAPERLESS_EVENT_NAME,
      },
      'tl_o',
      ENROLL_PAPERLESS_EVENT_NAME,
    )
    await updatePaperlessBillPreference({
      amount: 0,
      paperless: true,
    })
  }

  let title = ''
  if (!(isLoading || isAccountListLoading)) {
    title = data.paperless
      ? pick(PaperlessOn, billingConstants)
      : pick(PaperlessOff, billingConstants)
  }

  const ActiveCard = () => {
    return (
      <div className={classes.activeCard}>
        <Typography
          tagType="h6"
          styleType="p2"
          fontType="boldFont"
          className={classes.paperlessTitle}
        >
          {pick(PaperlessSavingTitle, billingConstants)}
        </Typography>
        <Typography className={classes.activeMsg} tagType="div" styleType="p2">
          {pick(PaperlessSaving, billingConstants)}
        </Typography>
        <div className={classes.turnOffLink} onClick={paperlessTurnOff}>
          <Typography
            tagType="h6"
            styleType="p2"
            className={classes.hoverRed}
            fontType="boldFont"
          >
            <>Turn off Paperless</>
          </Typography>
          <RightArrowIcon
            className={`${classes.hoverRed} ${classes.arrowIcon}`}
          />
        </div>
      </div>
    )
  }

  const DisabledCard = () => {
    return (
      <div className={classes.disableCard}>
        <div className={classes.disableMsg}>
          <div className={classes.paperIcon}>
            <Paper />
          </div>
          <div>
            <Typography tagType="h6" styleType="p2" fontType="boldFont">
              Here&#39;s a perk for you!
            </Typography>
            <Typography tagType="div" styleType="p2">
              {pick(PaperlessSavingOff, billingConstants)}
            </Typography>
          </div>
        </div>
        <Button
          onClick={enrollPaperless}
          type="button"
          variant="secondary"
          text={enrollPaperLess?.value}
          className={classes.enrollBtn}
        ></Button>
      </div>
    )
  }

  return (
    <>
      <ConfirmationModal
        status={updateStatus}
        currentPreference={data.paperless ? 'active' : 'disabled'}
        closeModal={closeAndResetModal}
        openModal={openModal}
        paperBillFee={data.paperBillFee}
        onConfirm={confirmTurnOff}
      />
      <CardWithTitle
        title={title}
        size="big-rectangle"
        styleType="h5"
        tagType="h5"
      >
        {isLoading || isAccountListLoading ? (
          <div className={classes.loadingCtr}>
            <Skeleton height={30} width={150} />
            <Skeleton height={50} width={250} />
          </div>
        ) : error ? (
          <ErrorMessage
            data-testid="payment-methods-card-error"
            message={pick(SomethingWentWrong, billingConstants)}
          />
        ) : (
          <div data-testid="payment-methods-card-list">
            {data && data.paperless ? <ActiveCard /> : <DisabledCard />}
          </div>
        )}
      </CardWithTitle>
    </>
  )
}

export default PaperLessBillingCard

const useStyles = makeStyles(({ breakpoints }) => ({
  loadingCtr: {
    padding: '2rem 0',
  },
  linkCtr: {
    justifyContent: 'unset',
  },
  link: {
    padding: '1rem 0',
  },
  activeMsg: {
    margin: '1rem 0 1rem 0',
  },
  activeCard: {
    marginTop: '1rem',
    '& h6': {
      margin: 0,
      [breakpoints.down('sm')]: {
        lineHeight: '1.125rem',
      },
    },
  },
  disableCard: {
    '& h6': {
      margin: 0,
      [breakpoints.down('sm')]: {
        lineHeight: '1.125rem',
      },
    },
  },
  disableMsg: {
    display: 'flex',
    alignItems: 'center',
    margin: '1rem 0 2rem 0',
    padding: '1rem 0.5rem',
    background: colors.main.secondaryLight,
    borderRadius: '1rem',
  },
  enrollBtn: {
    padding: '0.75rem 2rem',
  },
  paperIcon: {
    height: '2.5rem',
    width: '2.5rem',
    marginRight: '0.5rem',
  },
  arrowIcon: {
    height: '0.9rem',
    width: '1.2rem',
    marginLeft: '0.6rem',
  },
  turnOffLink: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    '& h6': {
      margin: 0,
    },
    '&:hover': {
      '& $hoverRed': {
        color: 'red',
      },
    },
  },
  hoverRed: {},
  paperlessTitle: {
    margin: '.5rem 0',
  },
}))
