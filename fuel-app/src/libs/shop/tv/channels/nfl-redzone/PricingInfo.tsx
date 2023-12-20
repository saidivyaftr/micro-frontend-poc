import { Typography, Button, InjectHTML } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core'
import colors from '@/shared-ui/colors'
import { useAppData } from 'src/hooks'
import { COMPONENT_WRAPPER, CTA_BUTTON, SITE_INTERACTION } from 'src/constants'

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
        tagType="h3"
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
          href={ButtonValue?.value}
          className={classes.button}
          triggerEvent={true}
          eventObj={{ events: 'event14', eVar14: CTA_BUTTON }}
          interactionType={SITE_INTERACTION}
        />
      </div>
    </div>
  )
}
const useStyles = makeStyles(({ breakpoints, typography }) => ({
  container: {
    ...COMPONENT_WRAPPER,
    paddingTop: '5rem',
    paddingBottom: '5rem',
    [breakpoints.down('sm')]: {
      paddingTop: '3rem',
      paddingBottom: '3rem',
    },
  },
  pageTitle: {
    paddingBottom: `${typography.pxToRem(32)}`,
    [breakpoints.down('sm')]: {
      paddingBottom: 0,
    },
  },
  body: {
    display: 'flex',
    [breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  area: {
    borderRight: `${typography.pxToRem(1)} solid ${colors.main.borderGrey}`,
    padding: '0px 2rem',
    width: '26.342%',
    '&:first-child': {
      paddingLeft: 0,
      width: '23.657%',
      [breakpoints.down('sm')]: {
        width: '100%',
      },
    },
    '&:last-child': {
      borderRight: 'initial',
      paddingRight: 0,
      width: '23.657%',
      [breakpoints.down('sm')]: {
        width: '100%',
      },
    },
    [breakpoints.down('sm')]: {
      width: '100%',
      padding: '32px 0px 16px 0px',
      borderBottom: `${typography.pxToRem(1)} solid ${colors.main.borderGrey}`,
      borderRight: 'initial',
      '&:last-child': {
        borderBottom: 'initial',
      },
    },
  },
  buttonContainer: {
    textAlign: 'center',
    marginTop: `${typography.pxToRem(57.6)}`,
    [breakpoints.down('sm')]: {
      marginTop: 0,
      dispaly: 'block',
    },
  },
  button: {
    padding: '11.5px 32px',
    lineHeight: 1,
    [breakpoints.down('sm')]: {
      fontSize: `${typography.pxToRem(18)}`,
    },
    [breakpoints.down('xs')]: {
      display: 'block',
      fontSize: '1.125rem',
      minHeight: 'auto',
      padding: '14px',
    },
  },
  title: {
    [breakpoints.down('sm')]: {
      fontSize: `${typography.pxToRem(18)}`,
    },
    [breakpoints.down('xs')]: {
      fontSize: `${typography.pxToRem(20)}`,
      lineHeight: `${typography.pxToRem(28)}`,
    },
  },
  content: {
    [breakpoints.down('sm')]: {
      fontSize: `${typography.pxToRem(16)}`,
    },
  },
}))

export default PricingInfo
