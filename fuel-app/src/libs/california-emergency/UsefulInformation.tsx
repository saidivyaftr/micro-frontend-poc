/* eslint-disable @typescript-eslint/indent */
import { makeStyles } from '@material-ui/core/styles'
import { RichText } from '@/shared-ui/components'
import colors from '@/shared-ui/colors'
import { useAppData } from 'src/hooks'

const UsefulInformation: React.FC = () => {
  const classes = useStyles()()
  const content = useAppData('richText', true)
  return (
    <div className={classes.root} id="usefulInformation">
      <RichText data={content} />
    </div>
  )
}
const useStyles = () =>
  makeStyles(({}) => ({
    root: {
      padding: '0',
      background: colors.main.grey,
    },
  }))

export default UsefulInformation
