import { ComponentStory, ComponentMeta } from '@storybook/react'
import { appConfigSlice, appDataSlice } from 'src/redux/slicers'
import store from 'src/redux/Store'
import { Provider } from 'react-redux'
import { useEffect } from 'react'
import TwoColumnLayoutWithImage from './TwoColumnLayoutWithImage'

export default {
  title: 'Components/TwoColumnLayoutWithImage',
  component: TwoColumnLayoutWithImage,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof TwoColumnLayoutWithImage>

const Template: ComponentStory<typeof TwoColumnLayoutWithImage> = () => {
  useEffect(() => {
    store.dispatch(appConfigSlice.actions.setConfig({ showTerms: true }))

    store.dispatch(
      appDataSlice.actions.setData({
        twoColumnLayoutGlobal: {
          fields: {
            data: {
              datasource: {
                title: {
                  value: 'Whole Home Wi-Fi',
                },
                image: {
                  src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/Whole-Home-Wifi/updated/Whole-home-Wi-Fi-guarantee.png?rev=b482ae68feca40f9a5e8c1e340a4f5fc',
                  alt: 'Whole Home Wifi',
                },
                mobileImage: {
                  src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/Whole-Home-Wifi/updated/Whole-home-Wi-Fi-guarantee-Mobile.png?rev=3901423776384ff288ac37fff77025f0',
                  alt: 'Whole Home Wifi',
                },
                titleColorCode: {
                  targetItem: null,
                },
                descriptionColorCode: {
                  targetItem: null,
                },
                contentBlockColorCode: {
                  targetItem: null,
                },
                tooltipColorCode: {
                  targetItem: null,
                },
                backgroundColor: {
                  targetItem: null,
                },
                description: {
                  value:
                    'Get coverage in every room of your home. Add up to two Wi-Fi extenders to your plan for just $10 per month.',
                },
                isDarkMode: {
                  value: false,
                },
                tooltipContent: {
                  value:
                    'Whole Home Wi-Fi consists of up to two Wi-Fi extenders. Equipment model and quantity will be determined at the time of installation. Coverage varies based on normal use and building conditions.',
                },
                legalText: {
                  value: '',
                },
                button: {
                  url: '',
                  text: '',
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
      <TwoColumnLayoutWithImage />
    </Provider>
  )
}

export const TermsModalTwoColumnLayoutWithImageExample = Template.bind({})
