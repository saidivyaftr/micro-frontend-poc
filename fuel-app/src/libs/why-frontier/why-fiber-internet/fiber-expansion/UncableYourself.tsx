import {
  Button,
  ImagePerk,
  Typography,
  InjectHTML,
} from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core'
import { useAppData } from 'src/hooks'

const UncableYourself = () => {
  const {
    heading,
    subHeading,
    description,
    btnLabel,
    btnUrl,
    backgroundImage,
    mobileBackgroundImage,
  } = useAppData('UncableYourself', true)
  const classes = useStyles()

  return (
    <div id="uncable-yourself" className={classes.container}>
      <ImagePerk
        backgroundColor="primary"
        stripeColor="none"
        contentAlign="right"
        contentClassName={classes.content}
        content={
          <>
            <Typography
              color="primary"
              className={classes.heading}
              tagType="h2"
              styleType="h3"
            >
              {heading?.value}
            </Typography>
            <Typography
              className={classes.subHeading}
              tagType="h3"
              styleType="h3"
            >
              {subHeading?.value}
            </Typography>
            <InjectHTML
              tagType="p"
              styleType="p1"
              className={classes.description}
              value={description?.value}
            />

            <Button type="link" text={btnLabel?.value} href={btnUrl?.url} />
          </>
        }
        tabletBackgroundImage={backgroundImage ?? {}}
        mobileBackgroundImage={mobileBackgroundImage ?? {}}
        imageClassName={classes.image}
      />
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  container: {
    '& .ImagePerk_imageBox__awcLd': {
      alignSelf: 'flex-end',
    },
  },
  image: {
    [theme.breakpoints.up('md')]: { transform: 'scale(1.3)' },
    [theme.breakpoints.down('sm')]: { marginLeft: '0 !important' },
  },
  content: {
    borderRadius: '32px !important',
    padding: '80px 80px 120px 60px !important',
    [theme.breakpoints.down('sm')]: {
      padding: '2.5rem 1.625rem 3.5rem 1.625rem !important',
    },
  },
  heading: {
    marginTop: '0 !important',
    [theme.breakpoints.up('sm')]: { lineHeight: '2rem! important' },
  },
  subHeading: {
    marginTop: '0.5rem !important',
    marginBottom: '8px !important',
  },
  description: {
    marginBottom: '2rem',
    '& sup': { lineHeight: 0, fontSize: '50%' },
  },
  paragraphStyle: {
    marginBottom: '32px',
  },
  listItem: {
    marginBottom: 4,
  },
  bulletsStyle: {
    margin: '2px 0',
  },
  svgAlign: {
    placeSelf: 'center stretch',
  },
  legalText: {
    marginTop: '1rem',
  },
}))

export default UncableYourself
