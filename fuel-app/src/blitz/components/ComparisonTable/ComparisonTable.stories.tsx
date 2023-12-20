import { ComponentStory, ComponentMeta } from '@storybook/react'
import ComparisonTable from './ComparisonTable'

export default {
  title: 'Components/ComparisonTable',
  component: ComparisonTable,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof ComparisonTable>

const Template: ComponentStory<typeof ComparisonTable> = (args) => (
  <ComparisonTable {...args} />
)

const COLUM_DATA = {
  logo: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/fiber-2-gigabit-internet/logo-frontier.png?rev=78dfde7215fe416d80e38143dcebfa57',
  headerDescription: 'Learn More',
  headerDescriptionLink: 'https://www.google.com',
  properties: [
    {
      name: 'Speed',
      textValue:
        '<div> <span>2000 </span> Mbps download <br />\n<span>2000</span> Mbps upload</div>',
      value: false,
      toolTip:
        '<p>Think of frequency bands as highways for your data, with different lengths and lanes. Some bands are wider but shorter, allowing more traffic (data) to be delivered faster across short distances. Other bands can deliver Wi-Fi to more places in your home but have fewer lanes so the data isn’t delivered as fast. </p>\n\n<p>Wi-Fi 6 is like a super highway, allowing for rapid transmission of data. Wi-Fi 6E is like adding a fast lane to that super highway. </p>\n\n<p>Dual- or tri-band equipped routers use different frequency bands to deliver the best Wi-Fi experience for your home.</p>',
    },
    {
      name: 'Lowest latency',
      textValue: '',
      value: true,
      toolTip:
        '<p>Think of frequency bands as highways for your data, with different lengths and lanes. Some bands are wider but shorter, allowing more traffic (data) to be delivered faster across short distances. Other bands can deliver Wi-Fi to more places in your home but have fewer lanes so the data isn’t delivered as fast. </p>\n\n<p>Wi-Fi 6 is like a super highway, allowing for rapid transmission of data. Wi-Fi 6E is like adding a fast lane to that super highway. </p>\n\n<p>Dual- or tri-band equipped routers use different frequency bands to deliver the best Wi-Fi experience for your home.</p>',
    },
  ],
}

export const ComparisonTableStories = Template.bind({})
ComparisonTableStories.args = {
  addBorderToHeader: false,
  items: [COLUM_DATA],
}

export const ComparisonTableTwoColumns = Template.bind({})
ComparisonTableTwoColumns.args = {
  addBorderToHeader: false,
  items: [COLUM_DATA, COLUM_DATA],
}

export const ComparisonTableThreeColumns = Template.bind({})
ComparisonTableThreeColumns.args = {
  addBorderToHeader: false,
  items: [COLUM_DATA, COLUM_DATA, COLUM_DATA],
}

export const ComparisonTableWithHeaderAsName = Template.bind({})
const rowData = {
  ...COLUM_DATA,
  logo: '',
  headerDescription: '',
  header: 'Gig Service',
}

ComparisonTableWithHeaderAsName.args = {
  addBorderToHeader: true,
  items: [rowData, rowData],
}

export const ComparisonTableFourColumns = Template.bind({})
ComparisonTableFourColumns.args = {
  addBorderToHeader: false,
  items: [COLUM_DATA, COLUM_DATA, COLUM_DATA, COLUM_DATA],
}

export const ComparisonTableFiveColumns = Template.bind({})
ComparisonTableFiveColumns.args = {
  addBorderToHeader: false,
  items: [COLUM_DATA, COLUM_DATA, COLUM_DATA, COLUM_DATA, COLUM_DATA],
}
