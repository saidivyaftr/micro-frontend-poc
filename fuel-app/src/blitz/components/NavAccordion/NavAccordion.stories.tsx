import { ComponentStory, ComponentMeta } from '@storybook/react'
import NavMenu from './NavAccordion'

export default {
  title: 'Components/NavAccordion',
  component: NavMenu,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof NavMenu>

const Template: ComponentStory<typeof NavMenu> = (args) => <NavMenu {...args} />

export const NavAccordionStories = Template.bind({})
NavAccordionStories.args = {
  menu: [
    {
      title: 'Nav Title',
      subItems: [
        {
          title: 'item 1',
          subItems: [
            {
              title: 'item nested',
              href: 'https://www.google.com',
            },
          ],
        },
      ],
    },
  ],
}
