import { makeStyles } from '@material-ui/core'
import { Typography } from 'src/blitz'
import { google, outlook, ics, CalendarEvent } from 'calendar-link'
import colors from '@/shared-ui/colors'
import useAppData from '@/shared-ui/hooks/useAppData'

interface PageProps {
  title?: any
  description?: string
  start?: string
  end?: string
}

const AddToCalendar = ({ title, description, start, end }: PageProps) => {
  const classes = useStyles()
  const event: CalendarEvent = {
    title,
    description,
    start,
    end,
  }
  const { addTo, appleCalendar, googleCalendar, outlookCalendar } =
    useAppData('addToCalendar', true) || {}
  const calendarList: any = [
    {
      title: ics(event),
      value: appleCalendar?.value,
    },
    {
      title: google(event),
      value: googleCalendar?.value,
    },
    {
      title: outlook(event),
      value: outlookCalendar?.value,
    },
  ]

  const links = calendarList.map((cal: any, index: number) =>
    <div className={classes.link} key={index}>
      <a target="_blank" href={cal.title} rel="noreferrer">
        <Typography fontType="mediumFont" styleType="p2">
          {cal.value}
        </Typography>
      </a>
    </div>,
  )
  return (
    <>
      <div className={classes.container}>
        <div className={classes.leftCol}>
          <Typography fontType="boldFont" styleType="p2">
            {addTo?.value}
          </Typography>
        </div>
        <div className={classes.linkwrapper}>
          {links}
        </div>
      </div>
    </>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  container: {
    display: 'flex',
    marginTop: '1rem',
    flexDirection: 'column',
    gap: '0.5rem',
    [breakpoints.up('md')]: {
      flexDirection: 'row',
    },
  },
  leftCol: {
    [breakpoints.up('md')]: {
      flex: '0 0 224px',
    },
  },
  link: {
    display: 'flex',
    '& a': {
      textDecorationLine: 'underline',
    },
    '& :hover': {
      color: colors.main.brightRed,
    },
    '&::after': {
      content: "'|'",
      marginLeft: 10,
      marginRight: 10,
    },
    '&:last-child::after': { content: "''" },
  },
  linkwrapper: {
    display: 'flex',
  }
}))

export default AddToCalendar
