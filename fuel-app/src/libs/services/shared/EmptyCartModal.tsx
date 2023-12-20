import { makeStyles } from '@material-ui/core'
import { Typography, Button, InjectHTML } from '@/shared-ui/components'
import Dialog from '@material-ui/core/Dialog'
import colors from '@/shared-ui/colors'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import useAppData from '@/shared-ui/hooks/useAppData'
import useWindowDimensions from '@/shared-ui/hooks/useWindowDimensions'

interface EmptyCartModalProps {
  handleCloseModal: () => void
  showEmptyCart: boolean
}

const EmptyCartModal = ({
  handleCloseModal,
  showEmptyCart,
}: EmptyCartModalProps) => {
  const classes = useStyles()
  const emptyCartModalContent = useAppData('emptyCartModalContent', true) || {}
  const { width } = useWindowDimensions()
  const isMobile = width <= 767

  return (
    <Dialog
      open={showEmptyCart}
      fullWidth={true}
      maxWidth={'sm'}
      PaperProps={{ style: { borderRadius: 32, padding: 20 } }}
    >
      <IconButton
        aria-label="close"
        className={classes.closeIcon}
        onClick={handleCloseModal}
      >
        <CloseIcon />
      </IconButton>

      <div className={classes.container}>
        <Typography
          tagType="h4"
          styleType="h5"
          fontType="boldFont"
          className={classes.emptyCartTitle}
        >
          {emptyCartModalContent.modalHeading?.value}
        </Typography>

        <InjectHTML
          value={emptyCartModalContent.info?.value}
          className={classes.infoCopy}
          tagType="p"
          styleType="p1"
        />
        {!isMobile && <div className={classes.greyLine} />}
        <div className={classes.bottomSection}>
          <Button
            type="button"
            variant="primary"
            hoverVariant="primary"
            text={emptyCartModalContent.continueShoppingCta?.value}
            onClick={handleCloseModal}
          />
        </div>
      </div>
    </Dialog>
  )
}

export default EmptyCartModal

const useStyles = makeStyles(({ breakpoints }) => ({
  container: {
    padding: '30px 0 0 0',
    backgroundColor: colors.main.white,
    [breakpoints.up('sm')]: {
      padding: 20,
    },
    '& hr': {
      display: 'none',
      [breakpoints.up('sm')]: {
        display: 'block',
        marginTop: 40,
        marginBottom: 40,
      },
    },
  },
  closeIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  emptyCartTitle: {
    textAlign: 'center',
    [breakpoints.up('md')]: {
      textAlign: 'left',
      marginBottom: 16,
    },
  },
  infoCopy: {
    marginTop: 16,
    marginBottom: 16,
    [breakpoints.up('md')]: {
      marginBottom: 0,
    },
  },
  bottomSection: {
    display: 'block',
    [breakpoints.up('sm')]: {
      display: 'flex',
      justifyContent: 'center',
      margin: 0,
    },
    '& button': {
      width: '100%',
      margin: '16px auto',
      [breakpoints.up('sm')]: {
        width: 320,
        margin: '0 8px',
      },
    },
  },
  greyLine: {
    borderTop: `1px solid ${colors.main.white}`,
    [breakpoints.up('sm')]: {
      borderTop: `1px solid ${colors.main.gray}`,
      marginBottom: 40,
      marginTop: 40,
    },
  },
}))
