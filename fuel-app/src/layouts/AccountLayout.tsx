import colors from '@/shared-ui/colors'
import { makeStyles } from '@material-ui/core'
import { useRouter } from 'next/router'
import { useEffect, useLayoutEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Loading } from 'src/blitz'
import { appDataSlice } from 'src/redux/slicers'
import {
  fetchAccounts,
  fetchAccountDetails,
  accountSlice,
  fetchAccountDetailsbyUUID,
  fetchAccountVacationServicesbyUUID,
} from 'src/redux/slicers/account'
import {
  // useActiveAccount,
  useActiveAccountId,
  useActiveAccountUuid,
  useSessionState,
} from 'src/selector-hooks'
// import { UNABLE_TO_RETRIEVE_DATA_FROM_FAKE_LOGIN } from '../constants'
import VacationServices from 'src/libs/account/common/VacationServices'
import { AppRoutes } from 'src/constants'
interface PageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
  success: boolean
  children: any
  pageTitle?: string
  stopOverflow?: boolean
}

const AccountLayout = ({
  data,
  children,
  stopOverflow = true,
}: PageProps): JSX.Element => {
  const classes = useStyles(stopOverflow)()
  const dispatch = useDispatch()
  const router = useRouter()
  const queryAccountId = router?.query?.account
    ? `${router?.query?.account}`
    : undefined

  const { isLoading: isAuthenticating, sessionValid } = useSessionState()
  // const activeAccount = useActiveAccount()
  const activeAccountId = useActiveAccountId()
  const activeAccountUuid = useActiveAccountUuid()
  const isAuthenticated = !isAuthenticating && sessionValid
  const showLoader = isAuthenticating
  // const hasActiveAccount =
  //   isAuthenticated && Object.keys(activeAccount.data).length > 0

  // Updating data to redux store
  useEffect(() => {
    dispatch(appDataSlice.actions.setData(data))
  }, [data])

  useLayoutEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchAccounts(queryAccountId))
      localStorage.removeItem(`redirectTo`)
    }
  }, [queryAccountId, isAuthenticated])

  useLayoutEffect(() => {
    const id = queryAccountId ? queryAccountId : activeAccountId
    if (queryAccountId && queryAccountId !== activeAccountId) {
      dispatch(
        accountSlice.actions.setActiveAccountId({ accountId: queryAccountId }),
      )
      return
    }
    if (id) {
      dispatch(fetchAccountDetails(id))
    }
  }, [queryAccountId, activeAccountId])

  useEffect(() => {
    if (activeAccountUuid) {
      dispatch(fetchAccountDetailsbyUUID(activeAccountUuid))
      dispatch(fetchAccountVacationServicesbyUUID(activeAccountUuid))
    }
  }, [activeAccountUuid])

  if (!isAuthenticating && !isAuthenticated) {
    if (window.location.href.includes(AppRoutes.MyServicesAddons)) {
      localStorage.setItem('redirectTo', AppRoutes.MyServicesAddons)
    }
    router.push('/login')
    return <></>
  }

  if (showLoader) {
    return (
      <div className={classes.loader}>
        <Loading className={classes.loading} />
      </div>
    )
  }
  return (
    <>
      <div className={`${classes.main}`}>{children}</div>
      <VacationServices />
    </>
  )

  // TODO: IMplement this back after migration wrap up
  // return <Info message={UNABLE_TO_RETRIEVE_DATA_FROM_FAKE_LOGIN} />
}

export default AccountLayout

const useStyles = (stopOverflow: boolean) =>
  makeStyles(() => ({
    loader: {
      minHeight: 'calc(100vh - 400px)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    loading: {
      margin: 0,
      width: 'auto',
      height: 'auto',
      display: 'block',
    },
    main: {
      minHeight: 'calc(100vh - 400px)',
      overflowX: stopOverflow ? 'hidden' : 'initial',
      backgroundColor: colors.main.newBackgroundGray,
    },
  }))
