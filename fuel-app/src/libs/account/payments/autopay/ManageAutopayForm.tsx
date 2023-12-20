/* eslint-disable @typescript-eslint/indent */
import { useEffect, useState } from 'react'
import { Button } from '@material-ui/core'
import { useRouter } from 'next/router'
import css from './manage-autopay-form.module.scss'
import { MANAGE_AUTO_PAY, SITE_ERROR } from 'src/constants'
import { AppRoutes } from 'src/constants/appRoutes'
import AutopayModal from './AutopayModal'
import AutoPayForm from './AutoPayForm'
import { useDispatch } from 'react-redux'
import { fetchAutopayDetails } from 'src/redux/slicers/payment'
import { Loading } from 'src/blitz'
import { Info } from '../../shared/Info'
import APIClient from 'src/api-client'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import { partitionAutopayTypes } from '../util'
import {
  useActiveAccount,
  useActiveAccountId,
  useAutopayDetails,
} from 'src/selector-hooks'

const ManageAutoPayForm = (): JSX.Element => {
  const router = useRouter()
  const [type, setType] = useState<'View' | 'Edit'>('View')
  const [cancelModal, setCancelModal] = useState<boolean>(false)
  const [isCancelInprogress, setCancelProgress] = useState<boolean>(false)
  const [autopayError, setAutopayError] = useState<string>('')
  const [cancelType, setCancelType] = useState<string>('')
  const dispatch = useDispatch()

  const accountDetails = useActiveAccount()
  const autopayType = accountDetails.data.autopayType
  const activeAccountId = useActiveAccountId()
  const autopayDetails = useAutopayDetails()
  const [dstDetails, dpiDetails] = partitionAutopayTypes(autopayDetails.data)

  const toConfirmAutopay = (type: string): void => {
    router.push(
      {
        pathname: AppRoutes.AutopayConfirmationPage,
        query: { type },
      },
      AppRoutes.AutopayConfirmationPage,
    )
  }

  const onCancelAutopay = async () => {
    try {
      setCancelProgress(true)
      await APIClient.deleteAutoPayDetails(activeAccountId, cancelType)
      toConfirmAutopay('cancel')
      DTMClient.triggerEvent(
        {
          events: 'event14',
          eVar14: 'my profile:account information:delete autopay details',
        },
        'tl_o',
        'my profile:account information:update language preference',
      )
    } catch (err) {
      DTMClient.triggerEvent(
        {
          events: 'event88',
          eVar2: 'my profile:account information:delete autopay details',
          eVar88: 'Failed to delete autopay details',
        },
        'tl_o',
        SITE_ERROR,
      )
      setAutopayError('Something went wrong, please try again !')
      setCancelProgress(false)
      setCancelModal(true)
    }
  }

  if (!autopayType || autopayType === 'false') {
    router.push(AppRoutes.AutoPaySignUpPage)
  }

  useEffect(() => {
    if (autopayType && autopayType !== 'false')
      dispatch(fetchAutopayDetails(activeAccountId, String(autopayType)))
  }, [])

  if (autopayDetails.isLoading) return <Loading />

  if (autopayDetails.error)
    return <Info type="error" message="Failed to Fetch the Auto Pay details." />

  return (
    <>
      <header className={css.autopayHeader}>
        <section className={`${css.flex} ${css.alignCenter}`}>
          <h3 className={`${css.autopayTitle} `}>{MANAGE_AUTO_PAY}</h3>
        </section>
        <Button
          className={css.autopayHeaderButton}
          onClick={() => (type === 'View' ? setType('Edit') : setType('View'))}
          disableRipple
          disableTouchRipple
        >
          {type === 'View' ? 'Edit' : 'Cancel'}
        </Button>
      </header>
      <AutopayModal
        inProgress={isCancelInprogress}
        cancelConfirmation={!isCancelInprogress}
        open={cancelModal}
        onClose={() => setCancelModal(false)}
        onSubmit={onCancelAutopay}
        error={autopayError}
      />
      {dstDetails && (
        <>
          <AutoPayForm
            type={type}
            onCancel={() => {
              setType('View')
            }}
            paymentMethod={
              typeof dstDetails?.paymentMethod === 'object'
                ? dstDetails?.paymentMethod.name
                : dstDetails?.paymentMethod
            }
          />
          <section className={css.autopayFooterLinkWrapper}>
            {type === 'View' && (
              <a
                className={css.autopayFooterLink}
                onClick={() => {
                  setCancelModal(true)
                  setCancelType(dstDetails.id)
                }}
              >
                Cancel auto pay
              </a>
            )}
          </section>
        </>
      )}
      {dpiDetails && (
        <>
          <AutoPayForm
            type={'View'}
            onCancel={() => {
              setType('View')
            }}
            paymentMethod={
              typeof dpiDetails?.paymentMethod === 'object'
                ? dpiDetails?.paymentMethod.name
                : dpiDetails?.paymentMethod
            }
          />
          <section className={css.autopayFooterLinkWrapper}>
            {type === 'View' && (
              <a
                className={css.autopayFooterLink}
                onClick={() => {
                  setCancelModal(true)
                  setCancelType('DPI')
                }}
              >
                Cancel auto pay
              </a>
            )}
          </section>
        </>
      )}
    </>
  )
}

export default ManageAutoPayForm
