import { makeStyles } from '@material-ui/core'
import { Typography, InjectHTML } from '@/shared-ui/components'
import { useAppData } from 'src/hooks'

const WhereToFindModalContent = () => {
  const classes = useStyles()
  const { wheretofind, wheretofindpoint1, wheretofindpoint2 } = useAppData(
    'resultScenario',
    true,
  )
  return (
    <div className={classes.container}>
      <Typography
        tagType="h3"
        styleType="h4"
        className={classes.title}
        testId="test-title"
      >
        {wheretofind?.value}
      </Typography>
      <div className={classes.description}>
        <ul>
          <li className={classes.list}>
            <InjectHTML
              value={wheretofindpoint1?.value}
              tagType="div"
              styleType="p1"
            />
          </li>
          <li className={classes.list}>
            <InjectHTML
              value={wheretofindpoint2?.value + '.'}
              tagType="div"
              styleType="p1"
            />
          </li>
        </ul>
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  container: {
    padding: '1.5rem',
    [breakpoints.down('xs')]: {
      padding: '0rem',
    },
  },
  title: {
    textAlign: 'center',
    [breakpoints.down('xs')]: {
      marginTop: '1rem',
      textAlign: 'left',
    },
  },
  description: {
    '& ul': {
      margin: 0,
      paddingLeft: '1rem',
    },
  },
  list: {
    margin: '1rem 0',
    textAlign: 'left',
  },
}))

export default WhereToFindModalContent
