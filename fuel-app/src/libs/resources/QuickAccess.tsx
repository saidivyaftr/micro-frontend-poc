import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Button } from '@/shared-ui/components'
import colors from '@/shared-ui/colors'
const QuickAccess = ({ data }: any) => {
  const classes = useStyles()
  const domain = '' //window?.location?.origin || ''
  if (!data?.title) {
    return null
  }

  return (
    <div className={classes.root}>
      <Grid className={classes.container} container justifyContent="center">
        <Grid item sm={12} md={12} className={classes.innerWrapper}>
          <Typography tagType="h2" styleType="h4" className={classes.title}>
            {data?.title?.value}
          </Typography>
          <hr className={classes.border} />
        </Grid>
        {data?.perks?.list?.map((perk: any, key: number) => (
          <Grid item sm={12} md={4} key={key}>
            <div className={classes.descriptionContainer}>
              <div className={classes.descriptionWrapper}>
                <ul>
                  <li key={perk?.title?.value}>
                    <Typography
                      tagType="h5"
                      styleType="h5"
                      className={classes.perkTitle}
                    >
                      {perk?.title?.value}
                    </Typography>
                    <Typography
                      className={classes.perkDesc}
                      tagType="div"
                      styleType="p2"
                    >
                      {perk?.description?.value}
                    </Typography>
                    <Button
                      variant="tertiary"
                      className={classes.button}
                      text={perk?.buttonText?.value}
                      type="link"
                      href={`${domain}${perk?.buttonUrl?.url}`}
                    />
                  </li>
                </ul>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints, typography }) => ({
  root: {
    padding: 16,
    background: colors.main.white,
  },
  innerWrapper: {
    [breakpoints.down('md')]: {
      display: 'block',
      width: '100%',
    },
  },
  container: {
    maxWidth: 1200,
    margin: 'auto',
    padding: `36px 64px`,
    color: colors.main.white,
    [breakpoints.down('sm')]: {
      padding: '32px 0px',
    },
  },
  title: {
    fontSize: typography.pxToRem(42),
    textAlign: 'center',
    [breakpoints.down('sm')]: {
      fontSize: typography.pxToRem(24),
    },
  },
  descriptionContainer: {
    display: 'flex',
    justifyContent: 'center',
    padding: 16,
  },
  border: {
    color: colors.main.brightRed,
    borderTop: '4px solid',
    margin: `${typography.pxToRem(20)} 0px`,
  },
  descriptionWrapper: {
    width: 'max-content',
    '& ul': {
      paddingLeft: 0,
      listStyleType: 'none',
      margin: 0,
      '& li': {},
    },
    [breakpoints.down('sm')]: {
      width: 'auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },
  perkTitle: {
    fontWeight: 700,
    marginBottom: `${typography.pxToRem(16)}`,
  },
  perkDesc: {
    marginBottom: `${typography.pxToRem(16)}`,
  },
  button: {
    border: 'none',
    textDecoration: 'underline',
    color: colors.main.dark,
    textTransform: 'capitalize',
    padding: 0,
    justifyContent: 'left',
    '&:hover': {
      backgroundColor: 'transparent!important',
      color: `${colors.main.brightRed}!important`,
    },
  },
}))

export default QuickAccess
