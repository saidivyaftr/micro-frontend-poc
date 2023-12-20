import { ComponentStory, ComponentMeta } from '@storybook/react'
import AwardCarousel from './AwardCarousel'

export default {
  title: 'Components/AwardCarousel',
  component: AwardCarousel,
} as ComponentMeta<typeof AwardCarousel>

const Template: ComponentStory<typeof AwardCarousel> = (args) => (
  <div style={{ maxWidth: 1200 }}>
    <AwardCarousel {...args} />
  </div>
)

export const AwardCarouselComponent = Template.bind({})

AwardCarouselComponent.args = {
  cards: [
    {
      title: 'Best Fiber Internet Providers of 2023',
      subTitle:
        'Based on analysis by Ookla® of Speedtest Intelligence® data for aggregated median upload speed in the United States, Q1 2023.',
      imageSrc:
        'https://vsgprdstopaasrg-151210-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/twoColumnLayoutGlobal/ookla-with-background.png?rev=c69a18a081b24611af5b49b9815642cd',
      legal: `Source: <a style=\"color: rgb(255, 255, 255);\" href=\"https://www.cnet.com/home/internet/best-internet-providers-with-no-data-caps/\" target=\"_blank\">https://www.cnet.com/home/internet/best-internet-providers-with-no-data-caps/</a>`,
    },
    {
      title: 'Fastest upload speeds in America',
      subTitle:
        'Based on analysis by Ookla® of Speedtest Intelligence® data for aggregated median upload speed in the United States, Q1 2023.',
      imageSrc:
        'https://vsgprdstopaasrg-151210-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/fiber-2-gigabit-internet/updated/compare-2.png?rev=7893e0a51bcd4529805fc22ebdbdd41a',
    },
    {
      title: 'Work from home like a pro',
      subTitle:
        'Based on analysis by Ookla® of Speedtest Intelligence® data for aggregated median upload speed in the United States, Q1 2023.',
      imageSrc:
        'https://vsgprdstopaasrg-151210-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/fiber-2-gigabit-internet/updated/compare-1.png?rev=e7cd76761f174b60baf99b84eefef8ca',
      legal: `<div>https://www.cnet.com/home/internet/best-internet-providers-with-no-data-caps</div>`,
    },
  ],
  cardTitleTagName: 'h2',
  cardTitleStyleName: 'h3',
  cardSubTitleTagName: 'p',
  cardSubTitleStyleName: 'p1',
  cardSubTitleColor: '#141928',
}

export const AwardCarouselDarkComponent = Template.bind({})

AwardCarouselDarkComponent.args = {
  ...AwardCarouselComponent.args,
  backgroundColor: '#141928',
  paginationColor: '#FFFFFF',
  cardSubTitleColor: '#FFFFFF',
  cardLegalTextColor: '#FFFFFF',
  cardTitleTagName: 'h2',
  cardTitleStyleName: 'h3',
  cardTitleColor: '#96FFF5',
  cardSubTitleTagName: 'p',
  cardSubTitleStyleName: 'p1',
}
