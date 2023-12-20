import colors from '@/shared-ui/colors'
import { InjectHTML, Tooltip } from '@/shared-ui/components'
import { InfoIconWhite } from '@/shared-ui/react-icons'
import { makeStyles } from '@material-ui/core'
import clx from 'classnames'
import { PP_OBJECT_SANS_MEDIUM } from 'src/constants/fontFamilyNames'

const TwoColumnLayout = (props: any) => {
  const classes = useStyles()
  const {
    wrapperClass,
    leftContent,
    leftClass,
    rightContent,
    rightClass,
    legalText,
    toolTipText,
  } = props

  return (
    <div id="two-column-layout">
      <div className={clx(classes.wrapper, wrapperClass)}>
        <InjectHTML
          tagType="h2"
          styleType="h3"
          value={leftContent}
          className={clx(classes.leftContent, leftClass)}
        />
        <div className={clx(classes.rightContent, rightClass)}>
          <InjectHTML
            tagType="p"
            styleType="p2"
            value={rightContent}
            className={classes.title}
          />
          {toolTipText && (
            <Tooltip
              tooltipDirection={'bottom'}
              tooltipText={toolTipText}
              includeBorder={true}
              dropShadow
              tooltipClassName={classes.tooltip}
              tooltipIcon={<InfoIconWhite />}
            ></Tooltip>
          )}
          {legalText && (
            <InjectHTML
              className={classes.legalText}
              tagType="p"
              data-testid="caption"
              styleType="legal"
              value={legalText}
            />
          )}
        </div>
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  wrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    [breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  leftContent: {
    flex: 1,
    [breakpoints.down('xs')]: {
      marginBottom: '1rem',
    },
  },
  rightContent: {
    flex: 1,
    '& a': {
      fontFamily: PP_OBJECT_SANS_MEDIUM,
      textDecoration: 'underline',
    },
    '& a:hover': {
      color: colors.main.brightRed,
    },
  },
  title: {
    display: 'inline',
    fontSize: '1.125rem',
    lineHeight: '1.625rem',
    [breakpoints.down('xs')]: {
      fontSize: '1rem',
      lineHeight: '1.5rem',
    },
  },
  tooltip: {
    display: 'inline',
    marginLeft: '0.5rem',
  },
  legalText: {
    marginTop: '1rem!important',
  },
}))

export default TwoColumnLayout
