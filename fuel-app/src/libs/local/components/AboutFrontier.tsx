import { makeStyles } from '@material-ui/core'
import { Typography, InjectHTML } from '@/shared-ui/components'
import colors from '@/shared-ui/colors'

const AboutFrontier = (data: any) => {
  const classes = useStyles()
  const { heading, description, linkText, linkUrl }: any = data?.data

  if (!heading || !description) {
    return null
  }

  return (
    <div
      id="about-frontier"
      className={classes.root}
      data-testid="AboutFrontier-local"
    >
      <div className={classes.wrapper}>
        <Typography tagType="h2" styleType="h3" className={classes.title}>
          {heading?.value}
        </Typography>
        <InjectHTML
          className={classes.paragraph}
          styleType="p1"
          tagType="p"
          value={description?.value as string}
        />
        <a href={linkUrl?.url || ''}>
          <InjectHTML
            styleType="p1"
            tagType="span"
            className={classes.link}
            value={linkText?.value as string}
          />
        </a>
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {},
  wrapper: {
    maxWidth: 994,
    margin: 'auto',
    padding: '5rem  7.5rem',
    boxSizing: 'content-box',
    [breakpoints.down('lg')]: {
      padding: '5rem  4rem',
    },
    [breakpoints.down('sm')]: {
      padding: '3rem 1rem',
    },
  },
  title: {
    marginBottom: '2rem',
    [breakpoints.down('sm')]: {
      marginBottom: '1rem',
    },
  },
  paragraph: {
    margin: 0,
  },
  link: {
    textDecoration: 'underline',
    display: 'inline-block',
    marginTop: '1rem',
    fontWeight: 700,
    '&:hover': {
      color: colors.main.brightRed,
      textDecorationColor: colors.main.brightRed,
    },
  },
}))

export default AboutFrontier
