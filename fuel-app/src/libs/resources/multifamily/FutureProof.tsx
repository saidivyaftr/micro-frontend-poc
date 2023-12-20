import { makeStyles } from '@material-ui/core'
import { Picture } from '@/shared-ui/components'
import { Typography } from '@/shared-ui/components'
import { CheckMarkThin } from '@/shared-ui/react-icons'
import { COMPONENT_WRAPPER } from 'src/constants'
import { useAppData } from 'src/hooks'
const FutureProof = () => {
  const classes = useStyles()
  const { benefits, image, title, mobileImage } = useAppData(
    'futureProofComponent',
    true,
  )
  if (!benefits || Object.keys(benefits?.list)?.length === 0) {
    return null
  }
  return (
    <div className={classes.root}>
      <div className={classes.NonImageContainer}>
        <Typography
          tagType="p"
          styleType="h3"
          className={classes.TwoGigImageTitle}
        >
          {title?.value}
        </Typography>
        <ul>
          {benefits?.list?.map((item: any, i: number) => (
            <li key={i} className={classes.checkList}>
              <CheckMarkThin />
              <Typography tagType="span" styleType="p1">
                {item?.text?.value}
              </Typography>
            </li>
          ))}
        </ul>
      </div>
      <div className={classes.imageStyle}>
        <Picture
          testId="test-image"
          desktop={{ image: image?.src }}
          tablet={{ image: image?.src }}
          mobile={{ image: mobileImage?.src }}
          altText={image?.alt}
        />
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    ...COMPONENT_WRAPPER,
    display: 'flex',
    marginTop: '3rem',
    [breakpoints.down('sm')]: {
      display: 'block',
    },
    [breakpoints.down('xs')]: {
      marginTop: '2rem',
    },
  },
  imageStyle: {
    width: '50%',
    '& img': {
      borderRadius: 32,
      maxWidth: '100%',
      [breakpoints.down('md')]: {
        borderRadius: 16,
      },
    },
    [breakpoints.down('md')]: {
      width: '100%',
      marginTop: 10,
    },
  },
  TwoGigImageTitle: {
    marginTop: '0',
    marginBottom: '1rem',
    [breakpoints.down('sm')]: {
      marginBottom: '1.25rem',
    },
  },
  NonImageContainer: {
    width: '50%',
    marginRight: 'auto',
    display: 'flex',
    flexDirection: 'column',
    padding: 16,
    [breakpoints.down('md')]: {
      width: '100%',
      padding: 0,
    },
    '& ul': {
      listStyle: 'none',
      padding: 0,
      marginTop: 0,
      '& li': {
        [breakpoints.down('sm')]: {
          marginBottom: '0.5rem',
        },
      },
    },
  },
  checkList: {
    marginBottom: 16,
    display: 'flex',
    alignItems: 'baseline',
    '& svg': {
      marginRight: 10,
      width: 17,
      height: 13,
    },
  },
}))

export default FutureProof
