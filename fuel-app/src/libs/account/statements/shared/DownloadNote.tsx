import { makeStyles } from '@material-ui/core'
import colors from 'src/styles/theme/colors'

const useStyles = makeStyles(() => ({
  link: {
    '&:hover': {
      textDecoration: 'underline',
      color: colors.main.brightRed,
    },
  },
}))
export const DownloadNote = () => {
  const classes = useStyles()
  return (
    <p>
      {`Note: Downloads require Adobe Acrobat Reader. If you don't have a current
      version of this software, `}
      <a
        href="http://get.adobe.com/reader/"
        target="_top"
        rel="noopener noreferrer"
        className={classes.link}
      >
        <u>download it here for free.</u>
      </a>
    </p>
  )
}
