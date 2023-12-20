import {
  Button,
  ImagePerk,
  Typography,
  InjectHTML,
  Tooltip,
} from '@/shared-ui/components'
import { InfoIconWhite } from '@/shared-ui/react-icons'
import { makeStyles } from '@material-ui/core'
import { useAppData } from 'src/hooks'
import { IShopComponents } from './types'

const UncableYourself = ({ styles }: IShopComponents) => {
  const {
    heading,
    subHeading,
    description,
    btnLabel,
    btnUrl,
    backgroundImage,
    mobileBackgroundImage,
    disclaimerText,
    toolTipText,
    tooltipDirection,
  } = useAppData('UncableYourself', true)
  const classes = useStyles()
  return (
    <div id="uncable-yourself" className={classes.container} style={styles}>
      <ImagePerk
        backgroundColor="primary"
        stripeColor="black"
        contentAlign="right"
        contentClassName={classes.content}
        imageStyleClassName={classes.imageBox}
        linesBgColorsClass={classes.stripesStyles}
        className={classes.imagePerk}
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
            {toolTipText?.value && (
              <Tooltip
                tooltipDirection={tooltipDirection?.value}
                tooltipText={toolTipText?.value}
                includeBorder={true}
                dropShadow
                tooltipClassName={classes.tooltip}
                tooltipIcon={<InfoIconWhite />}
              ></Tooltip>
            )}
            {disclaimerText?.value && (
              <InjectHTML
                className={classes.legalDisclaimer}
                tagType="p"
                data-testid="caption"
                styleType="legal"
                value={disclaimerText?.value}
              />
            )}
            <Button
              className={classes.buttonLink}
              type="link"
              text={btnLabel?.value}
              href={btnUrl?.url}
            />
          </>
        }
        tabletBackgroundImage={backgroundImage ?? {}}
        mobileBackgroundImage={mobileBackgroundImage ?? {}}
        imageClassName={classes.image}
      />
    </div>
  )
}

export default UncableYourself

const useStyles = makeStyles((theme) => ({
  container: {
    '& .ImagePerk_imageBox__awcLd': {
      alignSelf: 'flex-end',
    },
  },
  imageBox: {
    alignSelf: 'flex-end',
  },
  image: {
    [theme.breakpoints.up('md')]: { transform: 'scale(1.7)' },
    [theme.breakpoints.only('md')]: { transform: 'scale(2)', left: '10rem' },
    [theme.breakpoints.down('sm')]: { marginLeft: '0 !important' },
  },
  content: {
    borderRadius: '2rem',
    padding: '80px 80px 0px 60px !important',
    [theme.breakpoints.down('sm')]: {
      padding: '2.5rem 1.625rem 3.5rem 1.625rem !important',
    },
  },
  heading: {
    marginTop: '0 !important',
    [theme.breakpoints.up('sm')]: { lineHeight: '2rem! important' },
  },
  subHeading: {
    margin: '0.5rem 0rem 0.5rem 0rem !important',
    [theme.breakpoints.down('xs')]: {
      margin: '0rem 0rem 0.5rem 0rem !important',
    },
  },
  description: {
    display: 'inline',
    '& sup': { lineHeight: 0, fontSize: '50%' },
    [theme.breakpoints.down('sm')]: {
      marginTop: 0,
    },
  },
  stripesStyles: {
    '& div': {
      right: '0% !important',
    },
    [theme.breakpoints.down('xs')]: {
      position: 'absolute',
      top: '85%',
    },
    [theme.breakpoints.down('xs')]: {
      '& div': {
        height: '18px',
        bottom: 'calc(18% + 25px)',
        '&:first-of-type': {
          bottom: '18%',
        },
        '&:last-of-type': {
          bottom: 'calc(18% + 50px)',
        },
      },
    },
  },
  imagePerk: {
    maxWidth: 1200,
    margin: 'auto',
    // [theme.breakpoints.up('sm')]: {
    //   flexDirection: 'column',
    // },
  },
  legalDisclaimer: {
    marginTop: '1rem',
    '& sup': { lineHeight: '0' },
  },
  tooltip: {
    display: 'inline',
  },
  buttonLink: {
    marginTop: '2rem',
  },
}))
