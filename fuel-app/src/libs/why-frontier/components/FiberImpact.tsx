import { makeStyles, Grid } from '@material-ui/core'
import { Typography } from '@/shared-ui/components'
import colors from '@/shared-ui/colors'
import { COMPONENT_WRAPPER } from 'src/constants'
import { useAppData } from 'src/hooks'
const FiberImpact = () => {
  const classes = useStyles()
  const {
    list: { targetItems = [] },
    title,
  } = useAppData('fiberImpact', true)
  return (
    <div id="fiber-impact" className={classes.root}>
      <Grid container spacing={3}>
        <Grid item md={12}>
          <Typography
            tagType="h2"
            styleType="h3"
            className={classes.FiberImpactTitle}
          >
            {title?.value}
          </Typography>
        </Grid>
        {targetItems?.map((item: any, key: number) => {
          return (
            <Grid item key={key} md={6}>
              <div className={classes.figure}>
                <img
                  width="100%"
                  src={item?.image?.src}
                  alt={item?.image?.alt}
                  loading="lazy"
                />
              </div>
              <div className={classes.wrapper}>
                <Typography
                  tagType="h3"
                  styleType="h4"
                  className={classes.title}
                  color="tertiary"
                >
                  {item?.title?.value}
                </Typography>
                <Typography
                  tagType="p"
                  styleType="p1"
                  color="tertiary"
                  className={classes.contentStles}
                >
                  {item?.description?.value}
                </Typography>
              </div>
            </Grid>
          )
        })}
      </Grid>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    ...COMPONENT_WRAPPER,
    padding: '3.75rem 16px',
    '& .MuiGrid-item': {
      overflow: 'hidden',
    },
    [breakpoints.down('md')]: {
      paddingBottom: '1.625rem',
    },
  },
  figure: {
    overflow: 'hidden',
    [breakpoints.down('xs')]: {
      '& img': {
        margin: '0 -25%',
        width: '-webkit-fill-available',
      },
    },
  },
  FiberImpactTitle: {
    marginBottom: 16,
    textAlign: 'center',
    [breakpoints.down('sm')]: {
      fontSize: '1.5rem',
      lineHeight: '2rem',
    },
  },
  wrapper: {
    backgroundColor: colors.main.midnightExpress,
    padding: '40px 66px',
    height: 304,
    position: 'relative',
    top: '-7px',
    [breakpoints.down('md')]: {
      padding: '40px 32px',
      height: 'auto',
    },
  },
  title: {
    marginBottom: 16,
    [breakpoints.down('sm')]: {
      fontSize: '1.5rem',
      lineHeight: '2rem',
    },
  },
  contentStles: {
    [breakpoints.down('sm')]: {
      fontSize: '1rem',
      lineHeight: '1.5rem',
    },
  },
}))

export default FiberImpact
