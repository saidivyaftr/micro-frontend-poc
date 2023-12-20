import MainLayout from 'src/layouts/MainLayout'
import customStaticProps from 'src/utils/appData'
import WelcomeContainer from 'src/libs/account/welcome/WelcomeContainer'
import { useIsServicesLoading } from 'src/selector-hooks'
import { makeStyles } from '@material-ui/core'
import { Loading } from '@/shared-ui/components'
import { useEffect } from 'react'
import { fetchServicesForWelcomePage } from 'src/redux/slicers/welcome'
import { useDispatch } from 'react-redux'

interface PageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
  success: boolean
}

function WelcomePage(props: PageProps): JSX.Element {
  const classes = useStyles()
  const dispatch = useDispatch()
  const isServicesLoading = useIsServicesLoading()

  useEffect(() => {
    dispatch(fetchServicesForWelcomePage())
  }, [])

  return (
    <MainLayout {...props} miniFooter>
      {!isServicesLoading ? (
        <div className={classes.welcomeContainerCSS}>
          <WelcomeContainer />
        </div>
      ) : (
        <div className={classes.loader}>
          <Loading className={classes.loading} />
        </div>
      )}
    </MainLayout>
  )
}

const useStyles = makeStyles(() => ({
  loader: {
    minHeight: 'calc(100vh - 195px)',
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
  welcomeContainerCSS: {
    minHeight: 'calc(100vh - 195px)',
  },
}))
export const getStaticProps = customStaticProps('/account/welcome')

export default WelcomePage
