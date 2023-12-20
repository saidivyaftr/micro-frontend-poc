import { makeStyles } from '@material-ui/core'
import PromotionalCard from './components/PromotionalCard'
import { useAppData } from 'src/hooks'
import { useActiveAccount, useAccountList } from 'src/selector-hooks'
import ErrorMessage from 'src/libs/account/shared/ErrorMessage'
import { Skeleton } from '@/shared-ui/components'
import { isAutoPayEnabled } from 'src/libs/account/helper'
import { Title } from 'src/blitz/components/Card/Card'
import { useState } from 'react'
import ConfirmationModal from 'src/libs/account/my-billing/shared/paperless-billing-card/Confirmations'
import APIClient from 'src/api-client'
import { useDispatch } from 'react-redux'
import { accountSlice } from 'src/redux/slicers'
import colors from '@/shared-ui/colors'
import { SITE_ERROR } from 'src/constants'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'

const PromotionalCards = () => {
  const dispatch = useDispatch()
  const PromotionalCardsData = useAppData('PromotionalCardsData', true)
  const DashboardData = useAppData('DashboardData', true)
  const { isLoading: isAccountsLoading } = useAccountList()
  const {
    isLoading: accountLoading,
    data: activeAccount,
    error: accountError,
  } = useActiveAccount()
  const [openModal, setModalOpen] = useState<boolean>(false)
  const [updateStatus, setUpdationStatus] = useState<string>('init')
  const isAutoPayOn = isAutoPayEnabled(activeAccount.autopayType)
  const isPaperlessEnabled = activeAccount && activeAccount.paperless
  const isLoading = isAccountsLoading || accountLoading
  const hasError = accountError
  const styles = useStyles()
  const updatePaperlessBillPreference = async (payload: {
    amount: number | string
    paperless: boolean
  }) => {
    setModalOpen(true)
    setUpdationStatus('inprogress')
    try {
      await APIClient.postPaperlessBillPreference(activeAccount.id, payload)
      dispatch(
        accountSlice.actions.setActiveAccountDetails({
          type: 'Success',
          data: { ...activeAccount, paperless: payload.paperless },
        }),
      )
      DTMClient.triggerEvent(
        {
          events: 'event88',
          eVar2: 'account access:paperless billing',
          eVar88: 'Failed to update user',
        },
        'tl_o',
        SITE_ERROR,
      )
      if (!payload.paperless) {
        setUpdationStatus('success')
      }
      if (payload.paperless) {
        setUpdationStatus('success')
      }
    } catch (err) {
      setUpdationStatus('error')
      DTMClient.triggerEvent(
        {
          events: 'event88',
          eVar2: 'account access:paperless billing',
          eVar88: 'Failed to update paperless billing',
        },
        'tl_o',
        SITE_ERROR,
      )
    }
  }

  const confirmTurnOff = async () => {
    await updatePaperlessBillPreference({
      amount: activeAccount.paperBillFee,
      paperless: false,
    })
  }
  const closeAndResetModal = () => {
    setModalOpen(false)
    setUpdationStatus('init')
  }

  const enrollPaperless = async (event: any) => {
    event.preventDefault()
    await updatePaperlessBillPreference({
      amount: 0,
      paperless: true,
    })
  }
  const filteredCards = PromotionalCardsData?.cards?.list
    ?.filter((item: any) => {
      return !(
        (item?.id?.value == 'autopay' && isAutoPayOn) ||
        (item?.id?.value == 'paperless' && isPaperlessEnabled)
      )
    })
    .slice(0, 3)
  return (
    <>
      <ConfirmationModal
        status={updateStatus}
        currentPreference="active"
        closeModal={closeAndResetModal}
        openModal={openModal}
        paperBillFee={activeAccount.paperBillFee}
        onConfirm={confirmTurnOff}
      />
      <div className={styles.wrapper}>
        <Title
          className={styles.content}
          styleType="p1"
          title={PromotionalCardsData?.titleLabel?.value}
          color="tertiary"
          hoverColor="tertiary"
        />
        {isLoading ? (
          <>
            <Skeleton height={30} width="100%" />
            <Skeleton height={30} width="100%" />
          </>
        ) : hasError ? (
          <ErrorMessage
            messageClass={styles.Error}
            data-testid="autopay-card-error"
            message={DashboardData?.somethingWentWrong?.value}
          />
        ) : (
          <div className={styles.subContainer}>
            {filteredCards?.map((item: any, index: number) => (
              <PromotionalCard
                disableLink={item?.id?.value == 'paperless'}
                enrollPaperless={enrollPaperless}
                key={index}
                {...item}
              />
            ))}
          </div>
        )}
      </div>
    </>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  wrapper: {
    marginTop: 48,
    paddingBottom: 120,
    [breakpoints.down('xs')]: {
      marginTop: 32,
    },
  },
  content: {
    padding: '1rem 0',
  },
  subContainer: {
    display: 'grid',
    rowGap: '1rem',
    columnGap: '1rem',
    height: '100%',
    [breakpoints.up('sm')]: {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
    [breakpoints.down('sm')]: {},
    gridTemplateColumns: 'repeat(1, 1fr)',
  },
  Error: {
    color: colors.main.white,
  },
}))

export default PromotionalCards
