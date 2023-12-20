import { ComponentStory, ComponentMeta } from '@storybook/react'
import IStripes from './Stripes'

export default {
  title: 'Components/Stripes',
  component: IStripes,
} as ComponentMeta<typeof IStripes>

const Template: ComponentStory<typeof IStripes> = (args) => (
  <IStripes {...args} />
)

export const StripesComponent = Template.bind({})
