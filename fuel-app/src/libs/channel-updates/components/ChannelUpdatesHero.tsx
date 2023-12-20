import { makeStyles } from '@material-ui/core'
import { InjectHTML, Typography } from '@/shared-ui/components'
import { COMPONENT_WRAPPER } from 'src/constants'

const ChannelUpdatesHero = ({ data }: any) => {
  const classes = useStyles()
  const { heading, description } = data
  if (Object.keys(data)?.length === 0) {
    return null
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.section}>
        <Typography styleType="h4" tagType="h2" className={classes.header}>
          {heading?.value}
        </Typography>
        <InjectHTML
          addAnchorStyles
          styleType="p1"
          value={description?.value}
          className={classes.description}
        />
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  wrapper: {
    ...COMPONENT_WRAPPER,
    textAlign: 'left',
    maxWidth: '996px',
  },
  header: {
    marginTop: '1.5rem',
  },
  section: {
    paddingTop: '4.25rem',
    textAlign: 'left',
    [breakpoints.down('sm')]: {
      paddingTop: '1rem',
    },
  },
  description: {
    paddingTop: '1.25rem',
    maxWidth: 'auto',
    margin: 'auto',
    '& ul': {
      paddingLeft: '1rem',
    },
    '& ul li': {
      marginBottom: '1rem',
    },
  },
}))

export default ChannelUpdatesHero
