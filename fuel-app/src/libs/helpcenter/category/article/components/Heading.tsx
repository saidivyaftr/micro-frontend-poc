import { makeStyles } from '@material-ui/core/styles'
import { InjectHTML } from '@/shared-ui/components'

const Heading = ({ data }: any) => {
  const styles = useStyles()
  if (Object.keys(data || {}).length == 0) {
    return null
  }
  const { title, subTitle } = data || {}

  return (
    <div className={styles.root}>
      <InjectHTML
        addAnchorStyles
        tagType="h1"
        styleType="h3"
        value={title?.value}
      />
      <InjectHTML
        addAnchorStyles
        className={styles.subTitle}
        styleType="p1"
        value={subTitle?.value}
      />
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    [breakpoints.down('sm')]: {
      marginTop: '32px',
    },
  },
  subTitle: {
    marginBottom: '16px',
    marginTop: '16px',
  },
}))

export default Heading
