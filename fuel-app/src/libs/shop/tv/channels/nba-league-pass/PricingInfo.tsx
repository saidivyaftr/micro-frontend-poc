import { Typography, Button, InjectHTML } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core'
import colors from '@/shared-ui/colors'
import { useAppData } from 'src/hooks'
import { COMPONENT_WRAPPER } from 'src/constants'

const PricingInfo = () => {
  const { Heading, list, buttonText, ButtonValue } = useAppData(
    'packageInfo',
    true,
  )
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <InjectHTML
        value={Heading?.value}
        tagType="h2"
        styleType="h3"
        className={classes.pageTitle}
      />
      <div className={classes.body}>
        {list?.targetItems?.map((item: any) => (
          <div className={classes.area} key={item?.subHeading?.value}>
            <Typography
              tagType="h3"
              styleType="h5"
              className={classes.title}
              color="primary"
            >
              {item?.subHeading?.value}
            </Typography>
            <Typography tagType="p" styleType="p1" className={classes.content}>
              {item?.subContent?.value}
            </Typography>
          </div>
        ))}
      </div>
      <div className={classes.buttonContainer}>
        <Button
          text={buttonText?.value}
          type="link"
          href={ButtonValue?.src}
          className={classes.button}
        />
      </div>
    </div>
  )
}
const useStyles = makeStyles(({ breakpoints, typography }) => ({
  container: {
    ...COMPONENT_WRAPPER,
    padding: `${typography.pxToRem(80)} 0 ${typography.pxToRem(29)} 0`,
    [breakpoints.down('sm')]: {
      margin: `${typography.pxToRem(48)} ${typography.pxToRem(16)}`,
    },
  },
  pageTitle: {
    paddingBottom: `${typography.pxToRem(32)}`,
    [breakpoints.down('sm')]: {
      paddingBottom: 0,
      fontSize: '1.25rem',
      lineHeight: '1.75rem',
    },
    '& br': {
      [breakpoints.down('xs')]: {
        display: 'none',
      },
    },
  },
  body: {
    display: 'flex',
    [breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  area: {
    flex: 1,
    borderRight: `${typography.pxToRem(1)} solid ${colors.main.borderGrey}`,
    padding: ` 0 ${typography.pxToRem(32)}`,
    '&:first-child': {
      paddingLeft: 0,
    },
    '&:last-child': {
      borderRight: 'initial',
      paddingRight: 0,
    },
    [breakpoints.down('sm')]: {
      padding: `${typography.pxToRem(32)} 0`,
      borderBottom: `${typography.pxToRem(1)} solid ${colors.main.borderGrey}`,
      borderRight: 'initial',
      '&:last-child': {
        borderBottom: 'initial',
      },
    },
  },
  buttonContainer: {
    textAlign: 'center',
    marginTop: `${typography.pxToRem(32)}`,
    [breakpoints.down('sm')]: {
      marginTop: 0,
    },
  },
  button: {
    maxWidth: `${typography.pxToRem(342)}`,
    [breakpoints.down('sm')]: {
      fontSize: `${typography.pxToRem(12)}`,
    },
  },
  title: {
    [breakpoints.down('sm')]: {
      fontSize: `${typography.pxToRem(18)}`,
    },
  },
  content: {
    [breakpoints.down('sm')]: {
      fontSize: `${typography.pxToRem(16)}`,
    },
  },
}))

export default PricingInfo
