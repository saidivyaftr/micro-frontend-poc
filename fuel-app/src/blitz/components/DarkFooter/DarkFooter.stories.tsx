import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Facebook, LinkedIn, Twitter, Youtube } from '@/shared-ui/react-icons'
import Footer from './DarkFooter'

export default {
  title: 'Components/DarkFooter',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Footer>

const Template: ComponentStory<typeof Footer> = (args) => <Footer {...args} />

export const DarkFooterComponent = Template.bind({})

const SUB_LINKS = [
  {
    title: 'Plans',
    href: 'https://www.google.com',
  },
  {
    title: 'Internet',
    href: 'https://www.google.com',
  },
  {
    title: 'Video/TV',
    href: 'https://www.google.com',
  },
  {
    title: 'Phone',
    href: 'https://www.google.com',
  },
  {
    title: 'Frontier Secure',
    href: 'https://www.google.com',
  },
  {
    title: 'Moving',
    href: 'https://www.google.com',
  },
  {
    title: 'Availability',
    href: 'https://www.google.com',
  },
]

const ROW_LINKS = {
  title: 'Category',
  children: SUB_LINKS,
}

DarkFooterComponent.args = {
  links: [ROW_LINKS, ROW_LINKS, ROW_LINKS, ROW_LINKS, ROW_LINKS, ROW_LINKS],
  legalText: `<p> Amazon Fire TV - 43" Omni Series 4K UHD Smart TV offered by Frontier redeemed on <a href='https://www.amazon.com/' >amazon.com</a>. <a href='https://www.amazon.com/' >Amazon.com </a> is not a sponsor of this promotion. Amazon, Fire, and all related logos are trademarks of Amazon.com, Inc. </p>

  <p>Limited time promotion based on pre-purchased inventory. For new residential customers only. No returns for cash. Pro-rated early termination fee up to $400 for Amazon TV and $100 for Logitech Webcam apply if disconnect or downgrade to lower speed. Redeem within 45 days of notification.</p>
   
  <p>Max capable download and upload speeds range from 1800 - 2000 Mbps. Requires 2 Gbps capable devices and wiring. Performance details: <a href='https://frontier.com/corporate/internet-disclosures'>frontier.com/internetdisclosures</a>. Requires Auto Pay or $5/mo. fee applies. Beginning January 2022, paper bill extra $2.99/mo., select customers excluded. A $10 fee applies when Internet is disconnected. Router return required at disconnection or up to $150 per device.  Multi-Device Security covers up to 10 devices. Other applicable charges and additional services are extra.</p> 
   
  <p>Frontier fiber‑optic phone service, including 911 service, requires electrical or battery backup power to function. During a power outage, you may not be able to make calls, including to 911, without backup power for the Residential Gateway and/or the Optical Network Terminal, or an alternate means of calling. Optional battery backup can be purchased separately at frontier.com/batterybackup. Taxes and 911 surcharges apply.</p>  
   
  <p>Subject to availability. Cannot be combined with other offers. Other restrictions, Frontier policies and service terms apply.</p>`,
  copyRights: '©2022 Frontier Communications Parent, Inc. All Rights Reserved.',
  bottomLinks: SUB_LINKS,
  socialMediaLinks: [
    {
      icon: <Twitter />,
      href: 'https://www.google.com',
    },
    {
      icon: <Facebook />,
      href: 'https://www.google.com',
    },
    {
      icon: <LinkedIn />,
      href: 'https://www.google.com',
    },
    {
      icon: <Youtube />,
      href: 'https://www.google.com',
    },
  ],
}
