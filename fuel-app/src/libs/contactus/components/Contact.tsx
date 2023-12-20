import { makeStyles, Grid } from '@material-ui/core'
import { Typography } from '@/shared-ui/components'
import colors from '@/shared-ui/colors'

type ContactProps = {
  title: string
  phoneNumber: string
  availability: string[]
}

const Contact = ({ title, phoneNumber, availability }: ContactProps) => {
  const classes = useStyles()

  return (
    <Grid item xs={12} sm={4} md={4} lg={4}>
      <Typography tagType="span" styleType="h6">
        {title}
      </Typography>
      <div className={classes.content}>
        <Typography
          className={classes.phoneNumber}
          tagType="p"
          styleType="p1"
          dangerouslySetInnerHTML={{
            __html: phoneNumber,
          }}
        />
        {availability &&
          availability.map((item: any) => (
            <Typography tagType="p" styleType="p1" key={item}>
              {item}
            </Typography>
          ))}
      </div>
    </Grid>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  phoneNumber: {
    textDecoration: 'underline',
    fontWeight: 'bold',
    [breakpoints.down('xs')]: {
      '& :hover': {
        color: colors.main.darkRed,
      },
    },
    '& :hover': {
      color: colors.main.brightRed,
    },
  },
  content: {
    marginTop: '0.5rem',
    '& p': { margin: '0 0 0 0' },
  },
}))

export default Contact
