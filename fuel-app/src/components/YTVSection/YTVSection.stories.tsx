import { ComponentStory, ComponentMeta } from '@storybook/react'
import { appConfigSlice, appDataSlice } from 'src/redux/slicers'
import store from 'src/redux/Store'
import { Provider } from 'react-redux'
import { useEffect } from 'react'
import YTVSection from './YTVSection'

export default {
  title: 'Components/YTVSection',
  component: YTVSection,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof YTVSection>

const Template: ComponentStory<typeof YTVSection> = () => {
  useEffect(() => {
    store.dispatch(appConfigSlice.actions.setConfig({ showTerms: true }))

    store.dispatch(
      appDataSlice.actions.setData({
        ytvSection: {
          fields: {
            data: {
              datasource: {
                desktopImage: {
                  src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/YTVSection/Ultra_HD_TV.png?rev=5e47994374f44c188980f4ef5dd616b5',
                  alt: 'YouTube TV',
                },
                mobileImage: {
                  src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/YTVSection/Ultra_HD_TV.png?rev=5e47994374f44c188980f4ef5dd616b5',
                  alt: 'YouTube TV',
                },
                title: {
                  value: 'Save $120 on a year of YouTube TV',
                },
                subTitle: {
                  value: '',
                },
                description: {
                  value:
                    'Frontier customers new to YouTube TV can save $10/mo. on YouTube TV for one year.<sup>2</sup> Enjoy 100+ channels of live sports, news, shows and more.',
                },
                disclaimer: {
                  value: 'Try it free. No annual contract. Cancel anytime',
                },
                firstBtn: {
                  url: '/buy',
                  text: 'check availability',
                },
                secondBtn: {
                  url: '/shop/tv',
                  text: 'LEARN MORE',
                },
                toolTipText: {
                  value: '',
                },
              },
            },
          },
          params: {},
        },
      }),
    )
  })
  return (
    <Provider store={store}>
      <YTVSection />
    </Provider>
  )
}

export const TermsModalYTVSectionExample = Template.bind({})
