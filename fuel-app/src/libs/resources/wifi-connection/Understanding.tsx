import { makeStyles } from '@material-ui/core'
import { InjectHTML } from '@/shared-ui/components'
import { COMPONENT_WRAPPER } from 'src/constants'
import { useAppData } from 'src/hooks'
import colors from '@/shared-ui/colors'

const Understanding: React.FC = () => {
  const classes = useStyles()
  const data = useAppData('understanding', true)
  const { title, description, disclaimer } = data

  if (!title?.value) {
    return null
  }

  return (
    <div data-testid="understanding" className={classes.root}>
      <div className={classes.wrapper}>
        {title?.value && (
          <InjectHTML
            data-testid="understanding-title"
            tagType="h2"
            styleType="h2"
            fontType="boldFont"
            color="secondary"
            className={classes.title}
            value={title?.value}
          />
        )}
        <div className={classes.bottomWrapper}>
          {description?.value && (
            <div className={classes.bottomContent}>
              <InjectHTML
                tagType="p"
                styleType="p1"
                color="tertiary"
                fontType="regularFont"
                value={description?.value}
              />
            </div>
          )}
          {disclaimer?.value && (
            <div className={classes.bottomContent}>
              <InjectHTML
                value={disclaimer.value}
                tagType="p"
                styleType="p1"
                color="tertiary"
                className={classes.disclaimer}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    backgroundColor: colors.main.midnightExpress,
  },
  wrapper: {
    ...COMPONENT_WRAPPER,
  },
  title: {
    padding: '5rem 0 3rem',
    borderBottom: `4px solid ${colors.main.brightRed}`,
    [breakpoints.down('sm')]: {
      padding: '2.5rem 0 2rem',
      marginBottom: '1rem',
    },
  },
  bottomWrapper: {
    display: 'flex',
    gap: '10rem',
    alignItems: 'flex-start',
    paddingBottom: '5rem',
    [breakpoints.down('sm')]: {
      gap: '2rem',
      flexDirection: 'column',
      alignItems: 'flex-start',
      paddingBottom: '2.5rem',
    },
  },
  bottomContent: {
    flex: 1,
    marginTop: '3rem',
    '& p': { marginTop: 0, marginBottom: '1rem' },
    [breakpoints.down('sm')]: {
      marginTop: '1rem',
    },
  },
  disclaimer: {
    '& a': {
      textDecorationLine: 'underline',
      '&:hover': {
        color: colors.main.brightRed,
      },
    },
  },
}))

export default Understanding
