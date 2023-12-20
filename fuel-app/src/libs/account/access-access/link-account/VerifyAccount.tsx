import { Button, Typography } from '@/shared-ui/components'
import { useMemo, useState } from 'react'
import colors from '@/shared-ui/colors'
import { makeStyles } from '@material-ui/core'
import { Dropdown, Input } from 'src/ui-kit'
import { CurrentStep, ModalType } from './LinkAccountContainer'
import { AppRoutes, SITE_ERROR } from 'src/constants'
import { useRouter } from 'next/router'
import { useSelectDiscoverIdentity } from 'src/selector-hooks'
import { getAccessCodeDropdownList } from './helper'
import APIClient from 'src/api-client'
import { fetchAccounts } from 'src/redux/slicers/account'
import { useDispatch } from 'react-redux'
import { DiscoverAuthenticate } from 'src/api-client/types'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import useAppData from '@/shared-ui/hooks/useAppData'

type Method = 'PAYMENT_LAST_4' | 'ACCESS_CODE' | 'ACCOUNT_PIN' | null

const DEFAULT_DROPDOWN_OPTION = { label: 'Select one', value: '' }

export const VerifyAccount = ({
  setCurrentStep,
  setModal,
  setSelectedAccessCodeId,
}: {
  setCurrentStep: (value: CurrentStep) => void
  setModal: (value: ModalType) => void
  setSelectedAccessCodeId: (value: { id: string; token: string }) => void
}) => {
  const classes = useStyle()
  const router = useRouter()
  const dispatch = useDispatch()
  const linkAccountData = useAppData('linkAccountData', true)

  const { data } = useSelectDiscoverIdentity()

  const [selectedMethod, setSelectedMethod] = useState<Method>(null)
  const [accountPin, setAccountPin] = useState('')
  const [last4, setLast4] = useState('')
  const [selectedAccessValue, setSelectedAccessValue] = useState(
    DEFAULT_DROPDOWN_OPTION,
  )
  const [isBusy, setIsBusy] = useState(false)

  const accessCodeOptions = useMemo(() => {
    return [
      DEFAULT_DROPDOWN_OPTION,
      ...getAccessCodeDropdownList(data?.authenticationOptions || []),
    ]
  }, [data])

  const renderRadio = (checked: boolean) => {
    return checked ? (
      <div className={classes.radioButton}>
        <div className={classes.selectedItem} />
      </div>
    ) : (
      <div className={classes.radioButton} />
    )
  }

  const handleChangeClick = (value: Method) => () => {
    if (value !== selectedMethod) {
      setSelectedMethod(value)
      setAccountPin('')
      setLast4('')
      setSelectedAccessValue(DEFAULT_DROPDOWN_OPTION)
    }
  }

  const parsedAccountPin = accountPin.replace(/\D/g, '')
  const showPinError = parsedAccountPin?.length > 0
  const isValidAccountPin = parsedAccountPin?.length === 4

  const parsedLast4 = last4.replace(/\D/g, '')
  const showLast4Error = parsedLast4?.length > 0
  const isValidLast4 = parsedLast4?.length === 4

  const isValidAccessCode = Boolean(selectedAccessValue?.value)

  const queryAccountId = router?.query?.account
    ? `${router?.query?.account}`
    : undefined

  const handleContinue = async () => {
    setIsBusy(true)
    try {
      const body: DiscoverAuthenticate = {
        token: data?.token ?? '',
        apiNumber: 2,
        authentication: {
          id: '',
        },
      }
      if (selectedMethod === 'PAYMENT_LAST_4') {
        body.authentication.id = 'payment_last4'
        body.authentication.value = parsedLast4
      }
      if (selectedMethod === 'ACCOUNT_PIN') {
        body.authentication.id = 'pin'
        body.authentication.value = parsedAccountPin
      }
      if (selectedMethod === 'ACCESS_CODE') {
        body.authentication.id = selectedAccessValue.value
      }
      const response = await APIClient.discoverAuthenticate(body)
      if (selectedMethod === 'ACCESS_CODE') {
        setSelectedAccessCodeId({
          id: selectedAccessValue.value,
          token: response?.data?.token,
        })
        setModal('VERIFY_ACCESS_OTP')
      } else {
        await dispatch(fetchAccounts(queryAccountId, true, true))
        setCurrentStep('SUCCESS')
        let linkMethod = 'cc/dc'
        if (selectedMethod === 'ACCOUNT_PIN') {
          linkMethod = 'account pin'
        }
        DTMClient.triggerEvent(
          {
            events: 'event14',
            eVar14: `account access:account linked:${linkMethod}`,
          },
          'tl_o',
          `account access:account linked:${linkMethod}`,
        )
      }
    } catch (error) {
      setModal('CANT_VERIFY_ACCESS')
      DTMClient.triggerEvent(
        {
          events: 'event88',
          eVar2: 'account access:account linked',
          eVar88: 'Failed to authenticate account',
        },
        'tl_o',
        SITE_ERROR,
      )
    }
    setIsBusy(false)
  }

  const shouldShowPaymentLast4 = useMemo(
    () =>
      Boolean(
        data?.authenticationOptions?.find((x) => x.type === 'payment_last4'),
      ),
    [data],
  )

  const shouldShowAccessCode = useMemo(
    () =>
      Boolean(
        data?.authenticationOptions?.find((x) =>
          Boolean(x.telephoneNumber || x.address),
        ),
      ),
    [data],
  )

  const shouldShowPin = useMemo(
    () => Boolean(data?.authenticationOptions?.find((x) => x.type === 'pin')),
    [data],
  )

  return (
    <div>
      <div className={classes.cardContainer}>
        {/* Last 4 digits of credit card / Bank */}
        {shouldShowPaymentLast4 && (
          <div
            className={classes.card}
            onClick={handleChangeClick('PAYMENT_LAST_4')}
          >
            {renderRadio(selectedMethod === 'PAYMENT_LAST_4')}
            <div className={classes.cardContent}>
              <Typography
                styleType="p2"
                fontType="boldFont"
                className={classes.cardTitle}
              >
                {linkAccountData?.last4DigitsPayment?.value}
              </Typography>
              <div>
                <Input
                  mask="****"
                  placeholder="XXXX"
                  className={classes.inputContainer}
                  inputClassName={classes.input}
                  name="last4"
                  value={last4}
                  onChange={(event: any) => {
                    setLast4(event.target.value.replace(/\D/g, ''))
                  }}
                  helperText={
                    showLast4Error &&
                    !isValidLast4 && (
                      <Typography color="primary" styleType="p4">
                        {linkAccountData?.enterValidCreditOrBank?.value}
                      </Typography>
                    )
                  }
                  isError={showLast4Error && !isValidLast4}
                />
                <Typography styleType="p3" className={classes.disclaimer}>
                  {linkAccountData?.last4DigitsPaymentDisclaimer?.value}
                </Typography>
              </div>
            </div>
          </div>
        )}

        {/* Send an access code */}
        {shouldShowAccessCode && (
          <div
            className={classes.card}
            onClick={handleChangeClick('ACCESS_CODE')}
          >
            {renderRadio(selectedMethod === 'ACCESS_CODE')}
            <div className={classes.cardContent}>
              <Typography
                styleType="p2"
                fontType="boldFont"
                className={classes.cardTitle}
              >
                {linkAccountData?.sendAnAccessCode?.value}
              </Typography>
              <div>
                <Dropdown
                  value={selectedAccessValue}
                  options={accessCodeOptions}
                  onChange={setSelectedAccessValue}
                />
              </div>
            </div>
          </div>
        )}

        {/* Account PIN */}
        {shouldShowPin && (
          <div
            className={classes.card}
            onClick={handleChangeClick('ACCOUNT_PIN')}
          >
            {renderRadio(selectedMethod === 'ACCOUNT_PIN')}
            <div className={classes.cardContent}>
              <Typography
                styleType="p2"
                fontType="boldFont"
                className={classes.cardTitle}
              >
                {linkAccountData?.accountPin?.value}
              </Typography>
              <div>
                <Input
                  mask="****"
                  placeholder="XXXX"
                  className={classes.inputContainer}
                  inputClassName={classes.input}
                  name="pin"
                  value={accountPin}
                  onChange={(event: any) =>
                    setAccountPin(event.target.value.replace(/\D/g, ''))
                  }
                  helperText={
                    showPinError &&
                    !isValidAccountPin && (
                      <Typography color="primary" styleType="p4">
                        {linkAccountData?.enterValidAccountNumber?.value}
                      </Typography>
                    )
                  }
                  isError={showPinError && !isValidAccountPin}
                />
                <Typography
                  styleType="p3"
                  fontType="mediumFont"
                  className={classes.whereToFindLink}
                  onClick={() => setModal('FIND_PIN')}
                >
                  {linkAccountData?.whereCanIFindAccountPin?.value}
                </Typography>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className={classes.actionContainer}>
        <Button
          type="button"
          disabled={!(isValidAccessCode || isValidAccountPin || isValidLast4)}
          text={linkAccountData?.continue?.value}
          onClick={handleContinue}
          isBusy={isBusy}
        />
        <Button
          type="button"
          variant="tertiary"
          text={linkAccountData?.cancel?.value}
          onClick={() => {
            router.push(AppRoutes.AccountAccess)
          }}
          disabled={isBusy}
        />
      </div>
    </div>
  )
}

const useStyle = makeStyles(({ breakpoints }) => ({
  cardContainer: {
    display: 'flex',
    gap: 16,
    flexWrap: 'wrap',
    [breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  card: {
    display: 'flex',
    width: 'calc(50% - 8px)',
    border: `1px solid ${colors.main.borderGrey}`,
    padding: 32,
    borderRadius: 10,
    gap: 16,
    cursor: 'pointer',
    [breakpoints.down('sm')]: {
      padding: '32px 16px',
      width: '100%',
    },
  },
  radioButton: {
    height: 24,
    width: 24,
    border: `1px solid ${colors.main.dark}`,
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedItem: {
    width: 12,
    height: 12,
    backgroundColor: colors.main.dark,
    borderRadius: '50%',
  },
  cardTitle: {
    marginBottom: 8,
  },
  cardContent: {
    flex: 1,
  },
  inputContainer: {
    borderRadius: 32,
    width: '100%',
    maxWidth: 520,
  },
  input: {
    borderRadius: '32px !important',
    border: `1px solid ${colors.main.dark}`,
    '& input': {
      padding: '8px 16px',
      height: 50,
    },
    '& .MuiInputBase-root': {
      background: 'transparent',
    },
  },
  whereToFindLink: {
    marginTop: 8,
    textDecoration: 'underline',
    fontSize: 14,
    lineHeight: '18px',
    '&:hover': {
      color: colors.main.brightRed,
      cursor: 'pointer',
    },
  },
  actionContainer: {
    display: 'flex',
    gap: '1rem',
    marginTop: 32,
    [breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  disclaimer: {
    marginTop: 8,
    fontSize: 12,
    lineHeight: '14px',
  },
}))
