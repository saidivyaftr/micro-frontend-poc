import { makeStyles } from '@material-ui/core/styles'
import { InjectHTML } from '@/shared-ui/components'
import colors from '@/shared-ui/colors'
import useAppData from '@/shared-ui/hooks/useAppData'

const Hero = ({ data }: any) => {
  const styles = useStyles()
  const { title } = useAppData('hero', true, data)
  return (
    <div className={styles.root}>
      <InjectHTML
        addAnchorStyles
        tagType="h1"
        styleType="h3"
        value={title?.value}
        className={styles.title}
      />
    </div>
  )
}

const useStyles = makeStyles(({}) => ({
  root: {
    backgroundColor: colors.main.midnightExpress,
    padding: '25px',
    color: colors.main.white,
    marginTop: -1,
  },
  title: {
    color: colors.main.white,
    textAlign: 'center',
  },
}))

export default Hero
