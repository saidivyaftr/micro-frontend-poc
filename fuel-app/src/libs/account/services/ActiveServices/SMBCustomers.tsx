import colors from '@/shared-ui/colors'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, InjectHTML, Button } from '@/shared-ui/components'
import { COMPONENT_WRAPPER } from 'src/constants'

const SMBCustomers = () => {
  const classes = useStyles()

  const textData = {
    title: {
      value: 'You can enhance your plan with add-ons!',
    },
    description: {
      value:
        'Self-ordering is coming soon. Until then, please chat with us to order during business hours.',
    },
    chatWithUsCTA: {
      value: 'Chat with us',
      link: '',
    },
    businessHourHeading: {
      value: 'Business hours:',
    },
    businessHourDescription: {
      value:
        'Monday to Saturday 7 a.m to 12 a.m ET<br/>Sunday 9 a.m. to 10 p.m. ET ',
    },
  }

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <Typography
          tagType="h3"
          styleType="h3"
          className={classes.title}
          fontType="boldFont"
        >
          {textData.title?.value}
        </Typography>

        <Typography
          tagType="h5"
          styleType="h5"
          className={classes.title}
          fontType="regularFont"
        >
          {textData.description?.value}
        </Typography>
      </div>
      <div className={classes.container}>
        <div className={classes.bottomBar}>
          <Button
            type="link"
            variant="primary"
            text={textData.chatWithUsCTA.value}
            hoverVariant="primary"
          />
          <Typography tagType="h6" styleType="h6" fontType="boldFont">
            {textData.businessHourHeading?.value}
          </Typography>
          <Typography tagType="h6" styleType="h6" fontType="regularFont">
            <InjectHTML value={textData.businessHourDescription?.value} />
          </Typography>
        </div>
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    ...COMPONENT_WRAPPER,
    paddingTop: 32,
    paddingBottom: 32,
  },
  wrapper: {
    width: 343,
    borderRadius: 16,
    [breakpoints.up('lg')]: {
      width: 856,
    },
    [breakpoints.up('md')]: {
      width: 856,
    },
    [breakpoints.up('sm')]: {
      width: 856,
    },
  },
  container: {
    background: colors.main.white,
    borderRadius: 16,
    padding: 32,
    marginTop: 64,
  },
  bottomBar: {
    display: 'grid',
    gap: 16,
    [breakpoints.up('lg')]: {
      display: 'flex',
    },
    [breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  title: {
    marginBottom: 16,
  },
  listContainer: {
    display: 'flex',
  },
  toolTipIcon: {
    display: 'inline-flex',
    left: 6,
    '& svg': {
      width: 16,
      height: 16,
    },
  },
  tooltipArrow: {
    transform: 'rotate(138deg)',
    top: 25,
    left: 18,
    width: 8,
    height: 8,
  },
  toolTipContent: {
    left: 22,
    borderRadius: 8,
    right: 140,
    boxShadow: `0px 2px 15px ${colors.main.shadowBlack}`,
    minWidth: 300,
    bottom: 'auto',
    '& > div': {
      margin: 8,
    },
  },
}))
export default SMBCustomers
