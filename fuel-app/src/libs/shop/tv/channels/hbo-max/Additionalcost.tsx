import colors from '@/shared-ui/colors'
import { InjectHTML } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core'
import { COMPONENT_WRAPPER } from 'src/constants'
import { PP_OBJECT_SANS_MEDIUM } from 'src/constants/fontFamilyNames'
import { useAppData } from 'src/hooks'

const AdditionalCost = () => {
  const classes = useStyles()
  const data = useAppData('Additionalcost', true)
  const { cardsData, title, subtitle, description }: any = data

  if (!title?.value) {
    return null
  }

  return (
    <div id="additional-cost" className={classes.root}>
      <div className={classes.container}>
        <div className={classes.titleContainer}>
          <InjectHTML
            color="secondary"
            tagType="h3"
            styleType="h3"
            className={classes.title}
            value={title?.value}
          />
          <InjectHTML
            color="tertiary"
            className={classes.subTitle}
            tagType="h3"
            styleType="h3"
            value={subtitle?.value}
          />
          <InjectHTML
            color="tertiary"
            className={classes.description}
            styleType="h6"
            fontType="boldFont"
            value={description?.value}
          />
        </div>
        <div className={classes.cardsContainer}>
          {cardsData?.targetItems?.map((eachCard: any, index: number) => (
            <div className={classes.card} key={index}>
              <InjectHTML
                className={classes.heading}
                tagType="h5"
                styleType="h2"
                value={eachCard?.heading?.value}
              />
              <InjectHTML
                className={classes.subHeading}
                tagType="p"
                styleType="p1"
                value={eachCard?.subHeading?.value}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdditionalCost

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    padding: '80px 0',
    backgroundColor: colors.main.midnightExpress,
    [breakpoints.down('md')]: {
      padding: '40px 16px',
    },
  },
  container: {
    ...COMPONENT_WRAPPER,
    [breakpoints.down('xs')]: {
      padding: 0,
    },
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '0 150px',
    [breakpoints.down('sm')]: {
      padding: '0 32px',
    },
  },
  cardsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    [breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  card: {
    backgroundColor: colors.main.grey,
    padding: '2rem',
    borderRadius: '16px',
    width: '23%',
    [breakpoints.down('sm')]: {
      width: '100%',
      '&:not(:last-child)': {
        marginBottom: '1rem',
      },
    },
  },
  subTitle: {
    textAlign: 'center',
  },
  title: {
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
    marginTop: '1rem',
    marginBottom: '2rem',
    [breakpoints.down('xs')]: {
      marginBottom: '1rem',
    },
  },
  heading: {
    marginBottom: '1rem',
  },
  subHeading: {
    '& a': {
      fontFamily: PP_OBJECT_SANS_MEDIUM,
      textDecoration: 'underline',
      '&:hover': {
        color: colors.main.brightRed,
      },
    },
  },
}))
