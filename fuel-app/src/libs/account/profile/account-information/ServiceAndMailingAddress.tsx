import { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Typography, Button } from '@/shared-ui/components'
import {
  Edit,
  CheckboxCheck,
  CheckboxUnCheck,
} from 'src/blitz/assets/react-icons'
import {
  checkIfServiceAddressSameAsBillingAddress,
  formSingleLineAddressForServiceAddress,
} from 'src/utils/addressHelpers'
import { AccountList } from 'src/redux/types/accountTypes'
import colors from '@/shared-ui/colors'
import MailingAddressForm from './MailingAddressForm'
import { useAppData } from 'src/hooks'
import { useActiveAccount } from 'src/selector-hooks'
import { Checkbox } from 'src/ui-kit'
import ActionModal from '../../shared/modals/ActionModal'
import { PP_OBJECT_SANS } from 'src/constants/fontFamilyNames'
import APIClient from 'src/api-client'
import { useDispatch } from 'react-redux'
import { accountSlice } from 'src/redux/slicers/account'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'

const ServiceAndMailingAddress = ({
  accounts,
  accountNumber,
}: {
  accounts: AccountList
  accountNumber: string
}) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const updateMailingAddressModalData = useAppData(
    'updateMailingAddressModalData',
    true,
  )
  const accountInformationData = useAppData('accountInformationData', true)
  const { data: activeAccountData } = useActiveAccount()
  const currentAccount = accounts?.find(
    (account) => account.accountNumber === accountNumber,
  )

  const billingAddress = activeAccountData?.billingAddress
  const serviceAddress = currentAccount?.serviceDetails?.details?.serviceAddress
  const isSameAddress = checkIfServiceAddressSameAsBillingAddress(
    serviceAddress,
    billingAddress,
  )

  const [showMailingAddressForm, setShowMailingAddressForm] = useState(false)
  const [sameAddress, setSameAddress] = useState(isSameAddress)
  const [showMakeAddressSameModal, setShowMakeAddressSameModal] =
    useState(false)
  const [showLoadingModal, setShowLoadingModal] = useState(false)

  const serviceAddressLine =
    formSingleLineAddressForServiceAddress(serviceAddress) || ''
  const mailingAddressLine =
    formSingleLineAddressForServiceAddress(billingAddress) || ''

  useEffect(() => {
    reCalibrateAddresses()
  }, [isSameAddress])

  const reCalibrateAddresses = () => {
    setSameAddress(isSameAddress)
    setShowMailingAddressForm(false)
  }

  const handleMakeMailingSameAsService = async () => {
    setShowLoadingModal(true)
    const newBillingAddress = {
      street: Array.isArray(serviceAddress?.street)
        ? serviceAddress?.street
        : [serviceAddress?.street],
      city: serviceAddress?.city,
      state: serviceAddress?.state,
      zip: serviceAddress?.zip,
    }
    try {
      const response = await APIClient.updateAccountDetails(accountNumber!, {
        billingAddress: billingAddress,
        id: accountNumber,
        newBillingAddress,
      })
      await dispatch(
        accountSlice.actions.setBillingAddress(
          response?.data?.billingAddress || newBillingAddress,
        ),
      )
      setShowMakeAddressSameModal(false)

      DTMClient.triggerEvent(
        {
          events: 'event14',
          eVar14: 'my profile:account information:update mailing address',
        },
        'tl_o',
        'my profile:account information:update mailing address',
      )
    } catch (error) {}
    setShowLoadingModal(false)
  }

  return (
    <div>
      <div className={classes.section}>
        <Typography
          styleType="p2"
          fontType="boldFont"
          className={classes.sectionItem}
        >
          {accountInformationData?.serviceAddress?.value}
        </Typography>
        <Typography styleType="p2" className={classes.address}>
          <>
            {serviceAddressLine[0]}, <br /> {serviceAddressLine[1]}
          </>
        </Typography>
        <div className={classes.checkboxContainer}>
          <Checkbox
            name={
              accountInformationData?.mailingAddressSameAsServiceAddress?.value
            }
            checked={sameAddress}
            setValue={() => {
              if (isSameAddress) {
                setShowMailingAddressForm(!showMailingAddressForm)
                setSameAddress(!sameAddress)
              } else {
                setShowMakeAddressSameModal(true)
              }
              return ''
            }}
            label={
              accountInformationData?.mailingAddressSameAsServiceAddress?.value
            }
            checkedIcon={<CheckboxCheck />}
            uncheckedIcon={<CheckboxUnCheck />}
          />
        </div>
      </div>
      {showMailingAddressForm && (
        <MailingAddressForm
          accountNumber={accountNumber}
          currentAddress={
            activeAccountData?.billingAddress ||
            currentAccount?.serviceDetails?.details?.serviceAddress
          }
          handleClose={reCalibrateAddresses}
        />
      )}
      {!showMailingAddressForm && !sameAddress && (
        <div className={classes.section}>
          <Typography
            styleType="p2"
            fontType="boldFont"
            className={classes.sectionItem}
          >
            <span className={classes.editContainer}>
              {accountInformationData?.mailingAddress?.value}
              <button
                className={classes.showHideBtn}
                onClick={() => {
                  setShowMailingAddressForm(true)
                }}
              >
                <Edit />
              </button>
            </span>
          </Typography>
          <Typography styleType="p2" className={classes.address}>
            <>
              {mailingAddressLine[0]}, <br /> {mailingAddressLine[1]}
            </>
          </Typography>
        </div>
      )}
      <ActionModal
        isOpen={showMakeAddressSameModal}
        handleClose={() => setShowMakeAddressSameModal(false)}
        title={updateMailingAddressModalData?.title?.value}
        subTitle={updateMailingAddressModalData?.subTitle?.value}
        info={
          <Typography styleType="p1" fontType="boldFont">
            {serviceAddressLine.join(', ')}
          </Typography>
        }
        primaryBtnText={updateMailingAddressModalData?.primaryBtnText?.value}
        primaryBtnAction={handleMakeMailingSameAsService}
        isPrimaryBusy={showLoadingModal}
        disclaimer={
          <Button
            variant="lite"
            type="button"
            disabled={showLoadingModal}
            className={classes.secondaryBtn}
            text={updateMailingAddressModalData?.secondaryBtnText?.value}
            onClick={() => setShowMakeAddressSameModal(false)}
          />
        }
      />
    </div>
  )
}

export default ServiceAndMailingAddress

const useStyles = makeStyles(() => ({
  section: {
    marginBottom: 32,
  },
  sectionItem: {
    marginBottom: 8,
  },
  showHideBtn: {
    background: 'transparent',
    border: 0,
    '&:hover': {
      cursor: 'pointer',
      '& svg': {
        '& path': {
          fill: colors.main.brightRed,
        },
      },
    },
  },
  editContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  address: {
    maxWidth: 300,
  },
  checkboxContainer: {
    marginTop: 8,
    '& .MuiIconButton-colorPrimary': {
      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
    '& .MuiCheckbox-colorPrimary.Mui-checked': {
      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
  },
  secondaryBtn: {
    fontFamily: PP_OBJECT_SANS,
    textDecoration: 'underline',
  },
}))
