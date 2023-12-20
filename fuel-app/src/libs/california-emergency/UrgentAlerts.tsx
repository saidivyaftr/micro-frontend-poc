import { makeStyles } from '@material-ui/core/styles'
import { Button, Typography } from '@/shared-ui/components'
import colors from '@/shared-ui/colors'
import { useAppData } from 'src/hooks'

const UgentAlerts: React.FC = () => {
  const classes = useStyles()()
  const { title, description, powerOutage, powerOutageButton } = useAppData(
    'urgentAlerts',
    true,
  )
  return (
    <div className={classes.root} id="urgentAlerts">
      <div className={classes.content}>
        {title?.value && (
          <Typography
            tagType="h4"
            styleType="h4"
            fontType="regularFont"
            color="default"
            className={classes.heading}
          >
            {title.value}
          </Typography>
        )}
        <div className={classes.wrapper}>
          {description?.value && (
            <Typography
              tagType="div"
              styleType="p1"
              fontType="regularFont"
              color="default"
              className={classes.description}
            >
              {description.value}
            </Typography>
          )}
          <div className={classes.mainContent}>
            {powerOutage?.value && (
              <Typography
                tagType="div"
                styleType="p1"
                fontType="regularFont"
                color="default"
                className={classes.description}
              >
                {powerOutage.value}
              </Typography>
            )}

            {powerOutageButton?.text && (
              <Button
                variant="lite"
                hoverVariant={'primary'}
                type="link"
                className={classes.btn}
                href={powerOutageButton.url}
                text={powerOutageButton.text}
                target={'_blank'}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const useStyles = () =>
  makeStyles(({ breakpoints }) => ({
    root: {
      padding: '0rem 1rem',
      [breakpoints.down('sm')]: {
        padding: '0px',
      },
    },
    heading: {
      textAlign: 'center',
      margin: '50px 0 30px',
      [breakpoints.down('sm')]: {
        fontSize: '2rem',
        fontWeight: 'bold',
        lineHeight: '1.3',
      },
    },
    description: {
      fontSize: '20px',
      lineHeight: '1.5',
      textAlign: 'center',
    },
    btn: {
      fontSize: '20px',
      color: colors.main.black,
      textDecoration: 'underline',
      marginLeft: '0.3rem',
      '&:hover': {
        color: colors.main.torchRed,
      },
    },
    content: {
      padding: '20px 0px',
      margin: '0 auto',
      width: '90%',
      [breakpoints.down('sm')]: {
        width: '100%',
      },
    },
    mainContent: {
      display: 'flex',
      paddingTop: '2rem',
      justifyContent: 'center',
      alignItems: 'center',
      [breakpoints.down('sm')]: {
        flexDirection: 'column',
      },
    },
    wrapper: {
      marginBottom: '10px',
    },
  }))

export default UgentAlerts
