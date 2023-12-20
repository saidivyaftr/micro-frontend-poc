import moment from 'moment'

export const findAndReplaceDate = (
  actualString: string,
  findString: string,
  replaceString: string,
) => {
  return actualString?.replace(
    findString,
    moment(replaceString).format('MMM DD, YYYY'),
  )
}

export const findAndReplace = (
  actualString: string,
  findString: string,
  replaceString: string,
) => {
  return actualString?.replace(findString, replaceString)
}
