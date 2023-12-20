import { makeStyles } from '@material-ui/styles'
import { InjectHTML } from '@/shared-ui/components'
import { COMPONENT_WRAPPER } from 'src/constants'
import { useAppData } from 'src/hooks'
import colors from '@/shared-ui/colors'

const RichContent = () => {
  const classes = useStyles()
  const { reactText } = useAppData('cpniReachText', true)

  return (
    <div className={classes.wrapper}>
      <InjectHTML fontType="regularFont" value={reactText?.value} />
    </div>
  )
}

const useStyles = makeStyles(() => ({
  wrapper: {
    ...COMPONENT_WRAPPER,
    padding: '1rem 16px',
    borderBottom: `1px solid ${colors.main.borderLightGray}`,
    fontSize: '0.4rem !important',
  },
}))

export default RichContent
