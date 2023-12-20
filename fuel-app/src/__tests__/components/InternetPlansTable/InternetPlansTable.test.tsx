import { useAppData, useWindowDimensions } from '@/shared-ui/hooks'
import { render, fireEvent } from '@testing-library/react'
import InternetPlansTable from 'src/components/InternetPlansTable/InternetPlansTable'
import { ComparisonTable } from '@/shared-ui/components'
import InfoIconWhite from '@/shared-ui/react-icons/info-icon-white'
jest.mock('src/hooks')
;(global as any).s_objectID = ''

const dimensionsData = {
  width: 500,
}

const plansMockData = {
  title: {
    value: 'Better technology. Better value.',
  },
  rowHeaderFlag: {
    value: false,
  },
  yesIcon: {
    value:
      'https://content-qat.frontier.com/-/jssmedia/Project/Frontier/Dotcom/Images/shop/tv/check-mark-black.svg?rev=3361ced0fcec470ab7f821ebd997e697',
    alt: 'checkmark',
  },
  legalText: {
    value: 'LegalText',
  },
  toolTipText: {
    value: '',
  },
  tooltipDirection: {
    targetItem: null,
  },
  buttonText: {
    value: 'SIGN UP NOW',
  },
  buttonURL: {
    url: '/buy',
  },
  buttonType: {
    type: null,
  },
  hoverType: {
    type: null,
  },
  items: {
    list: [
      {
        logo: {
          src: 'https://content-qat.frontier.com/-/jssmedia/Project/Frontier/Dotcom/Images/fiber-2-gigabit-internet/logo-frontier.svg?rev=f746d9e3450545bda945a09235fe049c',
        },
        iconColor: {
          color: {
            field: {
              value: '#ff0037',
            },
          },
        },
        headerDescription: {
          value: '',
        },
        headerDescriptionLink: {
          url: '',
        },
        properties: {
          list: [
            {
              name: {
                value: '',
              },
              toolTip: {
                value: '',
              },
              textValue: {
                value:
                  '<a href="/shop/internet/fiber-internet/5-gig"><b>Frontier Fiber 5 Gig</b></a>',
              },
              value: {
                value: true,
              },
              isPrimary: {
                value: false,
              },
            },
            {
              name: {
                value: 'Max upload / download <br/>wired speed',
              },
              toolTip: {
                value:
                  'Max speeds are wired. Wi-Fi, actual & average speeds vary. Location dependent. Max speed capable range for Fiber 500 (450-500 Mbps download/upload). Max wired speed 1000/1000 Mbps. Max speed capable range for Fiber 1 Gig (846-1000 Mbps download, 792-1000 Mbps upload). Fiber 2 Gig Max wired speed 2000/2000 Mbps. Max capable download and upload speeds range from 1800 - 2000 Mbps. Fiber 5 Gig: Max wired speed 5000/5000 Mbps. Max capable download and upload speeds range from 4500 - 5000 Mbps.',
              },
              textValue: {
                value: '<div><span><nobr>5000/5000</nobr> Mbps</span></div>',
              },
              value: {
                value: false,
              },
              isPrimary: {
                value: false,
              },
            },
            {
              name: {
                value: 'Latency (lag)',
              },
              toolTip: {
                value:
                  'Frontier has the lowest latency of broadband providers measured in the FCC &ldquo;Latency by ISP&rdquo; report. Source: <a rel="noopener noreferrer" href="https://www.fcc.gov/reports-research/reports/measuring-broadband-america/charts-measuring-fixed-broadband-eleventh#chart7" target="_blank" title="FCC Measuring Fixed Broadband, Eleventh Report published on 12/31/21."><span style="text-decoration: underline;">FCC Measuring Fixed Broadband, Eleventh Report published on 12/31/21</span>.</a>',
              },
              textValue: {
                value: '8 ms',
              },
              value: {
                value: false,
              },
              isPrimary: {
                value: false,
              },
            },
            {
              name: {
                value: 'TP-Link Archer AXE300 6E router included',
              },
              toolTip: {
                value: '',
              },
              textValue: {
                value: '',
              },
              value: {
                value: true,
              },
              isPrimary: {
                value: false,
              },
            },
            {
              name: {
                value: 'No Wi-Fi router fees',
              },
              toolTip: {
                value: '',
              },
              textValue: {
                value: '',
              },
              value: {
                value: true,
              },
              isPrimary: {
                value: false,
              },
            },
            {
              name: {
                value: 'Free premium tech support',
              },
              toolTip: {
                value: '',
              },
              textValue: {
                value: '',
              },
              value: {
                value: true,
              },
              isPrimary: {
                value: false,
              },
            },
          ],
        },
      },
      {
        logo: {
          src: 'https://content-qat.frontier.com/-/jssmedia/Project/Frontier/Dotcom/Images/fiber-2-gigabit-internet/logo-xfinity.png?rev=3836301569d84746bea33bc3d6a9a89d',
        },
        iconColor: {
          color: {
            field: {
              value: '#2C303E',
            },
          },
        },
        headerDescription: {
          value: '',
        },
        headerDescriptionLink: {
          url: '',
        },
        properties: {
          list: [
            {
              name: {
                value: '',
              },
              toolTip: {
                value: '',
              },
              textValue: {
                value: '<b>Xfinity Gigabit Extra</b>',
              },
              value: {
                value: true,
              },
              isPrimary: {
                value: false,
              },
            },
            {
              name: {
                value: 'Max upload / download <br/>wired speed',
              },
              toolTip: {
                value:
                  'Max speeds are wired. Wi-Fi, actual & average speeds vary. Location dependent. Max speed capable range for Fiber 500 (450-500 Mbps download/upload). Max wired speed 1000/1000 Mbps. Max speed capable range for Fiber 1 Gig (846-1000 Mbps download, 792-1000 Mbps upload). Fiber 2 Gig Max wired speed 2000/2000 Mbps. Max capable download and upload speeds range from 1800 - 2000 Mbps. Fiber 5 Gig: Max wired speed 5000/5000 Mbps. Max capable download and upload speeds range from 4500 - 5000 Mbps.',
              },
              textValue: {
                value: '<div><span>35/1200 Mbps</span></div>',
              },
              value: {
                value: false,
              },
              isPrimary: {
                value: false,
              },
            },
            {
              name: {
                value: 'Upload / download speed',
              },
              toolTip: {
                value:
                  'Frontier has the lowest latency of broadband providers measured in the FCC &ldquo;Latency by ISP&rdquo; report Source: <a rel="noopener noreferrer" href="https://www.fcc.gov/reports-research/reports/measuring-broadband-america/charts-measuring-fixed-broadband-eleventh#chart7" target="_blank" title="FCC Measuring Fixed Broadband, Eleventh Report published on 12/31/21.">FCC Measuring Fixed Broadband, Eleventh Report published on 12/31/21.</a>',
              },
              textValue: {
                value: '16&nbsp;ms',
              },
              value: {
                value: false,
              },
              isPrimary: {
                value: false,
              },
            },
            {
              name: {
                value: 'TP-Link Archer AXE300 6E router included',
              },
              toolTip: {
                value: '',
              },
              textValue: {
                value: '',
              },
              value: {
                value: false,
              },
              isPrimary: {
                value: false,
              },
            },
            {
              name: {
                value: 'No Wi-Fi router fees',
              },
              toolTip: {
                value: '',
              },
              textValue: {
                value: '',
              },
              value: {
                value: false,
              },
              isPrimary: {
                value: false,
              },
            },
            {
              name: {
                value: 'Free premium tech support',
              },
              toolTip: {
                value: '',
              },
              textValue: {
                value: '',
              },
              value: {
                value: false,
              },
              isPrimary: {
                value: false,
              },
            },
          ],
        },
      },
      {
        logo: {
          src: 'https://content-qat.frontier.com/-/jssmedia/Project/Frontier/Dotcom/Images/fiber-2-gigabit-internet/logo-spectrum.svg?rev=af5348b4af4e48389eadbd6c3d4be162',
        },
        iconColor: {
          color: {
            field: {
              value: '#2C303E',
            },
          },
        },
        headerDescription: {
          value: '',
        },
        headerDescriptionLink: {
          url: '',
        },
        properties: {
          list: [
            {
              name: {
                value: '',
              },
              toolTip: {
                value: '',
              },
              textValue: {
                value: '<b>Spectrum Internet Gig</b>',
              },
              value: {
                value: true,
              },
              isPrimary: {
                value: false,
              },
            },
            {
              name: {
                value: 'Max upload / download <br/>wired speed',
              },
              toolTip: {
                value:
                  'Max speeds are wired. Wi-Fi, actual & average speeds vary. Location dependent. Max speed capable range for Fiber 500 (450-500 Mbps download/upload). Max wired speed 1000/1000 Mbps. Max speed capable range for Fiber 1 Gig (846-1000 Mbps download, 792-1000 Mbps upload). Fiber 2 Gig Max wired speed 2000/2000 Mbps. Max capable download and upload speeds range from 1800 - 2000 Mbps. Fiber 5 Gig: Max wired speed 5000/5000 Mbps. Max capable download and upload speeds range from 4500 - 5000 Mbps.',
              },
              textValue: {
                value: '35/1000 Mbps',
              },
              value: {
                value: false,
              },
              isPrimary: {
                value: false,
              },
            },
            {
              name: {
                value: 'Latency (lag)',
              },
              toolTip: {
                value:
                  'Frontier has the lowest latency of broadband providers measured in the FCC &ldquo;Latency by ISP&rdquo; report Source: <a rel="noopener noreferrer" href="https://www.fcc.gov/reports-research/reports/measuring-broadband-america/charts-measuring-fixed-broadband-eleventh#chart7" target="_blank" title="FCC Measuring Fixed Broadband, Eleventh Report published on 12/31/21.">FCC Measuring Fixed Broadband, Eleventh Report published on 12/31/21.</a>',
              },
              textValue: {
                value: '24 ms',
              },
              value: {
                value: false,
              },
              isPrimary: {
                value: false,
              },
            },
            {
              name: {
                value: 'TP-Link Archer AXE300 6E router included',
              },
              toolTip: {
                value: '',
              },
              textValue: {
                value: '',
              },
              value: {
                value: false,
              },
              isPrimary: {
                value: false,
              },
            },
            {
              name: {
                value: 'No Wi-Fi router fees',
              },
              toolTip: {
                value: '',
              },
              textValue: {
                value: '',
              },
              value: {
                value: false,
              },
              isPrimary: {
                value: false,
              },
            },
            {
              name: {
                value: 'Free premium tech support',
              },
              toolTip: {
                value: '',
              },
              textValue: {
                value: '',
              },
              value: {
                value: false,
              },
              isPrimary: {
                value: false,
              },
            },
          ],
        },
      },
    ],
  },
}

describe('comparison table', () => {
  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => plansMockData)
    ;(useWindowDimensions as any).mockImplementation(() => dimensionsData)
    const { queryAllByTestId } = render(<InternetPlansTable />)
    const comparisonTableOp = queryAllByTestId('compare-fibers')
    expect(comparisonTableOp).toBeTruthy()
  })

  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => plansMockData)
    const { getByText } = render(<InternetPlansTable />)

    expect(getByText('Better technology. Better value.')).toBeInTheDocument()
    expect(getByText('SIGN UP NOW')).toBeInTheDocument()

    const referCustomerBtn = getByText('SIGN UP NOW')
    fireEvent.click(referCustomerBtn)
  })

  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => plansMockData)
    render(
      <ComparisonTable
        items={[]}
        addBorderToHeader
        toolTipIcon={<InfoIconWhite />}
        hideBorderForTooltip={true}
        dropShadowForTooltip={true}
        rowHeaderstyleType="h6"
        styleModifier={{
          header: '',
          textStyleType: 'p1',
          showRedCheckMarks: true,
          hidePreferredRowValue: true,
          tooltipStyles: '',
          rowValueClassName: '',
        }}
      />,
    )
  })
})
