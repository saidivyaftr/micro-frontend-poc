import colors from '@/shared-ui/colors'
import { Tooltip } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core'
import clsx from 'classnames'

type ToolTipProps = {
  uiComponent: any
  hoverText: string
  isToggleIco?: boolean
  isSelectList?: boolean
}

const HoverText = ({
  uiComponent,
  hoverText,
  isToggleIco = false,
}: ToolTipProps) => {
  const classes = useStyles()
  const hoverTxtClass = clsx(classes.toolTipContent, {
    [classes.toolTipIcoContent]: isToggleIco,
  })
  return (
    <Tooltip
      tooltipText={hoverText}
      tooltipIcon={uiComponent}
      tooltipClassName={classes.toolTipIcon}
      tooltipContentClass={hoverTxtClass}
      tooltipArrowClass={classes.tooltipArrow}
      includeBorder={false}
      isDarkMode={true}
      hideBorder={true}
      TooltipStyleType={'p4'}
    />
  )
}

const useStyles = makeStyles(({}) => ({
  toolTipIcon: {
    display: 'inline-flex',
    left: -16,
    top: -2,
    '& svg': {
      width: 'auto',
      height: 'auto',
    },
  },
  tooltipArrow: {
    display: 'none',
  },
  toolTipContent: {
    left: '30px!important',
    right: '140px!important',
    minWidth: 'max-content',
    bottom: 'auto',
    margin: 'auto',
    borderRadius: 4,
    background: colors.main.grey,
    '& > div': {
      margin: 'auto',
      padding: 5,
    },
  },
  toolTipIcoContent: {
    left: '70px!important',
  },
}))

export default HoverText
