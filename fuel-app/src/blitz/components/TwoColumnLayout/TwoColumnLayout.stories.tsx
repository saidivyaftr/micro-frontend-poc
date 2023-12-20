import { Meta } from '@storybook/react/types-6-0'
import { Story } from '@storybook/react'
import TwoColumnLayout, { TwoColumnLayoutProps } from '.'

export default {
  title: 'Components/TwoColumnLayout',
  component: TwoColumnLayout,
} as Meta

// Create a master template for mapping args to render the Button component
const Template: Story<TwoColumnLayoutProps> = (args) => {
  return <TwoColumnLayout {...args} />
}

export const TwoCardLayout = Template.bind({})
TwoCardLayout.args = {
  content: (
    <div style={{ padding: '40px' }}>
      Work, live and play how you want with the power of our 100% fiber-optic
      network.
    </div>
  ),
  image:
    'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/5-gig/4_5gig_ytyv_xl.png?rev=3fc9384e96c147858c34b1258d9ddbf8',
  mobileImage:
    'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/5-gig/4_5gig_yttv_xs.png?rev=8da214d7e5de46f7b40ceab3df9a82ba',
}

export const TwoCardLayoutWithMobileReverse = Template.bind({})
TwoCardLayoutWithMobileReverse.args = {
  ...TwoCardLayout.args,
  mobileReverse: true,
  reverse: true,
}

export const TwoCardLayoutWithRoundedBorders = Template.bind({})
TwoCardLayoutWithRoundedBorders.args = {
  ...TwoCardLayout.args,
  mobileReverse: true,
  reverse: true,
  roundedBorders: true,
}
