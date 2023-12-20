import { ComponentStory, ComponentMeta } from '@storybook/react'
import BlockTable from './BlockTable'

export default {
  title: 'Components/BlockTable',
  component: BlockTable,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof BlockTable>

const Template: ComponentStory<typeof BlockTable> = (args) => (
  <BlockTable {...args} />
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

export const BlockTableStories = Template.bind({})
BlockTableStories.args = {
  addBorderToHeader: false,
  items: [COLUM_DATA],
}

export const BlockTableTwoColumns = Template.bind({})
BlockTableTwoColumns.args = {
  addBorderToHeader: false,
  items: [COLUM_DATA, COLUM_DATA],
}

export const BlockTableThreeColumns = Template.bind({})
BlockTableThreeColumns.args = {
  addBorderToHeader: false,
  items: [COLUM_DATA, COLUM_DATA, COLUM_DATA],
}

export const BlockTableWithHeaderAsName = Template.bind({})
const rowData = {
  ...COLUM_DATA,
  logo: '',
  headerDescription: '',
  header: 'Gig Service',
}

BlockTableWithHeaderAsName.args = {
  addBorderToHeader: true,
  items: [rowData, rowData],
}

export const BlockTableFourColumns = Template.bind({})
BlockTableFourColumns.args = {
  addBorderToHeader: false,
  items: [COLUM_DATA, COLUM_DATA, COLUM_DATA, COLUM_DATA],
}

export const BlockTableFiveColumns = Template.bind({})
BlockTableFiveColumns.args = {
  addBorderToHeader: false,
  items: [COLUM_DATA, COLUM_DATA, COLUM_DATA, COLUM_DATA, COLUM_DATA],
}
