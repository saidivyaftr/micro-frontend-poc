import { makeStyles } from '@material-ui/core'
import { Button, Typography } from '@/shared-ui/components'
import { useAppData } from 'src/hooks'
import colors from '@/shared-ui/colors'

const PreferToCall = () => {
  const classes = useStyles()
  const { heading, buttonText, buttonSrc }: any = useAppData(
    'PreferToCall',
    true,
  )

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        {heading?.value && (
          <Typography
            tagType="h4"
            styleType="h4"
            fontType="boldFont"
            className={classes.heading}
            color="secondary"
          >
            {heading?.value}
          </Typography>
        )}
        <div>
          {buttonText?.value && (
            <Button
              type="link"
              href={buttonSrc?.url}
              text={buttonText?.value}
              hoverVariant="secondary"
            />
          )}
        </div>
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: { background: colors.main.midnightExpress },
  wrapper: {
    display: 'flex',
    gap: '1.25rem',
    justifyContent: 'center',
    alignItems: 'center',
    [breakpoints.down('sm')]: {
      flexDirection: 'column',
      textAlign: 'center',
    },
    padding: '2.5rem 1rem',
  },
  heading: {
    [breakpoints.down('sm')]: {
      margin: '1rem',
      textAlign: 'center',
      fontSize: '1.125rem',
      lineHeight: '1.625rem',
    },
  },
}))

export default PreferToCall
