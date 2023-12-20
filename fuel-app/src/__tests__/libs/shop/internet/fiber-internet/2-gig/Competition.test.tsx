import { Competition } from 'src/libs/shop/internet/fiber-internet/2-gig'
import { render } from '@testing-library/react'
import { useAppData } from 'src/hooks'

jest.mock('src/hooks')

const getProperties = (name: string) => {
  const properties = []
  for (let i = 0; i <= 2; i++) {
    properties.push({
      name: {
        value: name,
      },
      textValue: {
        value: `VALUE: ${name} ${i}`,
      },
    })
  }
  return { properties: { list: properties }, logo: { src: '' } }
}

describe('Competition', () => {
  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => ({
      title: {
        value: 'TEST TITLE',
      },
      items: {
        list: [getProperties('SPEED'), getProperties('Network')],
      },
    }))
    const { getByText } = render(<Competition />)
    expect(getByText('TEST TITLE')).toBeInTheDocument()
    expect(getByText('VALUE: SPEED 0')).toBeInTheDocument()
    expect(getByText('VALUE: SPEED 1')).toBeInTheDocument()
    expect(getByText('VALUE: SPEED 2')).toBeInTheDocument()
    expect(getByText('VALUE: Network 2')).toBeInTheDocument()
  })
})
