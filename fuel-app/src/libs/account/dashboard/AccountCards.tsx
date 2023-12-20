import { makeStyles } from '@material-ui/core'
import { myAccountCardData } from './mockData'
import MyAccountCard from './components/MyAccountCard'
import MyBillingCard from './components/MyBillingCard'
import MyOrdersTickets from './components/MyOrdersTickets'
import { ServiceAddress } from 'src/redux/types/accountTypes'
import { addDashes } from 'src/utils/mobile-helpers'
import { Typography } from 'src/blitz'
import {
  useActiveAccount,
  useAccountList,
  useProfileEmailAddresses,
  useProfilePhoneNumbers,
  useAccountTickets,
} from 'src/selector-hooks'
import {
  capitalizeString,
  formSingleLineAddressForServiceAddress,
} from 'src/utils/addressHelpers'
import { VacationServicesInfo } from './components/MyVacationServices'

const AccountCards = () => {
  const classes = useStyles()
  const { addressLabel, phoneLabel, emailLabel } = myAccountCardData
  const activeAccount = useActiveAccount()

  const accountList = useAccountList()
  const phoneNumber = useProfilePhoneNumbers()
  const emailAddresses = useProfileEmailAddresses()
  const accountTickets = useAccountTickets().data
  const activeAccountData = activeAccount.data
  const accountListData = accountList.data
  const activeAccountServiceDetails = accountListData.find(
    (acc) => acc.id === activeAccountData.id,
  )
  const serviceAddress =
    activeAccountServiceDetails?.serviceDetails?.details?.serviceAddress ??
    ({} as ServiceAddress)
  const isAccountCardLoading =
    activeAccount.isLoading ||
    accountList.isLoading ||
    phoneNumber?.isLoading ||
    emailAddresses?.isLoading
  const isAccountCardError =
    activeAccount.error ||
    accountList.error ||
    phoneNumber?.errorFetching ||
    emailAddresses?.errorFetching
  const serviceAddressLine = !isAccountCardLoading
    ? formSingleLineAddressForServiceAddress(serviceAddress) || ''
    : ''
  const getPrimaryPhoneNumber = () => {
    const phoneNumberVal = phoneNumber?.data?.find(
      (contact) => contact.isPrimary && contact.type == 'Mobile',
    )?.number

    return phoneNumberVal ? addDashes(phoneNumberVal) : ''
  }
  const primaryPhone = phoneNumber?.data?.find(
    (contact) => contact.isPrimary && contact.type == 'Mobile',
  )

  const primaryEmail = emailAddresses?.data?.find(
    (contact) => contact.isPrimary,
  )

  const myAccountData = {
    firstName: capitalizeString(activeAccountData.firstName) ?? '',
    lastName: capitalizeString(activeAccountData.lastName) ?? '',
    contents: [
      {
        title: addressLabel.value,
        description: (
          <Typography styleType="p2" className={classes.address}>
            <>
              {serviceAddressLine[0]}, <br /> {serviceAddressLine[1]}
            </>
          </Typography>
        ),
      },
      {
        title: phoneLabel?.value,
        isVerified: Boolean(primaryPhone?.verified),
        description: getPrimaryPhoneNumber(),
        id: primaryPhone?.id,
        type: 'Mobile',
      },
      {
        title: emailLabel?.value,
        description: primaryEmail?.address,
        isVerified: Boolean(primaryEmail?.verified),
        id: primaryEmail?.id,
        type: 'Email',
      },
    ],
  }

  return (
    <div className={classes.wrapper}>
      {accountTickets?.length > 0 && (
        <div className={classes.ticketContainer}>
          <MyOrdersTickets />
        </div>
      )}
      <VacationServicesInfo />
      <div className={classes.container}>
        <MyAccountCard
          firstName={myAccountData.firstName}
          lastName={myAccountData.lastName}
          contents={myAccountData.contents}
          className={classes.item}
          isloading={isAccountCardLoading}
          isError={isAccountCardError}
        />
        <MyBillingCard className={classes.item} />
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  wrapper: {
    position: 'relative',
  },
  container: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'space-between',
    [breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  ticketContainer: {
    marginBottom: 16,
  },
  address: {
    maxWidth: 300,
  },
  item: {
    fontSize: '18px',
    lineHeight: '26px',
    width: '50%',
    [breakpoints.down('xs')]: {
      fontSize: '16px',
      lineHeight: '24px',
      width: '100%',
    },
  },
}))

export default AccountCards
