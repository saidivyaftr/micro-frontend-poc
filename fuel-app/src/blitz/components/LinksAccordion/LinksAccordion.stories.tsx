import { ComponentStory, ComponentMeta } from '@storybook/react'
import LinksAccordion from './LinksAccordion'

export default {
  title: 'Components/LinksAccordion',
  component: LinksAccordion,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof LinksAccordion>

const Template: ComponentStory<typeof LinksAccordion> = (args) => (
  <LinksAccordion {...args} />
)

export const LinksAccordionExample = Template.bind({})
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
LinksAccordionExample.args = {
  list: [ROW_LINKS, ROW_LINKS, ROW_LINKS, ROW_LINKS, ROW_LINKS, ROW_LINKS],
  titleClassName: 'title-class-name',
  childrenClassName: 'description-class-name',
}
