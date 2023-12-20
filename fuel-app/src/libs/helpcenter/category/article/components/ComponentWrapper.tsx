import { COMPONENT_WRAPPER } from 'src/constants'
import { makeStyles } from '@material-ui/core/styles'
import { PP_OBJECT_SANS_BOLD } from 'src/constants/fontFamilyNames'

const ComponentWrapper: React.FC<{ children: any }> = ({ children }) => {
  const classes = useStyles()
  return <div className={classes.root}>{children}</div>
}

export const LeftWrapper: React.FC<{ children: any }> = ({ children }) => {
  const classes = useStyles()
  return <div className={classes.leftWrapper}>{children}</div>
}

export const RightWrapper: React.FC<{ children: any }> = ({ children }) => {
  const classes = useStyles()
  return <div className={classes.rightWrapper}>{children}</div>
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    ...COMPONENT_WRAPPER,
    margin: '0rem auto',
    paddingTop: 80,
    justifyContent: 'space-between',
    [breakpoints.down('sm')]: {
      padding: '0 1rem',
    },
    [breakpoints.up('md')]: {
      display: 'flex',
      gap: 32,
    },
  },
  leftWrapper: {
    '& sup': {
      fontSize: '60%',
    },
    '& ul, ol': {
      paddingLeft: 24,
    },
    '& li': {
      '&::marker': {
        fontFamily: PP_OBJECT_SANS_BOLD,
      },
      marginBottom: '1rem',
      paddingLeft: 8,
      [breakpoints.down('xs')]: {
        paddingLeft: 4,
        marginBottom: '0.5rem',
      },
    },
    flex: 1,
    [breakpoints.down('md')]: {
      width: '100%',
    },
  },
  rightWrapper: {
    top: 70,
    height: '0%',
    padding: '1rem',
    position: 'sticky',
    width: 375,
    [breakpoints.down('md')]: {
      display: 'none',
    },
  },
}))

export default ComponentWrapper
