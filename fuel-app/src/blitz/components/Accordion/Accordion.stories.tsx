import { ComponentStory, ComponentMeta } from '@storybook/react'
import Accordion from './Accordion'

export default {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Accordion>

const Template: ComponentStory<typeof Accordion> = (args) => (
  <Accordion {...args} />
)

export const AccordionExample = Template.bind({})

AccordionExample.args = {
  list: [
    {
      title: 'Question #1',
      description: 'Answer #1',
    },
    {
      title: 'Question #2',
      description: `<span><i>TEst</i></span>`,
    },
    {
      title: 'Question #3',
      description: 'Answer #1',
    },
  ],
  titleClassName: 'title-class-name',
  descriptionClassName: 'description-class-name',
}

export const AccordionLoadMoreExample = Template.bind({})

AccordionLoadMoreExample.args = {
  list: [
    {
      title: 'Question #1',
      description: 'Answer #1',
    },
    {
      title: 'Question #2',
      description: `<span><i>TEst</i></span>`,
    },
    {
      title: 'Question #3',
      description: 'Answer #1',
    },
    {
      title: 'Question #4',
      description: 'Answer #1',
    },
    {
      title: 'Question #5',
      description: 'Answer #1',
    },
    {
      title: 'Question #6',
      description: 'Answer #1',
    },
  ],
  titleClassName: 'title-class-name',
  descriptionClassName: 'description-class-name',
  shouldTruncate: true,
  borderUnderDescription: true,
  isSingleItemOpen: false,
  roundedBorders: true,
}

export const AccordionLoadMoreMaxCapExample = Template.bind({})

AccordionLoadMoreMaxCapExample.args = {
  list: [
    {
      title: 'Question #1',
      description: 'Answer #1',
    },
    {
      title: 'Question #2',
      description: `<span><i>TEst</i></span>`,
    },
    {
      title: 'Question #3',
      description: 'Answer #1',
    },
    {
      title: 'Question #4',
      description: 'Answer #1',
    },
    {
      title: 'Question #5',
      description: 'Answer #1',
    },
    {
      title: 'Question #6',
      description: 'Answer #1',
    },
    {
      title: 'Question #7',
      description: 'Answer #1',
    },
    {
      title: 'Question #8',
      description: 'Answer #1',
    },
    {
      title: 'Question #9',
      description: 'Answer #1',
    },
    {
      title: 'Question #10',
      description: 'Answer #1',
    },
    {
      title: 'Question #11',
      description: 'Answer #1',
    },
  ],
  titleClassName: 'title-class-name',
  descriptionClassName: 'description-class-name',
  shouldTruncate: true,
  maxCap: 25,
  showMoreText: 'Load More',
  showLessText: 'Reset',
  borderUnderDescription: true,
  isSingleItemOpen: false,
  roundedBorders: true,
}
