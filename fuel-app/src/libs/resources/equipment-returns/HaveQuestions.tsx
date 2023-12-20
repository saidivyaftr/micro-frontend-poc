import { makeStyles } from '@material-ui/core'
import { COMPONENT_WRAPPER } from 'src/constants'
import { InjectHTML } from '@/shared-ui/components'
import colors from '@/shared-ui/colors'
import { PP_OBJECT_SANS_BOLD } from 'src/constants/fontFamilyNames'
import useAppData from '@/shared-ui/hooks/useAppData'

const HaveQuestions = () => {
  const { text, backgroundColor } = useAppData('haveQuestions', true) || {}
  const classes = useStyles()

  return (
    <div
      className={classes.wrapper}
      style={{
        backgroundColor: backgroundColor,
      }}
    >
      <div className={classes.root}>
        <InjectHTML
          addAnchorStyles
          styleType="p1"
          value={text?.value}
          className={classes.text}
        />
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  wrapper: {
    backgroundColor: colors.main.greenishBlue,
    padding: `25px 1rem`,
    margin: '30px 0',
  },
  root: {
    ...COMPONENT_WRAPPER,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 32,
    '& a': {
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
    [breakpoints.down('xs')]: {
      flexDirection: 'column',
      gap: 0,
      padding: 0,
    },
  },
  text: {
    fontSize: '1rem',
    lineHeight: '1.75rem',
    '& p': {
      margin: 0,
    },
    '& a': {
      fontFamily: PP_OBJECT_SANS_BOLD,
    },
  },
}))

export default HaveQuestions
