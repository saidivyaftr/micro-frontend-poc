import { ComponentStory, ComponentMeta } from '@storybook/react'
import Calendar from './Calendar'
import { TabScrollButton } from '@material-ui/core'

export default {
  title: 'Components/Calendar',
  component: Calendar,
} as ComponentMeta<typeof Calendar>

const Template: ComponentStory<typeof Calendar> = (args) => (
  <Calendar {...args} />
)

export const CalendarStories = Template.bind({})

CalendarStories.args = {
  TabScrollButton,
  selectDateTitle: 'Select date and time',
  datesArray: [
    {
      date: '2023-11-29T08:00:00.000-05:00',
      available: true,
      selected: false,
    },
    {
      date: '2023-12-01T08:00:00.000-05:00',
      available: true,
      selected: false,
    },
    {
      date: '2023-12-02T08:00:00.000-05:00',
      available: true,
      selected: false,
    },
    {
      date: '2023-12-03T08:00:00.000-05:00',
      available: true,
      selected: false,
    },
    {
      date: '2023-12-04T08:00:00.000-05:00',
      available: true,
      selected: false,
    },
    {
      date: '2023-12-05T08:00:00.000-05:00',
      available: true,
      selected: true,
    },
  ],
  // eslint-disable-next-line
  getSelectedDates: () => {},
}
