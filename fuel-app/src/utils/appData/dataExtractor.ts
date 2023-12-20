export type FieldRecord = Record<string, { value: string }>
export type DataSourceFieldObject = {
  datasource: FieldRecord
}
export type FieldObject = FieldRecord | { data: DataSourceFieldObject }
export type Data = { fields: FieldObject }

const replaceText = (text: string, variable: string, value: string) =>
  text.replace(`{{${variable}}}`, value)

export const pick = (
  key: string,
  data: Data,
  variableMap?: Record<string, string>,
) => {
  if (!data || !data.fields) {
    return ''
  }
  let value = ''
  if (data.fields.data) {
    const typedData = data.fields.data as DataSourceFieldObject
    value = typedData.datasource?.[key]?.value || ''
  } else {
    const typedData = data.fields as FieldRecord
    value = typedData[key]?.value || ''
  }
  if (value) {
    if (variableMap && Object.keys(variableMap).length > 0) {
      Object.entries(variableMap).forEach(([k, v]) => {
        value = replaceText(value, k, v)
      })
    }
  }
  return value
}
