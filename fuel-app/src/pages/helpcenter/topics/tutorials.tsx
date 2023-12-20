import { Fragment } from 'react'
import {
  VISITOR,
  UNVERIFIED_SERVICE_AREA,
  COMPONENT_WRAPPER,
} from 'src/constants'
import customStaticProps from 'src/utils/appData'
import { usePageLoadEvents } from 'src/hooks'
import Hero from 'src/libs/helpcenter/category/article/components/Hero'
import WebClient from 'src/libs/helpcenter/category/article/components/WebClient'
//@ts-ignore
import MainLayout from '@/shared-ui/layouts/main'
import { makeStyles } from '@material-ui/core'
interface PageProps {
  data: any
  success: boolean
}

function SSR(props: PageProps): JSX.Element {
  const styles = useStyles()
  usePageLoadEvents({
    shouldTriggerDTMEvent: true,
    eventData: {
      pageName: `ftr:/helpcenter/topics/tutorials`,
      eVar22: VISITOR,
      eVar49: UNVERIFIED_SERVICE_AREA,
    },
  })

  // Fixed layout items
  const { hero, webClient } = props.data
  const getComponentData = (key: any) => {
    return key?.fields?.data?.datasource || {}
  }
  console.log(getComponentData(hero))
  return (
    <Fragment>
      <MainLayout {...props}>
        <Hero data={getComponentData(hero)} />
        <div className={styles.root}>
          <WebClient data={getComponentData(webClient)} />
        </div>
      </MainLayout>
    </Fragment>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    ...COMPONENT_WRAPPER,
    [breakpoints.down('sm')]: {
      padding: '0px',
    },
  },
}))

// Need to use server side props for dynamic pages
export const getStaticProps = customStaticProps('/helpcenter/topics/tutorials')
export default SSR
