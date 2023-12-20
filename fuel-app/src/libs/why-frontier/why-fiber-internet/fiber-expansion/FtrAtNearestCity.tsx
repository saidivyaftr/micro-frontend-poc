import {
  TwoColumnLayout,
  Button,
  Typography,
  InjectHTML,
} from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core'
import colors from '@/shared-ui/colors'
import { nearestCity } from './mockData'

const FtrAtNearestCity = () => {
  const classes = useStyles()
  const { heading, description, button, image } = nearestCity

  const NonImageContent = () => (
    <div id="frontier-at-nearest-city" className={classes.NonImageContainer}>
      <div className={classes.NonImageWrapper}>
        <InjectHTML tagType="h3" styleType="h3" value={heading?.value} />
        <div className={classes.desc}>
          <Typography tagType="span" styleType="p1" fontType="boldFont">
            {description?.value}
          </Typography>
        </div>
        <div className={classes.learnWrapper}>
          <Button
            type="link"
            text={button?.text?.value}
            href={button?.url?.value}
            className={classes.learnBtn}
          />
        </div>
      </div>
    </div>
  )

  return (
    <div className={classes.wrapper}>
      <TwoColumnLayout
        roundedBorders={true}
        imageWrapperClassName={classes.imageWrapper}
        gridClassName={classes.grid}
        image={image?.src?.value}
        title={heading?.value}
        content={<NonImageContent />}
        reverse={true}
        mobileReverse={true}
      />
    </div>
  )
}

export default FtrAtNearestCity

const useStyles = makeStyles(({ breakpoints }) => ({
  wrapper: {
    margin: '60px auto',
    padding: '0px 16px',
    maxWidth: '1232px',
    '& img': {
      maxHeight: 'unset',
    },
    [breakpoints.down('sm')]: {
      '& > div > div': {
        padding: 0,
      },
    },
  },
  NonImageContainer: {
    backgroundColor: colors.main.white,
    marginRight: 'auto',
    width: '100%',
    [breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  NonImageWrapper: {
    backgroundColor: colors.main.newBackgroundGray,
    paddingLeft: '7%',
    padding: '3rem 2rem 4.5rem 4rem',
    maxHeight: 456,
    [breakpoints.down('sm')]: {
      padding: '2rem 1rem 2.5rem 1rem',
    },
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    '& ul': {
      listStyleType: 'none',
      marginBottom: 0,
      paddingLeft: 0,
    },
    [breakpoints.down('sm')]: {
      padding: '1rem',
    },
  },
  link: {
    marginTop: '3rem',
    display: 'inline-block',
    width: 'unset',
    maxWidth: 'fit-content',
    [breakpoints.down('sm')]: {
      marginTop: '1rem',
      paddingRight: '1rem',
      paddingLeft: '1rem',
      margin: 'auto',
    },
  },
  planContainer: {
    marginTop: 48,
    [breakpoints.down('sm')]: {
      marginTop: 32,
    },
  },
  alreadyACustomerContainer: {
    marginTop: '32px !important',
    [breakpoints.down('md')]: {
      flexDirection: 'column',
    },
    [breakpoints.down('sm')]: {
      marginTop: '16px !important',
    },
  },
  customerChat: {
    paddingTop: '1rem',
    marginRight: '.5rem',
    display: 'inline-block',
  },
  planBtn: {
    [breakpoints.down('md')]: {
      margin: 'auto',
      marginTop: '1rem',
      paddingLeft: '1rem',
      paddingRight: '1rem',
    },
    [breakpoints.down('sm')]: {
      display: 'flex !important',
      marginTop: 0,
      maxWidth: 'none !important',
      justifyContent: 'center',
    },
  },
  dot: {
    height: '0.25rem',
    width: '0.25rem',
    marginBottom: '0.25rem',
    marginRight: '0.25rem',
    backgroundColor: colors.main.midnightExpress,
    display: 'inline-block',
    borderRadius: '100%',
  },
  imageWrapper: {
    maxHeight: 456,
    [breakpoints.up('md')]: {
      height: '100%',
    },
    [breakpoints.down('sm')]: {
      maxHeight: 300,
    },
  },
  grid: {
    [breakpoints.up('md')]: {
      '& > div:nth-of-type(2)': {
        minWidth: 'calc(50% + 3rem)',
      },
      '& > div:first-of-type': {
        maxWidth: 'calc(50% - 3rem)',
      },
    },
  },
  learnWrapper: {
    marginTop: 32,
    marginBottom: 32,
    [breakpoints.down('sm')]: {
      marginBottom: 0,
      display: 'flex',
    },
  },
  learnBtn: {
    [breakpoints.down('md')]: {
      margin: 'auto',
      paddingLeft: '1rem',
      paddingRight: '1rem',
    },
  },
  desc: {
    marginTop: 16,
  },
}))
