import { ComponentStory, ComponentMeta } from '@storybook/react'
import { appConfigSlice, appDataSlice } from 'src/redux/slicers'
import store from 'src/redux/Store'
import { Provider } from 'react-redux'
import TermsModal from './TermsModal'
import { useEffect } from 'react'

export default {
  title: 'Components/TermsModal',
  component: TermsModal,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof TermsModal>

const Template: ComponentStory<typeof TermsModal> = () => {
  useEffect(() => {
    store.dispatch(appConfigSlice.actions.setConfig({ showTerms: true }))

    store.dispatch(
      appDataSlice.actions.setData({
        TermsModal: {
          fields: {
            data: {
              datasource: {
                terms: {
                  value:
                    '<h5 style="text-align: center;">Terms &amp; Conditions</h5>\n<p>For Frontier internet customers who are new to YouTube TV. This YouTube TV discount is only open to participants in the United States who have received the offer from Frontier on and after March 27, 2023. </p>\n<p>Promotional offer only available to users who are not current YouTube TV subscribers, have not been YouTube TV subscribers or participated in a YouTube TV trial before. If eligible: Frontier Internet customers will receive the standard free trial, and then a discount of $10 per month for 12 months on the standard subscription price; or Frontier Internet with current Frontier TV or Fiber TV will receive the standard free trial, and then a discount of $15 per month for 12 months on the standard subscription price offered by YouTube TV. Standard subscription price is subject to change. You will not be charged until the trial period expires. You can cancel your standard trial at no charge at any time before the trial is over. You can also cancel your YouTube TV paid membership at any time. You will continue to receive access to YouTube TV until the end of your YouTube TV billing period, but refunds and credits are not issued for partial billing periods. </p>\n<p>Offer valid for one redemption of YouTube TV discount per eligible Frontier account. Eligible participants must use the activation link provided by Frontier and complete activation through Google to claim offer. Offer requires a Google account. Promotional value of offer is non-transferable, not for resale, non-redeemable for cash and non-refundable. Must be 18 years or older. Free trial, offers or promotional offers available only for YouTube TV Base Plan. Equipment, installation and other service charges, taxes and fees extra. Frontier Internet account required. Offer and billing subject to <a href="/corporate/terms" target="_blank">Frontier Terms and Conditions</a>. Frontier reserves the right to change or cancel the offer at any time and for any reason. <a href="https://www.youtube.com/t/terms_paidservice" target="_blank">YouTube Paid Service Terms of Service</a> also apply.</p>',
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
      <TermsModal />
    </Provider>
  )
}

export const TermsModalExample = Template.bind({})
