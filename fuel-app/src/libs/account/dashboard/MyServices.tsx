import { makeStyles } from '@material-ui/core'
import { Title } from 'src/blitz/components/Card/Card'
import colors from 'src/styles/theme/colors'
import { ArrowLink } from 'src/blitz'
import { MyServicies } from 'src/blitz/assets/react-icons'
import { AppRoutes } from 'src/constants/appRoutes'
import { useAppData } from 'src/hooks'
import {
  useAccountList,
  useActiveAccount,
  useVacationServicesInfo,
} from 'src/selector-hooks'
import { Skeleton } from '@/shared-ui/components'
import ErrorMessage from 'src/libs/account/shared/ErrorMessage'

const MyServices = () => {
  const myServicesData = useAppData('myServicesData', true)
  const DashboardData = useAppData('DashboardData', true)
  const { data: vacationServicesInfo } = useVacationServicesInfo()
  const classes = useStyles()
  const { isLoading: isAccountsLoading, error: accountsError } =
    useAccountList()
  const { isLoading: isAccountLoading, error: accountError } =
    useActiveAccount()
  const isLoading = isAccountsLoading || isAccountLoading
  const isError = accountError || accountsError

  const getServices = () => {
    return (
      <div className={classes.contentWrapper}>
        <ArrowLink
          icon={
            <MyServicies color={colors.main.black} height={32} width={32} />
          }
          label={
            vacationServicesInfo?.vacationStatus === 'On'
              ? myServicesData?.altTitle?.value
              : myServicesData?.viewActiveServices?.value
          }
          url={AppRoutes.MyServices}
          styleType="h5"
          fontType="boldFont"
          className={classes.link}
        />
      </div>
    )
  }

  return (
    <div className={classes.wrapper}>
      <Title
        className={classes.content}
        styleType="p1"
        title={myServicesData?.titleLabel?.value}
        color="tertiary"
        arrowColor={colors.main.white}
        hoverColor="secondary"
        labelLink={''}
        url={AppRoutes.MyServices}
      />
      {isLoading ? (
        <div className={classes.contentWrapper}>
          <Skeleton width={'70%'} height={30} margin={0} />
        </div>
      ) : isError ? (
        <div className={classes.contentWrapper}>
          <ErrorMessage
            message={DashboardData?.somethingWentWrong?.value}
            styleType="p2"
          />
        </div>
      ) : (
        getServices()
      )}
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  wrapper: {
    padding: '2rem 0 1rem',
    background: colors.main.dark,
  },
  content: {
    padding: '1rem 0',
  },
  contentWrapper: {
    background: colors.main.white,
    minHeight: '6rem',
    borderRadius: '1rem',
    padding: '2rem',
    [breakpoints.down('xs')]: {
      padding: `2rem 1rem`,
    },
  },
  noProductItems: {},
  link: {
    width: '100%',
    flex: 1,
  },
  serviciesWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  serviceWrapper: {
    display: 'flex',
    gap: '1rem',
  },
}))

export default MyServices
