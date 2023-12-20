import { makeStyles } from '@material-ui/core/styles'
import { useAppData } from 'src/hooks'
import { Typography, InjectHTML } from '@/shared-ui/components'
import colors from '@/shared-ui/colors'

const FrontierSecureTextSection: React.FC = () => {
  const classes = useStyles()
  const item = useAppData('richTextContent', true)

  return (
    <Typography className={`${classes.root}`}>
      <>
        {item?.script && (
          <InjectHTML tagType="div" value={item?.script?.value} />
        )}
        {item?.content && (
          <InjectHTML
            className={classes.container}
            tagType="div"
            value={item?.content?.value}
          />
        )}
      </>
    </Typography>
  )
}

const useStyles = makeStyles(() => ({
  root: {
    margin: '32px auto',
    maxWidth: 1200,
    padding: '0 16px',
    '& h3, & h5, & h4': {
      fontSize: 20,
    },
    '& a': {
      fontWeight: 600,
      textDecoration: 'underline',
      '&:hover': {
        color: colors.main.primaryRed,
      },
    },
    '& h2': {
      marginBottom: 0,
      fontWeight: '400',
      fontSize: 24,
      lineHeight: '36px',
      '& sup': {
        fontSize: '0.35em',
        position: 'relative',
        top: '-5px',
      },
    },
    '& p': {
      marginTop: '0px',
      marginBottom: '20px',
    },
    '& h3': {
      marginBottom: '5px',
      fontWeight: '400',
    },
    '& h4': {
      fontSize: 20,
      marginBottom: '5px',
    },
    '& ul': {
      paddingLeft: '20px',
      margin: 0,
    },
    '& li': {
      fontSize: 16,
    },
  },
  container: {
    paddingBottom: 16,
  },
}))
export default FrontierSecureTextSection
