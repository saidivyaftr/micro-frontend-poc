import { ComponentStory, ComponentMeta } from '@storybook/react'
import DownloadMobileApp from './DownloadMobileApp'
import { Provider } from 'react-redux'
import store from 'src/redux/Store'
import { appDataSlice } from 'src/redux/slicers'
import { useEffect } from 'react'

export default {
  title: 'Components/DownloadMobileApp',
  component: DownloadMobileApp,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof DownloadMobileApp>

const Template: ComponentStory<typeof DownloadMobileApp> = () => {
  useEffect(() => {
    store.dispatch(
      appDataSlice.actions.setData({
        payBillMobileApp: {
          fields: {
            data: {
              datasource: {
                title: {
                  value: 'Download the MyFrontier app',
                },
                subTitle: {
                  value:
                    'Pay your bill and manage your account anytime, anywhere with the free MyFrontier app.',
                },
                image: {
                  src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/frontier-id-registration-page/iphone-12-mini--black.png?rev=e4b42b78b05849318a435928cdb034e3',
                  alt: 'Download App',
                },
                playStoreButtonImage: {
                  src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Icons/PlayStore.png?rev=0d6097ec0bcc427cab2f13d65b2d9f6e',
                  alt: 'PlayStore',
                },
                playStoreButtonUrl: {
                  url: 'https://play.google.com/store/apps/details?id=com.frontier.selfserve',
                },
                appStoreButtonImage: {
                  src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Icons/AppStore.png?rev=596e2b656d2b400f81e4900290908da7',
                  alt: 'App Store',
                },
                appStoreButtonUrl: {
                  url: 'https://apps.apple.com/us/app/myfrontier/id978439794',
                },
              },
            },
          },
          params: {},
        },
      }),
    )
  }, [])
  return (
    <Provider store={store}>
      <DownloadMobileApp />
    </Provider>
  )
}

export const DownloadMobileAppExample = Template.bind({})
DownloadMobileAppExample.args = {}
