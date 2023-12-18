import { ComponentStory, ComponentMeta } from '@storybook/react'
import InjectHTML from './InjectHTML'

export default {
  title: 'Components/InjectHTML',
  component: InjectHTML,
} as ComponentMeta<typeof InjectHTML>

const Template: ComponentStory<typeof InjectHTML> = (args) => (
  <InjectHTML {...args} />
)

export const InjectHTMLComponent = Template.bind({})

InjectHTMLComponent.args = {
  value: `
  <strong>
    This is strong<sup>©</sup>
  </strong>
  <img src onerror="alert('*************This is how it works');"/>
  <script>console.log("This is how it works");</script> and this is non strong
`,
}
