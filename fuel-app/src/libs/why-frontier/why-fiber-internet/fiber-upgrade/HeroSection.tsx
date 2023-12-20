import { Typography, InjectHTML, Hero, TooltipPopover } from 'src/blitz'
import { makeStyles } from '@material-ui/core'
import clx from 'classnames'
import colors from '@/shared-ui/colors'
import { InfoIconWhite } from '@/shared-ui/react-icons'
import { useAppData } from 'src/hooks'
const HeroSection: React.FC = () => {
  const {
    title,
    description,
    image,
    mobileImage,
    legalText,
    toolTipText,
  }: any = useAppData('hero', true) || {}

  const [firstTitle = '', firstTitle2 = '', ...secondTitle] =
    title?.value.split(' ') || []
  const classes = useStyles({ mobileImage })()

  const renderContent = () => {
    return (
      <>
        <Typography tagType="h1" styleType="h1" color="default">
          {`${firstTitle} ${firstTitle2}`}
        </Typography>
        <Typography tagType="h1" styleType="h1" color="default">
          {secondTitle?.join(' ') || ''}
        </Typography>
        {description?.value && (
          <Typography
            styleType="h5"
            color="default"
            className={classes.description}
          >
            {description.value}
          </Typography>
        )}
        {toolTipText?.value && (
          <TooltipPopover
            tooltipDirection={'bottom'}
            tooltipContent={toolTipText?.value}
            tooltipIcon={<InfoIconWhite />}
          />
        )}
        {legalText?.value && (
          <InjectHTML
            tagType="p"
            data-testid="caption"
            styleType="legal"
            value={legalText?.value}
          />
        )}
      </>
    )
  }
  return (
    <div className={clx(classes.root)}>
      <Hero
        backgroundColor="clarity"
        className={clx('hero', classes.hero)}
        content={renderContent()}
        backgroundImage={image?.src}
        mobileBackgroundImage={mobileImage?.src}
        removeStripes={false}
        stripesTitleWrapperClass={classes.content}
        stripesClass={classes.stripesClass}
        stripeStyles={{ height: 30, marginBottom: 15 }}
        stripeColor="primary"
        contentClassName={classes.contentStyles}
        leftContentClassName={classes.leftContentStyles}
      />
    </div>
  )
}

const useStyles = ({ mobileImage }: any) =>
  makeStyles(({ breakpoints }) => ({
    root: {
      position: 'relative',
      [breakpoints.down('sm')]: {
        backgroundColor: colors.main.lightGray,
      },
    },
    content: {
      width: '40%',
      [breakpoints.down('md')]: {
        width: '50%',
      },
      [breakpoints.down('sm')]: {
        paddingBottom: '26vh',
        width: '100%',
      },
    },
    contentStyles: {
      margin: '0px auto',
      padding: 0,
      [breakpoints.down('md')]: {
        padding: '0px 16px',
      },
      [breakpoints.down('xs')]: {
        minHeight: '33.5rem',
      },
    },
    hero: {
      marginLeft: 'auto',
      marginRight: 'auto',
      paddingTop: 128,
      paddingBottom: 128,
      minHeight: 'auto',
      backgroundPosition: 'inherit',
      '& h1': {
        letterSpacing: 2,
      },
      [breakpoints.down('sm')]: {
        paddingTop: 60,
        minHeight: '43rem',
        paddingBottom: 12,
        backgroundImage: `url(${mobileImage?.src})`,
        backgroundPosition: '50%',
        backgroundSize: 'cover',
      },
      [breakpoints.down('xs')]: {
        minHeight: '35.5rem',
      },
    },
    stripesClass: {
      left: '32.5%',
      top: '0.53125rem !important',
      [breakpoints.down('md')]: {
        left: '38%',
      },
      [breakpoints.down('sm')]: {
        left: 0,
        display: 'block',
        top: '60% !important',
      },
      [breakpoints.down('xs')]: {
        top: '56% !important',
      },
    },
    description: {
      display: 'inline-block',
      maxWidth: '476px',
      width: '100%',
      marginTop: '1rem',
      [breakpoints.down('sm')]: {
        maxWidth: '100%',
      },
    },

    leftContentStyles: {
      justifyContent: 'flex-start',
      [breakpoints.down('sm')]: {
        maxWidth: '100%',
      },
    },
  }))

export default HeroSection
