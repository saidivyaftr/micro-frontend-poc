import { ComponentStory, ComponentMeta } from '@storybook/react'
import Tile from './Tile'

export default {
  title: 'Components/Tile',
  component: Tile,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Tile>

const Template: ComponentStory<typeof Tile> = (args) => <Tile {...args} />

export const TileComponent = Template.bind({})

TileComponent.args = {
  backgroundColor: 'gray',
  className: '',
  title: {
    children: 'This is the title',
    tagType: 'h4',
    styleType: 'h4',
    className: '',
    color: 'default',
    fontType: 'boldFont',
  },
  description: {
    value:
      'Ea laboris duis quis cupidatat pariatur tempor ex dolore magna eu. Occaecat labore tempor est exercitation officia mollit velit fugiat irure mollit mollit anim. Exercitation id eu commodo irure. Sunt fugiat mollit anim ad mollit tempor aute adipisicing cupidatat esse nisi anim id nisi. Pariatur ipsum aliqua mollit tempor commodo esse exercitation consequat anim ipsum officia laborum cupidatat. Aliquip cillum ipsum eu proident anim aliqua. Laborum aliquip nisi non reprehenderit.',
    styleType: 'p1',
    tagType: 'p',
    className: '',
    color: 'default',
    fontType: 'regularFont',
  },
  ctas: [
    {
      href: 'https://ftr.com',
      label: 'Link cta',
      type: 'link',
      variant: 'tertiary',
      hoverVariant: 'primary',
    },
  ],
  links: [
    {
      href: 'https://ftr.com',
      text: {
        children: 'Link cta',
        styleType: 'p1',
        tagType: 'span',
      },
      target: '_blank',
    },
  ],
}
