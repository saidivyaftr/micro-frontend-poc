import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@/shared-ui/components'
import Link from 'next/link'
import colors from '@/shared-ui/colors'
import { useAppData } from 'src/hooks'
import Image from 'next/image'

const GovernmentAgency: React.FC = () => {
  const classes = useStyles()
  const {
    title,
    description,
    americanRedButton,
    americanRedButtonLogoUrl,
    disasterAssistanceButton,
    disasterAssistanceButtonLogoUrl,
    femaButton,
    femaButtonLogoUrl,
  } = useAppData('governmentAgency', true)

  const myLoader = ({ src, width, quality }: any) => {
    return `${src}?w=${width}&q=${quality || 75}`
  }
  return (
    <div className={classes.root} id="governmentAgency">
      <div className={classes.content}>
        {title?.value && (
          <Typography
            tagType="div"
            styleType="h4"
            fontType="regularFont"
            color="default"
            className={classes.heading}
          >
            {title.value}
          </Typography>
        )}
        {description?.value && (
          <Typography
            tagType="div"
            styleType="h5"
            fontType="regularFont"
            color="default"
            className={classes.description}
          >
            {description.value}
          </Typography>
        )}

        <div className={classes.imageWrapperOutside}>
          <div className={classes.imageWrapperInside}>
            <Link href={americanRedButton?.url} passHref={true}>
              <a target={'_blank'}>
                <div className={classes.imageInsideWrapper}>
                  <div className={classes.imageDiv}>
                    {
                      <Image
                        loader={myLoader}
                        src={americanRedButtonLogoUrl?.value}
                        width={225}
                        height={100}
                        className={classes.image}
                        alt={'American Red'}
                      />
                    }
                  </div>
                  <div className={classes.textWrapper}>
                    <Typography
                      tagType="div"
                      styleType="h5"
                      fontType="regularFont"
                      color="default"
                      className={classes.text}
                    >
                      {americanRedButton?.text}
                    </Typography>
                  </div>
                </div>
              </a>
            </Link>
          </div>
          <div className={classes.imageWrapperInside}>
            <Link href={femaButton?.url} passHref={true}>
              <a target={'_blank'}>
                <div className={classes.imageInsideWrapper}>
                  <div className={classes.imageDiv}>
                    {
                      <Image
                        loader={myLoader}
                        src={femaButtonLogoUrl?.value}
                        width={225}
                        height={100}
                        className={classes.image}
                        alt={'Fema'}
                      />
                    }
                  </div>
                  <div className={classes.textWrapper}>
                    <Typography
                      tagType="div"
                      styleType="h5"
                      fontType="regularFont"
                      color="default"
                      className={classes.text}
                    >
                      {femaButton?.text}
                    </Typography>
                  </div>
                </div>
              </a>
            </Link>
          </div>
          <div className={classes.imageWrapperInside}>
            <Link href={disasterAssistanceButton?.url} passHref={true}>
              <a target={'_blank'}>
                <div className={classes.imageInsideWrapper}>
                  <div className={classes.imageDiv + ' ' + classes.disasterDiv}>
                    {
                      <Image
                        loader={myLoader}
                        src={disasterAssistanceButtonLogoUrl?.value}
                        width={130}
                        height={100}
                        className={classes.image}
                        alt={'Disaster Assistance Button'}
                      />
                    }
                  </div>
                  <div className={classes.textWrapper}>
                    <Typography
                      tagType="div"
                      styleType="h5"
                      fontType="regularFont"
                      color="default"
                      className={classes.text}
                    >
                      {disasterAssistanceButton?.text}
                    </Typography>
                  </div>
                </div>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '0 auto',
    width: '90%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  content: {
    padding: '70px 0px',
  },
  heading: {
    padding: '0px 0px 35px',
    textAlign: 'center',
  },
  description: {
    padding: '0px 0px 35px',
    textAlign: 'center',
    color: colors.main.outerSpace,
  },
  mainContent: {
    margin: '0 0 10px',
  },
  text: {
    marginBottom: '2rem',
    textAlign: 'center',
  },

  textWrapper: {
    height: '100px',
  },
  imageWrapperOutside: {
    display: 'flex',
    flexDirection: 'row',
    alignItem: 'center',
    justifyContent: 'space-evenly',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      justifyContent: 'center',
    },
  },
  imageWrapperInside: {
    marginTop: '50px',
    marginBottom: '30px',
    padding: '0px 30px',
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
      marginTop: '20px',
      marginBottom: '0px',
    },
  },
  imageInsideWrapper: {
    boxShadow: '1px 2px 4px rgba(0 0 0 / 25%)',
    transition: 'All 0.3s ease',
    padding: '20px',
    marginBottom: '20px',
    borderRadius: '10px',
    height: '200px',
    '&:hover': {
      transform: 'scale3d(1.05, 1.05, 1)',
    },
  },
  imageDiv: {
    margin: 'auto 20px',
    textAlign: 'center',
  },
  disasterDiv: {
    margin: '0px 40px',
  },
  image: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
}))

export default GovernmentAgency
