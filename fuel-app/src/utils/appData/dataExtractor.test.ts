import { Data, pick } from './dataExtractor'

const data = {
  fields: {
    title: { value: 'Test' },
  },
}
const dataSourceData = {
  fields: {
    data: {
      datasource: {
        title: { value: 'Test' },
      },
    },
  },
}
const variableData = {
  fields: {
    title: { value: 'Test {{x}} + {{y}} is {{z}}' },
  },
}
describe('pick', () => {
  it('should return the provided key value from the data', () => {
    expect(pick('title', data)).toBe(data.fields.title.value)
  })

  it('should return the provided key value from the data of type datasource', () => {
    expect(pick('title', dataSourceData)).toBe(
      dataSourceData.fields.data.datasource.title.value,
    )
  })

  it('should return empty string if provided key is not available in data', () => {
    expect(pick('description', data)).toBe('')
  })

  it("should return empty string if provided data doesn't have fields property", () => {
    expect(pick('description', {} as unknown as Data)).toBe('')
  })

  it('should return empty string if provided data is not of correct type', () => {
    expect(pick('description', [] as unknown as Data)).toBe('')
  })

  it('should return empty string if provided data is undefined', () => {
    expect(pick('description', undefined as unknown as Data)).toBe('')
  })

  it('should return the value for provided key replacing the variables with actual value', () => {
    const variableMap = { x: '1', y: '2', z: '3' }
    expect(pick('title', variableData, variableMap)).toBe(
      `Test ${variableMap.x} + ${variableMap.y} is ${variableMap.z}`,
    )
  })

  it('should return the value for provided key when no variableMap passed', () => {
    expect(pick('title', variableData)).toBe(variableData.fields.title.value)
  })
})
