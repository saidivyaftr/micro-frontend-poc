import { makeStyles } from '@material-ui/core/styles'
import { useMemo } from 'react'
import { TitleWithCaption } from '@/shared-ui/components'
import { useAppData } from 'src/hooks'
import { COMPONENT_WRAPPER } from 'src/constants'
interface FrontierReputationProps {
  data?: any
}

const FrontierReputation: React.FC<FrontierReputationProps> = ({ data }) => {
  const classes = useStyles()
  const item = useAppData('reputationData', true, data)
  const list = useMemo(
    () => ({
      title: item?.title?.value,
      backgroundColor: item?.backgroundColor?.value,
      fontColor: item?.fontColor?.value || 'white',
      disclaimerText: item?.disclaimerText?.value,
    }),
    [item],
  )

  return (
    <div className={classes.root} data-testid="reputationData-info">
      <TitleWithCaption
        title={list?.title}
        backgroundColor={list?.backgroundColor}
        fontColor={list?.fontColor}
        disclaimerText={list?.disclaimerText}
      />
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    ...COMPONENT_WRAPPER,
    margin: '16px auto',
    padding: '0',
    maxWidth: '906px',
    [breakpoints.down('sm')]: {
      padding: '0 1rem',
    },
  },
}))

export default FrontierReputation
