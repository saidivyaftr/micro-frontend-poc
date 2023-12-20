import { makeStyles } from '@material-ui/core/styles'
import { useAppData } from 'src/hooks'
import { TitleWithButton } from '@/shared-ui/components'
import { COMPONENT_WRAPPER } from 'src/constants'
interface ExtraSpeedProps {
  data?: any
}

const ExtraSpeed: React.FC<ExtraSpeedProps> = ({ data }) => {
  const classes = useStyles()
  const {
    title,
    buttonURL,
    buttonText,
    disclaimerNote,
    backgroundColor,
    titleFontColor,
    hoverVariant,
    buttonVariant,
    buttonColor,
    objectID,
  } = useAppData('extraSpeedData', true, data)
  return (
    <div className={classes.root} data-testid="extraSpeedData-info">
      <TitleWithButton
        className={classes.container}
        title={title?.value}
        backgroundColor={backgroundColor?.value}
        titleFontColor={titleFontColor?.value}
        buttonText={buttonText?.value}
        buttonURL={buttonURL?.value}
        disclaimerNote={disclaimerNote?.value}
        hoverVariant={hoverVariant?.value}
        buttonVariant={buttonVariant?.value}
        buttonColor={buttonColor?.value}
        buttonType="link"
        objectID={objectID?.value}
      />
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    ...COMPONENT_WRAPPER,
    margin: '2rem auto',
    padding: '0',
    maxWidth: '906px',
    [breakpoints.down('sm')]: {
      padding: '0 1rem',
    },
  },
  container: {
    '& sup': {
      fontSize: '60%',
      lineHeight: '3 !important',
      [breakpoints.down(410)]: {
        lineHeight: '1 !important',
      },
    },
  },
}))

export default ExtraSpeed
