import { ComponentStory, ComponentMeta } from '@storybook/react'
import TrackOrders from './TrackOrders'

export default {
  title: 'Components/TrackOrders',
  component: TrackOrders,
} as ComponentMeta<typeof TrackOrders>

const Template: ComponentStory<typeof TrackOrders> = (args) => (
  <div style={{ maxWidth: 1200 }}>
    <TrackOrders {...args} />
  </div>
)

export const TrackOrdersComponent = Template.bind({})

TrackOrdersComponent.args = {
  title: 'Download the MyFrontier app',

  subTitle: 'Get the app to manage your installation',

  imgSrc: {
    value:
      'https://content-qat.frontier.com/-/jssmedia/Project/Frontier/Dotcom/Images/Help-Center/Images/frontier-installation/iphone-12-mini--screen.svg?rev=0051d07bfc4d49cbaa335826ba439315',
  },
  points: [
    'Communicate with your tech',
    'Estimate your tech’s arrival time',

    'Modify your appointment date and time',
  ],

  appStoreUrl: 'https://apps.apple.com/us/app/myfrontier/id978439794',

  playStoreUrl:
    'https://play.google.com/store/apps/details?id=com.frontier.selfserve&hl=en_US&gl=US',
}

export const TrackOrdersDarkComponent = Template.bind({})

TrackOrdersDarkComponent.args = {
  ...TrackOrdersComponent.args,
  // backgroundColor: '#141928',
  // cardBackgroundColor: '#2D3548',
  // paginationColor: '#FFFFFF',
  // titleColor: '#96FFF5',
  // cardTitleColor: '#FFFFFF',
  // legalTextColor: '#FFFFFF',
  // titleTagName: 'h2',
}
