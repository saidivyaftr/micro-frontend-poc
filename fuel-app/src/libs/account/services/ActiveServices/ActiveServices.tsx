import { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ServiceTile from './serviceTile'
import ExploreAddons from './RightPanel/ExploreAddons'
import InternetServices from './InternetServices'
import VasServices from './VasServices'
import { useDispatch } from 'react-redux'
import APIClient from 'src/api-client'
import { setApiErrorCode } from 'src/redux/slicers/apiErrors'
import colors from '@/shared-ui/colors'
import { useAccountList, useActiveAccountUuid } from 'src/selector-hooks'
// import SMBCustomers from '../SMBCustomers'
import SuspendedTile from './SuspendedTile'
import DisconnectedTile from './DisconnectedTile'
import { COMPONENT_WRAPPER } from 'src/constants/'
import { Loading } from '@/shared-ui/components'
import YYTVServices from './YYTVServices'
import useAppData from '@/shared-ui/hooks/useAppData'
import VideoServiceTile from './VideoServiceTile'
import SystemError from 'src/libs/services/shared/ErrorModal'
import ApiErrorModal from 'src/libs/services/shared/ApiErrorModal'
import { siteInteractionAnalytics } from 'src/libs/services/shared/AnalyticsUtlis'

interface PageProps {
  activeAccountData: any
  isAccountDisconnected: boolean
  isAccountSuspended: boolean
}

function ActiveServices({
  activeAccountData,
  isAccountDisconnected,
  isAccountSuspended,
}: PageProps) {
  const siteCoreTextData = useAppData('suspendedDisconnect', true) || {}
  const classes = useStyles()
  const dispatch = useDispatch()
  const [internetServices, setInternetServices] = useState([])
  const [voiceServices, setVoiceServices] = useState([])
  const [addonServices, setAddonServices] = useState([])
  const [YYTVServicesData, setYYTVServicesData] = useState([])
  const [vidoeServices, setVideoServices] = useState([])
  const activeAccountUuid = useActiveAccountUuid()

  const [showLoading, setShowLoading] = useState<boolean>(true)
  const { isLoading } = useAccountList()

  useEffect(() => {
    if (activeAccountUuid) {
      getServiceData()
    }
  }, [activeAccountUuid])

  const getServiceData = async () => {
    setShowLoading(true)
    try {
      const response: any = await APIClient.getActiveServices({
        accountUuid: activeAccountUuid,
      })
      const vidoeServicesData: any = []
      const internetServicesData: any = []
      const voiceServicesData: any = []
      const addonServices: any = []
      const Yytvdata: any = []
      for (let i = 0; i < response.data.length; i++) {
        const service = response.data[i]
        switch (service.productType) {
          case 'Internet':
            internetServicesData.push(service)
            break
          case 'Video':
            vidoeServicesData.push(service)
            break
          case 'Voice':
            voiceServicesData.push(service)
            break
          case 'AddOn':
            addonServices.push(service)
            break
          case 'YouTube_TV':
            Yytvdata.push(service)
            break
        }
      }
      setVideoServices(vidoeServicesData)
      setInternetServices(internetServicesData)
      setVoiceServices(voiceServicesData)
      setAddonServices(addonServices)
      setYYTVServicesData(Yytvdata)
    } catch (error: any) {
      dispatch(
        setApiErrorCode({
          module: 'myServices',
          errorCode: error?.response?.status,
        }),
      )
    }
    setShowLoading(false)
  }

  const onClickCTA = (evar14String: string, CTAString = '') => {
    CTAString = CTAString ? CTAString : evar14String
    siteInteractionAnalytics(evar14String, CTAString)
  }
  const tabTitleAnalytics = 'active services'
  return (
    <>
      <SystemError />
      <ApiErrorModal showCloseBtn={true} />
      {showLoading || isLoading ? (
        <Loading className={classes.loaderArea} />
      ) : (
        <div className={classes.activeServicesPage}>
          <div className={classes.leftSection}>
            {isAccountSuspended && (
              <SuspendedTile textData={siteCoreTextData} />
            )}
            {isAccountDisconnected && (
              <DisconnectedTile
                status={activeAccountData?.accountStatusNew || ''}
                textData={siteCoreTextData}
              />
            )}
            {internetServices?.map((item: any) => {
              return (
                <div key={item.itemCode} className={classes.box}>
                  <InternetServices
                    data={item}
                    shouldDisableTile={isAccountSuspended}
                    onClickCTA={onClickCTA}
                    tabTitle={tabTitleAnalytics}
                  />
                </div>
              )
            })}
            {YYTVServicesData?.map((item: any) => {
              return (
                <div key={item.itemCode} className={classes.box}>
                  <YYTVServices
                    data={item}
                    shouldDisableTile={isAccountSuspended}
                    onClickCTA={onClickCTA}
                    tabTitle={tabTitleAnalytics}
                  />
                </div>
              )
            })}
            {/* <SMBCustomers /> */}

            {voiceServices?.map((item: any) => {
              return (
                <div key={item.itemCode} className={classes.box}>
                  <ServiceTile
                    productName={item.productName}
                    shouldDisableTile={isAccountSuspended}
                    onClickCTA={onClickCTA}
                    tabTitle={tabTitleAnalytics}
                  />
                </div>
              )
            })}

            {addonServices?.map((item: any) => {
              return (
                <div key={item.itemCode} className={classes.box}>
                  <VasServices
                    data={item}
                    key={item?.itemCode}
                    shouldDisableTile={isAccountSuspended}
                    onClickCTA={onClickCTA}
                    tabTitle={tabTitleAnalytics}
                  />
                </div>
              )
            })}
            {vidoeServices?.map((item: any) => (
              <div key={item.itemCode} className={classes.box}>
                <VideoServiceTile
                  data={item}
                  shouldDisableTile={isAccountSuspended}
                />
              </div>
            ))}
          </div>
          {!isAccountSuspended && !isAccountDisconnected && (
            <div className={classes.rightSection}>
              <div className={classes.box}>
                <ExploreAddons
                  onClickCTA={onClickCTA}
                  tabTitle={tabTitleAnalytics}
                />
              </div>
              {/* Do not delete Chawithus component and div */}
              {/*<div className={classes.boxchatwithus}>
            <ChatwithUs />
          </div>*/}
            </div>
          )}
        </div>
      )}
    </>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  activeServicesPage: {
    display: 'block',
    [breakpoints.up('sm')]: {
      width: '100vw',
      display: 'grid',
      gridTemplateColumns: '64% 24%',
      columnGap: '2%',
    },
    [breakpoints.up('lg')]: {
      gridTemplateColumns: '856px 316px',
    },
  },
  leftSection: {
    padding: '0 16px',
    margin: 0,
    [breakpoints.up('sm')]: {
      padding: 0,
      margin: 0,
    },
  },
  rightSection: {
    padding: '0 16px',
    margin: 0,
    [breakpoints.up('sm')]: {
      padding: 0,
      margin: 0,
    },
  },
  box: {
    backgroundColor: colors.main.white,
    width: '100%',
    borderRadius: 16,
    marginBottom: 20,
    padding: 32,
  },
  boxchatwithus: {
    backgroundColor: colors.main.white,
    width: '100%',
    minHeight: 160,
    borderRadius: 16,
    marginBottom: 20,
    padding: 30,
  },

  tileParent: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    gap: 32,
    justifyContent: 'center',
    [breakpoints.up('sm')]: {
      justifyContent: 'flex-start',
    },
  },
  loaderArea: {
    ...COMPONENT_WRAPPER,
    height: 100,
  },
}))

export default ActiveServices
