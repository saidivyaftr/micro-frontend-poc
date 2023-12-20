import { makeStyles, Grid } from '@material-ui/core'
import colors from '@/shared-ui/colors'
import Contact from './Contact'

const ChatNow = ({ data }: any) => {
  const classes = useStyles()

  if (!data || Object.keys(data || {}).length == 0) {
    return null
  }
  const { contacts } = data || {}
  const result = contacts.list.map((element: any) => {
    const value = element.availability.value.split(', ')
    return {
      ...element,
      availability: { value },
    }
  })

  return (
    <div className={classes.container}>
      <Grid container spacing={4}>
        {result &&
          result.map((item: any) => (
            <Contact
              title={item.title.value}
              phoneNumber={item.phoneNumber.value}
              availability={item.availability.value}
              key={item}
            />
          ))}
      </Grid>
    </div>
  )
}

const useStyles = makeStyles(() => ({
  container: {
    marginTop: '1rem',
    background: colors.main.newBackgroundGray,
    width: '100%',
    height: 'auto',
    borderRadius: '2rem',
    padding: '2rem 1rem',
  },
}))

export default ChatNow
