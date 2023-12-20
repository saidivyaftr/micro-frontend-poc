import AccountLayout from 'src/layouts/AccountLayout'
import MainLayout from 'src/layouts/MainLayout'
import { makeStyles } from '@material-ui/core'
import AccountHero from 'src/libs/account/shared/AccountHero'
import { useAccountPageLoadEvents, useCurrentAccountName } from 'src/hooks'
import { ACCOUNT_DASHBOARD, SESSION_STORAGE } from 'src/constants'
import customStaticProps from 'src/utils/appData'
import { useEffect } from 'react'
import {
  useActiveAccountId,
  useActiveAccount,
  useAccountInfoOnLoad,
  useActiveAccountUuid,
} from 'src/selector-hooks'
import { useDispatch } from 'react-redux'
import { fetchProductDetails } from 'src/redux/slicers/products'
import { useAppData } from 'src/hooks'
import {
  fetchEmailAddresses,
  fetchPhoneNumbers,
} from 'src/redux/slicers/profile'
import { fetchAvailableBills } from 'src/redux/slicers/bills'
import { fetchAccountTickets } from 'src/redux/slicers/orderTicket'
import { DashboardContainer } from 'src/libs/account/dashboard/DashboardContainer'
import colors from 'src/styles/theme/colors'
import AlertBanner from 'src/libs/account/dashboard/components/AlertBanner'
import APIClient from 'src/api-client'
import { encryptPayload, decryptPayload } from 'src/utils/secure'
interface PageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
  success: boolean
}

function DashboardPage(props: PageProps): JSX.Element {
  const classes = useStyles()
  const activeAccountId = useActiveAccountId()
  const { data: activeAccount } = useActiveAccount()
  const accountInfoOnLoad = useAccountInfoOnLoad()
  const activeAccountUuid = useActiveAccountUuid()
  const { firstName } = useCurrentAccountName()

  const dispatch = useDispatch()
  const { titleMorning, titleAfternoon, titleEvenning } = useAppData(
    'Hero',
    true,
  )

  const createICID = async (btn: string) => {
    const currentBTN = decryptPayload(
      sessionStorage.getItem(SESSION_STORAGE.BTN),
    )
    //console.log('@@ createICID', btn, currentBTN)
    if (currentBTN !== btn) {
      const icaseResponse: any = await APIClient.generateICaseId({
        btn: btn,
      })
      sessionStorage.setItem(SESSION_STORAGE.BTN, encryptPayload(btn))
      sessionStorage.setItem(SESSION_STORAGE.ICID, icaseResponse?.data.iCaseID)
    }
  }

  useEffect(() => {
    if (activeAccountId) {
      dispatch(fetchProductDetails(activeAccountId))
      dispatch(fetchPhoneNumbers(activeAccountId))
      dispatch(fetchEmailAddresses(activeAccountId))
      dispatch(fetchAvailableBills(activeAccountId))
    }
  }, [activeAccountId])

  useEffect(() => {
    if (activeAccount.id && accountInfoOnLoad.btn && !activeAccount.icaseId) {
      createICID(accountInfoOnLoad.btn)
    } else if (activeAccount.icaseId && accountInfoOnLoad.btn) {
      //console.log('@@ ICID', activeAccount.icaseId)
      sessionStorage.setItem(
        SESSION_STORAGE.BTN,
        encryptPayload(accountInfoOnLoad.btn),
      )
      sessionStorage.setItem(SESSION_STORAGE.ICID, activeAccount.icaseId)
    }
  }, [activeAccount.id, accountInfoOnLoad.btn])

  useEffect(() => {
    if (activeAccountUuid) {
      dispatch(fetchAccountTickets(activeAccountUuid))
    }
  }, [activeAccountUuid])

  useAccountPageLoadEvents(ACCOUNT_DASHBOARD, true)

  const getGreetingMessage = () => {
    const currentTime = new Date()
    const currentHour = currentTime.getHours()
    let title = ''
    if (currentHour >= 0 && currentHour < 12) {
      title = titleMorning?.value
    } else if (currentHour >= 12 && currentHour < 17) {
      title = titleAfternoon?.value
    } else {
      title = titleEvenning?.value
    }
    return title
  }

  const greetings = [
    getGreetingMessage(),
    firstName ? `<br />${firstName}` : null,
  ]
    .filter(Boolean)
    .join(', ')

  return (
    <MainLayout {...props}>
      <AccountLayout {...props} stopOverflow={false}>
        <AlertBanner />
        <AccountHero
          title={greetings}
          showAccountsDropdown
          pageContent={<DashboardContainer />}
          wrapperClassName={classes.wrapper}
        />
      </AccountLayout>
    </MainLayout>
  )
}

const useStyles = makeStyles(() => ({
  wrapper: {
    background: colors.main.dark,
  },
}))

export const getStaticProps = customStaticProps('/account/dashboard')

export default DashboardPage
