import { makeStyles } from '@material-ui/core'
import { Typography, InjectHTML } from '@/shared-ui/components'
import { Grid } from '@material-ui/core'
import { useAppData } from 'src/hooks'
import colors from '@/shared-ui/colors'
import { COMPONENT_WRAPPER } from 'src/constants'

const FiberToDoor = () => {
  const classes = useStyles()
  const { title, subTitle1, subTitle2, description, backgroundColor } =
    useAppData('FiberToDoor', true)

  return (
    <div
      className={classes.root}
      style={{ backgroundColor: backgroundColor?.targetItem?.Color?.value }}
    >
      <Grid className={classes.wrapper} container>
        <Grid item sm={12} md={6}>
          <InjectHTML
            tagType="h1"
            styleType="h2"
            className={classes.title}
            value={title?.value}
          />
        </Grid>
        <Grid item sm={12} className={classes.borderWrapper}>
          <hr />
        </Grid>
        <Grid item sm={12} md={6}>
          <h3 className={classes.subTitle}>
            {subTitle1 && (
              <Typography color="tertiary" styleType="h4" tagType="h3">
                {subTitle1?.value}
              </Typography>
            )}
            {subTitle2 && (
              <InjectHTML
                styleType="h4"
                color="secondary"
                tagType="h3"
                value={subTitle2?.value}
              />
            )}
          </h3>
        </Grid>
        <Grid item sm={12} md={6}>
          <InjectHTML
            tagType="div"
            styleType="p1"
            className={classes.description}
            value={description?.value}
          />
        </Grid>
      </Grid>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    padding: 0,
  },
  wrapper: {
    ...COMPONENT_WRAPPER,
    padding: '50px 16px',
    [breakpoints.down('md')]: {
      width: '100%',
      maxWidth: '100%',
    },
  },
  title: {
    color: colors.main.greenishBlue,
    margin: '32px 0px',
    width: '100%',
  },
  borderWrapper: {
    '& hr': {
      backgroundColor: colors.main.greenishBlue,
      marginBottom: 50,
      height: 4,
    },
    [breakpoints.down('md')]: {
      width: '100%',
    },
  },
  subTitle: {
    width: '90%',
    margin: 0,
    color: colors.main.white,
    '& sup': {
      fontSize: '0.875rem',
      lineHeight: '1.125rem',
    },
    [breakpoints.down('md')]: {
      marginBottom: 16,
      width: '100%',
    },
  },
  description: {
    width: '90%',
    color: colors.main.white,
    [breakpoints.down('md')]: {
      width: '100%',
    },
  },
}))

export default FiberToDoor
