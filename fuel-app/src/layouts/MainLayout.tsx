import { useEffect, useMemo, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { useDispatch } from 'react-redux'
import LinearProgress from '@material-ui/core/LinearProgress'
import { makeStyles } from '@material-ui/core'
import { appDataSlice } from 'src/redux/slicers'
import clx from 'classnames'
import {
  useAppData,
  useIsLoadingFromApp,
  useMainLayoutEffects,
} from 'src/hooks'
import Alerts from 'src/components/Alerts'

const RenderChat = dynamic(() => import('src/utils/RenderChat'))

//@ts-ignore
import SmartBanner from 'react-smartbanner'
import { getSmartBannerUrlMap } from 'src/utils/deepLink'

const SomethingWrong = dynamic(() => import('src/components/SomethingWrong'))
const PageHead = dynamic(() => import('src/components/PageHead'))
const NewFooter = dynamic(() => import('src/components/NewFooter'))
import NewHeader from 'src/components/NewHeader'

interface PageProps {
  data: any
  success: boolean
  children: any
  showChat?: boolean
  showDotcomChatbot?: boolean
  showSmartBanner?: boolean
  miniFooter?: boolean
  hideLoader?: boolean
  hideFooter?: boolean
  hideHeader?: boolean
}

const Layout = ({
  data,
  success,
  children,
  showChat = true,
  miniFooter,
  hideHeader = false,
  hideFooter = false,
}: PageProps): JSX.Element => {
  const [isLoading, setIsLoading] = useState(true)
  const isFromMobileApp = useIsLoadingFromApp()
  const bannerRef = useRef<HTMLDivElement>(null)
  const classes = useStyles()
  const dispatch = useDispatch()
  const {
    showSmartBanner: smartBanner,
    title,
    author,
    redirectUrl,
  }: any = useAppData('smartBanner', true)

  const { chatType } = useMainLayoutEffects({ showChat, isLoading })

  // Updating data to redux store
  useEffect(() => {
    dispatch(appDataSlice.actions.setData(data))
    setIsLoading(false)
  }, [dispatch, data])

  // TODO:Used only in resource pages  Use latest alert component
  const legacyAlerts = data?.alerts?.fields?.data?.datasource

  const showSmartBanner = useMemo(
    () => !isFromMobileApp && smartBanner?.value,
    [isFromMobileApp, smartBanner],
  )
  const bannerHeight = bannerRef?.current?.getBoundingClientRect()?.top || 0

  if (isLoading) return <LinearProgress />

  if (!success) return <SomethingWrong />
  return (
    <>
      <PageHead />
      {showSmartBanner && (
        <div ref={bannerRef}>
          <SmartBanner
            title={title?.value}
            daysHidden={60}
            daysReminder={0}
            position={'top'}
            author={author?.value}
            url={redirectUrl?.value && getSmartBannerUrlMap(redirectUrl.value)}
          />
        </div>
      )}
      {!hideHeader && (
        <NewHeader alertData={legacyAlerts} smartBanner={bannerHeight} />
      )}

      <div
        className={clx(classes.main, {
          [classes.marginZero]: hideHeader,
        })}
      >
        <Alerts />
        {children}
      </div>
      {!hideFooter && <NewFooter miniFooter={miniFooter} />}
      <RenderChat chatType={chatType} />
    </>
  )
}

export default Layout

const useStyles = makeStyles(({ breakpoints }) => ({
  main: {
    marginTop: 39,
    [breakpoints.down('sm')]: {
      marginTop: 0,
    },
  },
  marginZero: {
    marginTop: 0,
  },
}))
