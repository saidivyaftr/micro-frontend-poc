import { makeStyles } from '@material-ui/core'
import { InjectHTML, TooltipPopover } from '@/shared-ui/components'
import { useAppData } from 'src/hooks'
import colors from '@/shared-ui/colors'
import { COMPONENT_WRAPPER } from 'src/constants'
import InfoIconWhite from '@/shared-ui/react-icons/info-icon-white'

const QuickAccess = () => {
  const classes = useStyles()
  const { title, description1, description2, backgroundColor, toolTipText } =
    useAppData('quickInfo', true) || {}

  if (!title) {
    return null
  }

  return (
    <div style={{ backgroundColor: backgroundColor?.targetItem?.Color?.value }}>
      <div className={classes.container}>
        {title?.value && (
          <InjectHTML
            tagType="h1"
            styleType="h2"
            color="secondary"
            value={title?.value}
            className={classes.title}
          />
        )}

        <div className={classes.bottomContainer}>
          <div className={classes.leftContentWrapper}>
            {description1?.value && (
              <InjectHTML
                tagType="p"
                styleType="h6"
                value={description1?.value}
                color="tertiary"
                className={classes.leftContent}
              />
            )}
            {toolTipText?.value && (
              <TooltipPopover
                tooltipIcon={<InfoIconWhite />}
                tooltipContent={toolTipText?.value}
                tooltipDirection="bottom"
                tooltipClassName={classes.toolTip}
              />
            )}
          </div>

          {description2?.value && (
            <InjectHTML
              tagType="p"
              styleType="p1"
              value={description2?.value}
              color="tertiary"
              className={classes.rightContent}
            />
          )}
        </div>
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  container: {
    ...COMPONENT_WRAPPER,
    padding: '5rem 1rem',
    [breakpoints.down('sm')]: {
      padding: '3rem 1rem 2rem',
    },
  },
  title: {
    borderBottom: `4px solid ${colors.main.greenishBlue}`,
    paddingBottom: '3rem',
    [breakpoints.down('xs')]: {
      paddingBottom: '1.5rem',
    },
  },
  bottomContainer: {
    display: 'flex',
    gap: '10rem',
    marginTop: '3rem',
    [breakpoints.down('xs')]: {
      flexDirection: 'column',
      gap: '1rem',
    },
  },
  leftContentWrapper: { flexBasis: '50%' },
  leftContent: { display: 'inline' },
  rightContent: {
    flexBasis: '50%',
    '& sup': { lineHeight: 0 },
    '& a': {
      textDecoration: 'underline',
      '&:hover': { color: colors.main.brightRed },
    },
  },
  toolTip: {
    color: colors.main.white,
    display: 'inline',
  },
}))

export default QuickAccess
