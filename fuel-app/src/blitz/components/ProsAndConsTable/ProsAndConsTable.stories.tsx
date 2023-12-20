import { ComponentStory, ComponentMeta } from '@storybook/react'
import ProsAndConsTable from './ProsAndConsTable.module'

export default {
  title: 'Components/ProsAndConsTable',
  component: ProsAndConsTable,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof ProsAndConsTable>

const Template: ComponentStory<typeof ProsAndConsTable> = (args) => (
  <ProsAndConsTable {...args} />
)

export const ProsAndConsTableStories = Template.bind({})
ProsAndConsTableStories.args = {
  backgroundColor: 'light-gray',
  headers: ['Pros', 'Cons'],
  columns: [
    {
      title: 'DSL Internet test',
      pros: ['One of the most affordable internet options'],
      cons: [
        'Slower compared to other broadband internet connections, like fiber-optic',
      ],
    },
  ],
}
