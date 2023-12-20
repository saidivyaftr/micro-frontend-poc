const dataParser = (data: any) => {
  const jssFields = data?.sitecore?.route?.placeholders?.json || []
  const dataDictionary: any = {}
  for (const item of jssFields) {
    const { fields, params, componentName } = item || {}
    dataDictionary[componentName] = { fields, params }
  }
  const parsedData = {
    ...dataDictionary,
  }
  return parsedData
}

export const dataParserForDynamic = (data: any, components: any) => {
  const initialState = {
    dynamicComponents: [],
    nonDynamicComponents: {},
  }
  try {
    if (!data || !data?.length) return initialState
    return data?.reduce((retainComps: any, item: any) => {
      const { componentName } = item
      if (components[componentName])
        retainComps.nonDynamicComponents[componentName] = item
      else retainComps.dynamicComponents.push(item)
      return retainComps
    }, initialState)
  } catch {
    return initialState
  }
}

export default dataParser
