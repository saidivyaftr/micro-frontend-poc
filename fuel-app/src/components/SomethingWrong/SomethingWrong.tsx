import { makeStyles, Grid } from '@material-ui/core'
import Head from 'next/head'
import { Typography, Button } from '@/shared-ui/components'
import colors from 'src/styles/theme/colors'

export default function SSR(): JSX.Element {
  const classes = useStyles()

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/pages/favicon.ico" />
        <link rel="icon" href="/pages/favicon.ico" type="image/ico" />
      </Head>
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
            Something went wrong
          </Typography>
          <Typography className={classes.subTitle}>
            Sorry, Something went wrong. Return to the previous page or go home
            to get back on the right path.
          </Typography>
          <Button
            type="link"
            className={classes.goBackHomeBtn}
            href="/"
            text="Go Back Home"
          />
        </Grid>
      </Grid>
    </>
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
    textAlign: 'center',
  },
  subTitle: {
    color: colors.main.darkGray,
    marginTop: 20,
    textAlign: 'center',
  },
  goBackHomeBtn: {
    marginTop: 20,
  },
})
