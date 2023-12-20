import { makeStyles, Grid } from '@material-ui/core'
import { Typography, Button, InjectHTML } from '@/shared-ui/components'
import colors from '@/shared-ui/colors'
import { useRouter } from 'next/router'

const NotFound = () => {
  const classes = useStyles()
  const { push } = useRouter()
  const notFound = {
    header: '404 Unknown',
    subTitle:
      'You’ve discovered an uncharted corner of the Frontier. Return to the previous page or go home to get back on the right path.',
    btnText: 'Go back home',
    helplineText:
      "Need a guide? Call <a href='tel:1.855.555.5151'>1.855.555.5151</a>",
  }

  const handleGoBackToHome = () => {
    push('/')
  }

  return (
    <Grid className={classes.root}>
      <Grid
        container
        item
        md={6}
        xs={11}
        alignItems="center"
        direction="column"
        className={classes.innerWrapper}
      >
        <Typography styleType="h3" className={classes.header}>
          {notFound.header}
        </Typography>
        <Typography className={classes.subTitle}>
          {notFound.subTitle}
        </Typography>
        <Button
          type="button"
          className={classes.goBackHomeBtn}
          onClick={handleGoBackToHome}
          text={notFound.btnText}
        />
        <InjectHTML
          className={classes.helplineText}
          value={notFound.helplineText}
        />
      </Grid>
    </Grid>
  )
}

const useStyles = makeStyles({
  root: {
    marginTop: 100,
    height: '70vh',
    display: 'flex',
  },
  innerWrapper: {
    margin: 'auto',
    maxWidth: 400,
  },
  header: {
    fontWeight: 'bold',
  },
  subTitle: {
    color: colors.main.darkGray,
    marginTop: 20,
    textAlign: 'center',
  },
  goBackHomeBtn: {
    background: colors.main.primaryRed,
    color: colors.main.white,
    marginTop: 20,
    width: '100%',
  },
  helplineText: {
    marginTop: 20,
    fontWeight: 600,
    '& a': {
      '&:hover': {
        color: colors.main.primaryRed,
      },
      textDecoration: 'underline',
    },
  },
})

export default NotFound
