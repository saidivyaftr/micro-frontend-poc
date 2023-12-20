import Grid from '@material-ui/core/Grid'
import { Typography, InjectHTML } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core/styles'
import Image from 'src/components/ImageWithPlaceholder'
import { useAppData } from 'src/hooks'
import colors from '@/shared-ui/colors'

const InternetDetails = () => {
  const data = useAppData('internetDetails', true)
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Grid className={`${classes.container} frontierRow`} container>
        <Grid item lg={3} md={3} sm={3} className={classes.leftWrapper}>
          <Image
            src={data?.image?.src}
            width={150}
            height={150}
            alt={data?.image?.alt}
          />
        </Grid>
        <Grid item lg={9} md={9} sm={9}>
          <div>
            <Typography
              styleType="h4"
              tagType="h4"
              testId="title"
              fontType="regularFont"
              className={classes.title}
            >
              {data?.title?.value}
            </Typography>
            <div className={classes.subTitle}>
              <InjectHTML testId="subtitle" value={data?.subTitle?.value} />
            </div>
            <ul className={classes.perksList}>
              {(data?.items?.list || []).map((item: any, index: number) => (
                <li key={index} className={classes.imageWrapper}>
                  <InjectHTML value={item?.text?.value} />
                </li>
              ))}
            </ul>
          </div>
        </Grid>
      </Grid>
      <hr className={classes.hrLine} />
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: '360px',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 14,
      paddingRight: 14,
    },
  },
  container: {
    maxWidth: 960,
  },
  title: {
    fontWeight: 300,
  },
  subTitle: {
    '& ul': {
      margin: '4px 0 25px',
      padding: '0 20px',
    },
    '& li': {
      fontSize: 16,
      padding: '0 0 8px',
    },
  },
  leftWrapper: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  imageWrapper: {
    alignItems: 'center',
  },
  hrLine: {
    maxWidth: 1112,
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
    marginTop: 24,
    borderTop: 'none',
    borderBottom: `1px solid ${colors.main.borderLightGray}`,
  },
  perksList: {
    padding: '0 20px',
  },
}))

export default InternetDetails
