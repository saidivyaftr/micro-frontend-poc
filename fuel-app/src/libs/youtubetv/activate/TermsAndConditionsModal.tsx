import { makeStyles } from '@material-ui/core'
import { Button, Typography, InjectHTML } from '@/shared-ui/components'
import { COMPONENT_WRAPPER } from 'src/constants'
import colors from '@/shared-ui/colors'

const TermsAndConditionsModal = ({
  onClose,
  cta,
  title,
  content,
  ctaButton,
}: TermsAndConditionsModalProps) => {
  const classes = useStyles()

  const handleSubmit = () => {
    closeModal()
  }

  const closeModal = () => {
    onClose && onClose()
  }

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <Typography className={classes.alignCenter} styleType="h4" tagType="h4">
          {title}
        </Typography>

        <InjectHTML
          tagType="p"
          className={classes.alignCenter}
          value={content}
        />

        <div className={classes.alignCenter}>
          {cta && (
            <Button
              type="button"
              onClick={handleSubmit}
              className={classes.btn}
              text={ctaButton.value}
            />
          )}
        </div>
      </div>
    </div>
  )
}

interface TermsAndConditionsModalProps {
  onClose?: () => void
  cta?: boolean
  title: string
  content: string
  ctaButton?: any
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    backgroundColor: colors.main.white,
  },
  wrapper: {
    ...COMPONENT_WRAPPER,
    padding: '2.5rem 16px',
  },
  btn: {
    marginTop: 16,
    marginBottom: 24,
    width: 'max-content',
    [breakpoints.down('sm')]: {
      fontSize: '12px',
    },
  },
  alignCenter: {
    textAlign: 'center',
    '& p': {
      textAlign: 'justify',
    },
    '& a': {
      textDecoration: 'underline',
    },
  },
}))

export default TermsAndConditionsModal
