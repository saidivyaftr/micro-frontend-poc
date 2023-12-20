import StatesWeOperate from 'src/libs/local/components/StatesWeOperate'
import { render } from '@testing-library/react'

const mockData = {
  title: { value: 'States We Operate In' },
  stateList: [
    {
      name: 'Alabama',
      url: '/local/alabama',
    },
    {
      name: 'Arizona',
      url: '/local/arizona',
    },
    {
      name: 'California',
      url: '/local/california',
    },
  ],
}

describe('StatesWeOperate', () => {
  it('should render correctly', () => {
    const { getByTestId, queryByText } = render(
      <StatesWeOperate data={mockData} />,
    )

    expect(queryByText(mockData.title.value)).toBeInTheDocument()
    const statesWeOp = getByTestId('statesWeOperate')
    expect(statesWeOp).toBeTruthy()
    expect(statesWeOp.querySelectorAll('li').length).toBe(3)
  })

  it('should not render correctly', () => {
    const { queryAllByTestId, queryByText } = render(
      <StatesWeOperate data={''} />,
    )

    expect(queryByText(mockData.title.value)).not.toBeInTheDocument()
    expect(queryAllByTestId('statesWeOperate').length).toBe(0)
  })
})
