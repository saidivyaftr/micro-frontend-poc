import { ComponentStory, ComponentMeta } from '@storybook/react'
import FourTiles from './FourTiles'
import { PayBill, Account, Mail, Help } from '@/shared-ui/react-icons'

export default {
  title: 'Components/FourTiles',
  component: FourTiles,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof FourTiles>

const Template: ComponentStory<typeof FourTiles> = (args) => (
  <FourTiles {...args} />
)

const TWO_TILES = [
  {
    title: 'Pay Your Bill',
    description: 'Make a payment or set up Auto Pay',
    icon: <PayBill />,
    href: 'https://www.google.com',
  },
  {
    title: 'View Your Account',
    description: 'Manage your Frontier account and services',
    icon: <Account />,
    href: 'https://www.google.com',
  },
]

const THREE_TILES = [
  ...TWO_TILES,
  {
    title: 'Check Your Mail',
    description: 'Log in to your Frontier Yahoo Mail account',
    icon: <Mail />,
    href: 'https://www.google.com',
  },
]

const TILES = [
  ...THREE_TILES,
  {
    title: 'Visit Our Help Center',
    description: 'Get support and find answers to common questions',
    icon: <Help />,
    href: 'https://www.google.com',
  },
]

export const FourTilesLight = Template.bind({})
FourTilesLight.args = {
  type: 'light',
  textAlign: 'left',
  mobileOneCol: true,
  tiles: TILES,
}

export const FourTilesActionsLight = Template.bind({})
FourTilesActionsLight.args = {
  type: 'light',
  textAlign: 'left',
  mobileOneCol: true,
  tiles: TILES,
  hoverStyle: 'primary',
  renderData: (index: number) => <div>Additional Content {index + 1}</div>,
}

export const FourTilesDark = Template.bind({})

FourTilesDark.args = {
  type: 'dark',
  textAlign: 'left',
  mobileOneCol: true,
  tiles: TILES,
}

export const FourTilesRed = Template.bind({})

FourTilesRed.args = {
  type: 'red',
  textAlign: 'left',
  mobileOneCol: true,
  tiles: TILES,
}

export const FourTilesTwo = Template.bind({})

FourTilesTwo.args = {
  type: 'dark',
  textAlign: 'left',
  mobileOneCol: true,
  tiles: TWO_TILES,
}

export const FourTilesThree = Template.bind({})

FourTilesThree.args = {
  type: 'dark',
  textAlign: 'left',
  mobileOneCol: true,
  tiles: THREE_TILES,
}

export const FourTilesTwoLight = Template.bind({})

FourTilesTwoLight.args = {
  type: 'light',
  textAlign: 'left',
  mobileOneCol: true,
  tiles: TWO_TILES,
}

export const FourTilesThreeLight = Template.bind({})

FourTilesThreeLight.args = {
  type: 'light',
  textAlign: 'left',
  mobileOneCol: true,
  tiles: THREE_TILES,
}
