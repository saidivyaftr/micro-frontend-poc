import {
  Button,
  Hero,
  InjectHTML,
  TooltipPopover,
} from '@/shared-ui/components'
import InfoIconWhite from '@/shared-ui/react-icons/info-icon-white'
import { makeStyles } from '@material-ui/core'
import { useAppData } from 'src/hooks'

const YTVSection = ({ styles }: any) => {
  const classes = useStyles()
  const data = useAppData('ytvSection', true)
  const {
    title,
    subTitle,
    toolTipText,
    desktopImage,
    mobileImage,
    description,
    firstBtn,
    secondBtn,
    disclaimer,
  }: any = data

  if (!title?.value || !description?.value) {
    return null
  }

  return (
    <Hero
      backgroundColor="gravity"
      styles={styles}
      removeStripes={true}
      isZoomedOutMaxWidth={true}
      backgroundImage={desktopImage?.src}
      mobileBackgroundImage={mobileImage?.src}
      bkgImgClassName={classes.heroBkgd}
      leftContentClassName={classes.HeroLeftContent}
      contentClassName={classes.HeroContent}
      content={
        <div className={classes.container}>
          {title?.value && (
            <InjectHTML
              tagType="h2"
              styleType="h3"
              fontType="boldFont"
              color="tertiary"
              className={classes.title}
              value={title?.value}
              data-testid="title-value"
            />
          )}
          <div>
            {subTitle?.value && (
              <InjectHTML
                tagType="h1"
                styleType="h5"
                fontType="boldFont"
                color="tertiary"
                className={classes.subtitle}
                value={subTitle?.value}
                data-testid="subtitle-value"
              />
            )}
            {toolTipText?.value && subTitle?.value && (
              <TooltipPopover
                tooltipClassName={classes.toolTip}
                dropShadow={false}
                tooltipContent={toolTipText?.value}
                tooltipDirection="bottom"
                tooltipIcon={<InfoIconWhite />}
              />
            )}
          </div>
          {description?.value && (
            <InjectHTML
              tagType="p"
              styleType="p1"
              color="tertiary"
              fontType="regularFont"
              className={classes.description}
              value={description?.value}
              data-testid="description-value"
            />
          )}
          {disclaimer?.value && (
            <InjectHTML
              className={classes.disclaimer}
              tagType="p"
              styleType="p1"
              color="tertiary"
              fontType="boldFont"
              value={disclaimer?.value}
              data-testid="legal-value"
            />
          )}
          <div className={classes.btnContainer}>
            {firstBtn?.text && (
              <Button
                type="link"
                hoverVariant="secondary"
                target="_blank"
                text={firstBtn?.text}
                href={firstBtn?.url}
                className={classes.btn}
              />
            )}
            <Button
              className={classes.secondBtn}
              type="link"
              target="_blank"
              variant="white"
              href={secondBtn?.url}
              text={secondBtn?.text}
            />
          </div>
        </div>
      }
    />
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  container: {
    maxWidth: '600px',
    [breakpoints.between(1024, 1140)]: {
      maxWidth: '550px',
    },
    [breakpoints.down('sm')]: {
      maxWidth: 'unset',
      paddingTop: '70vw',
    },
    '& svg': { top: 'unset' },
  },
  HeroContent: {
    margin: '0 auto',
  },
  btn: {
    maxWidth: '100% !important',
  },

  HeroLeftContent: {
    [breakpoints.down('md')]: {
      maxWidth: 'unset',
    },
  },
  heroBkgd: {
    minHeight: 'min(42vw, 600px) !important',
    [breakpoints.between(0, 1023.95)]: {
      minHeight: 'unset',
      backgroundSize: 'clamp(200px, 90%, 800px) auto !important',
      backgroundPosition: 'center 8% !important',
    },
    [breakpoints.up(1024)]: {
      backgroundSize: '43% !important',
      backgroundPosition: 'center right 16px !important',
    },
  },
  title: {
    marginBottom: '1.5rem',
    [breakpoints.down('md')]: {
      marginBottom: '1rem',
    },
  },
  subtitle: {
    display: 'inline-flex',
    [breakpoints.down('md')]: {
      display: 'initial',
      margin: '1rem 0',
    },
    '& sup': {
      fontSize: '12px',
      lineHeight: 1,
    },
  },
  description: {
    marginTop: '1.5rem',
    [breakpoints.down('md')]: {
      marginTop: '1rem',
    },
  },
  btnContainer: {
    display: 'flex',
    gap: '24px',
    margin: '1.5rem 0',
    [breakpoints.down('md')]: {
      marginTop: '1rem',
      marginBottom: '1.625rem',
    },
    [breakpoints.down('sm')]: {
      flexDirection: 'column',
      gap: '1rem',
    },
  },
  secondBtn: {
    maxWidth: '100% !important',
    [breakpoints.up('xs')]: {
      paddingRight: '4rem',
      paddingLeft: '4rem',
    },
  },
  toolTip: {
    color: 'white',
    display: 'inline',
  },
  disclaimer: {
    marginTop: '1.5rem',
    marginBottom: '1.5rem',
    [breakpoints.down('sm')]: {
      marginTop: '1rem',
      marginBottom: '1rem',
    },
  },
}))

export default YTVSection
