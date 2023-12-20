import { makeStyles } from '@material-ui/core/styles'
import { Typography, InjectHTML } from '@/shared-ui/components'
import colors from 'src/styles/theme/colors'
import { useAppData } from 'src/hooks'

const NextSteps = ({
  emailAddress,
  isYTTVinCart,
}: {
  emailAddress: string
  isYTTVinCart: boolean
}) => {
  const { title, description, descriptionYoutubeTv } = useAppData(
    'nextSteps',
    true,
  )
  const classes = useStyles()
  const replaceEmailId = (descString: string) => {
    return descString.replace('{email}', `<strong>${emailAddress}</strong>`)
  }

  return (
    <div className={classes.nextStepWrapper}>
      <Typography styleType="h5" tagType="h5">
        {title?.value}
      </Typography>
      <hr className={classes.margin32} />
      <Typography className={classes.description} styleType="p1" tagType="div">
        <InjectHTML
          testId="confirmation-nextsteps"
          className={classes.description}
          value={replaceEmailId(
            isYTTVinCart ? descriptionYoutubeTv?.value : description?.value,
          )}
        />
      </Typography>
    </div>
  )
}

export default NextSteps

const useStyles = makeStyles(({ breakpoints }) => ({
  nextStepWrapper: {
    backgroundColor: colors.main.white,
    borderRadius: '1rem',
    padding: '2.5rem 4rem',
    [breakpoints.down('md')]: {
      padding: '2.5rem 2rem',
    },
    [breakpoints.down('sm')]: {
      padding: '2.5rem 2rem',
    },
    [breakpoints.down('xs')]: {
      padding: '1.5rem 1rem',
    },
  },
  description: {
    margin: '16px 0',
    fontSize: '18px',
    '& ul': {
      paddingTop: '0',
      [breakpoints.down('xs')]: {
        paddingTop: '0',
        paddingLeft: '18px',
      },
    },
    [breakpoints.down('xs')]: {
      wordBreak: 'break-word',
      fontSize: '16px',
      lineHeight: '24px',
    },
  },
  margin32: {
    margin: '32px 0px',
    [breakpoints.down('xs')]: {
      margin: '24px 0 0 0px',
    },
  },
}))
