import { makeStyles } from '@material-ui/core'
import { PP_OBJECT_SANS_BOLD } from 'src/constants/fontFamilyNames'
import colors from '@/shared-ui/colors'

const MedalliaFeedback = () => {
  const styles = useStyles()

  return (
    <div className={styles.root}>
      <div id="satisfaction_emb_form" className={styles.bucket} />
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    width: '100%',
    padding: 0,
    marginBottom: 80,
    [breakpoints.down('sm')]: {
      marginBottom: 32,
    },
  },
  bucket: {
    display: 'block',
    height: 'auto',
    minHeight: '150px',
    maxHeight: '500px',
    border: '0',
    marginBottom: 16,
    '&:empty': {
      display: 'none',
    },
    '& button': {
      fontFamily: PP_OBJECT_SANS_BOLD,
      cursor: 'pointer',
      border: `0.125rem solid ${colors.main.midnightExpress}`,
      backgroundColor: 'transparent !important',
      color: `${colors.main.midnightExpress} !important`,
      margin: 0,
      padding: '0.625rem 2.625rem',
      borderRadius: '5rem',
      fontWeight: 700,
      fontSize: '1.125rem',
      textAlign: 'center',
      letterSpacing: '-.02em',
      textDecoration: 'none',
      textTransform: 'uppercase',
      '&:hover': {
        background: `${colors.main.midnightExpress} !important`,
        color: `${colors.main.white} !important`,
      },
    },
  },
}))

export default MedalliaFeedback
