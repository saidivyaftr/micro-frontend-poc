import { makeStyles } from '@material-ui/styles'
import { Typography } from '@/shared-ui/components'
import { COMPONENT_WRAPPER } from 'src/constants'
import { useAppData } from 'src/hooks'
import colors from '@/shared-ui/colors'

const HeroCpni: React.FC = () => {
  const classes = useStyles()
  const { cpniHeroTitle } = useAppData('cpniHeroText', true)
  return (
    <div className={classes.wrapper}>
      <Typography styleType="h4" tagType="h1" fontType="regularFont">
        {cpniHeroTitle?.value}
      </Typography>
    </div>
  )
}

const useStyles = makeStyles(() => ({
  wrapper: {
    ...COMPONENT_WRAPPER,
    padding: '1rem 16px',
    borderBottom: `1px solid ${colors.main.borderLightGray}`,
    textAlign: 'left',
  },
}))

export default HeroCpni
