import { ComponentStory, ComponentMeta } from '@storybook/react'
import TrophyCase from './TrophyCase'

export default {
  title: 'Components/TrophyCase',
  component: TrophyCase,
} as ComponentMeta<typeof TrophyCase>

const Template: ComponentStory<typeof TrophyCase> = (args) => (
  <div style={{ maxWidth: 1200 }}>
    <TrophyCase {...args} />
  </div>
)

export const TrophyCaseComponent = Template.bind({})

TrophyCaseComponent.args = {
  title: 'Headline goes here',
  cards: [
    {
      title: 'Best Unlimited Internet Plans With No Data Caps<sup>1</sup>',
      imageSrc:
        'https://vsgprdstopaasrg-151210-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/twoColumnLayoutGlobal/ookla-with-background.png?rev=c69a18a081b24611af5b49b9815642cd',
      toolTipText:
        'Best Unlimited Internet Plans With No Data Caps<sup>1</sup>',
    },
    {
      title: 'Fastest upload speeds in America',
      imageSrc:
        'https://vsgprdstopaasrg-151210-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/fiber-2-gigabit-internet/updated/compare-2.png?rev=7893e0a51bcd4529805fc22ebdbdd41a',
    },
    {
      title: 'Work from home like a pro',
      imageSrc:
        'https://vsgprdstopaasrg-151210-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/fiber-2-gigabit-internet/updated/compare-1.png?rev=e7cd76761f174b60baf99b84eefef8ca',
    },
  ],
  legal: `
  <div>
    <div>[1] Source: https://www.cnet.com/home/internet/best-internet-providers-with-no-data-caps/</div>
    <div>[2] Best Internet Service Providers of 2022, U.S. News & World Report 360 Review.</div>
  </div>`,
}

export const TrophyCaseDarkComponent = Template.bind({})

TrophyCaseDarkComponent.args = {
  ...TrophyCaseComponent.args,
  backgroundColor: '#141928',
  cardBackgroundColor: '#2D3548',
  paginationColor: '#FFFFFF',
  titleColor: '#96FFF5',
  cardTitleColor: '#FFFFFF',
  legalTextColor: '#FFFFFF',
  titleTagName: 'h2',
}
