import colors from '@/shared-ui/colors'
import {
  Button,
  InjectHTML,
  Picture,
  TooltipPopover,
} from '@/shared-ui/components'
import InfoIconWhite from '@/shared-ui/react-icons/info-icon-white'
import { makeStyles } from '@material-ui/core'

const YTVSection = ({ data }: any) => {
  const classes = useStyles()
  const {
    contentTitle,
    title,
    subTitle,
    toolTipText,
    desktopImage,
    mobileImage,
    description,
    firstBtn,
    secondBtn,
    disclaimer,
  } = data

  if (!title?.value || !description?.value) {
    return null
  }

  return (
    <div>
      {contentTitle?.value && (
        <InjectHTML
          addAnchorStyles
          tagType="h2"
          styleType="h3"
          className={classes.contentTitle}
          value={contentTitle?.value}
        />
      )}
      <div className={classes.lineContainer}>
        <div className={classes.line} />
      </div>

      <div className={classes.container}>
        <div className={classes.contentSection}>
          {title?.value && (
            <InjectHTML
              tagType="h3"
              styleType="h3"
              fontType="boldFont"
              color="tertiary"
              className={classes.title}
              value={title?.value}
              data-testid="title-value"
            />
          )}
          {subTitle?.value && (
            <div>
              <InjectHTML
                tagType="h5"
                styleType="h5"
                fontType="boldFont"
                color="tertiary"
                className={classes.subtitle}
                value={subTitle?.value}
                data-testid="subtitle-value"
              />
              {toolTipText?.value && (
                <TooltipPopover
                  tooltipClassName={classes.toolTip}
                  dropShadow={false}
                  tooltipContent={toolTipText?.value}
                  tooltipDirection="bottom"
                  tooltipIcon={<InfoIconWhite />}
                />
              )}
            </div>
          )}
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
                className={classes.firstBtn}
                type="link"
                hoverVariant="primary"
                target="_blank"
                text={firstBtn?.text}
                href={firstBtn?.url}
              />
            )}
            <Button
              className={classes.secondBtn}
              type="link"
              target="_blank"
              variant="tertiary"
              href={secondBtn?.url}
              text={secondBtn?.text}
            />
          </div>
        </div>
        <div className={classes.imageContainer}>
          <Picture
            desktop={{
              image: desktopImage?.src,
            }}
            mobile={{
              image: mobileImage?.src,
            }}
            altText={title}
          />
        </div>
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  container: {
    maxWidth: '1200px',
    margin: 'auto',
    marginTop: '80px',
    marginBottom: '100px',
    display: 'flex',
    gap: '50px',
    [breakpoints.down('lg')]: {
      padding: '0 1rem',
    },
    [breakpoints.down('sm')]: {
      gap: '16px',
    },
    [breakpoints.down('xs')]: {
      flexDirection: 'column',
      marginTop: '32px',
      marginBottom: '50px',
    },
  },
  contentSection: {
    maxWidth: '537px',
    paddingTop: '2rem',
    [breakpoints.down('sm')]: {
      maxWidth: '50%',
    },
    [breakpoints.down('xs')]: {
      paddingTop: 0,
      maxWidth: 'unset',
      order: 2,
      padding: '16px',
    },
  },
  imageContainer: {
    '& img': { width: '100%', maxWidth: '618px' },
    [breakpoints.down('sm')]: {
      maxWidth: '50%',
      width: '100%',
    },
    [breakpoints.down('xs')]: {
      order: 1,
      maxWidth: 'unset',
      '& img': { maxWidth: 'unset' },
    },
  },
  title: {
    fontSize: '1.875rem',
    lineHeight: '2.375rem',
    marginBottom: '1.5rem',
    color: colors.main.black,
    [breakpoints.down('md')]: {
      marginBottom: '1rem',
    },
    [breakpoints.down('sm')]: {
      fontSize: '1.5rem',
      lineHeight: '2rem',
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
    color: colors.main.black,
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
    [breakpoints.down('xs')]: {
      flexDirection: 'column',
      gap: '1rem',
    },
  },
  firstBtn: {
    lineHeight: '1.375rem',
    height: '2.875rem',
    [breakpoints.down('sm')]: {
      fontSize: '1.125rem',
      lineHeight: '1.125rem',
    },
  },
  secondBtn: {
    lineHeight: '1.375rem',
    height: '2.875rem',
    [breakpoints.up('xs')]: {
      paddingRight: '2rem',
      paddingLeft: '2rem',
    },
    [breakpoints.down('sm')]: {
      fontSize: '1.125rem',
      lineHeight: '1.125rem',
    },
  },
  toolTip: {
    color: 'white',
    display: 'inline',
  },
  disclaimer: {
    fontWeight: 700,
    marginTop: '1.5rem',
    marginBottom: '1.5rem',
    color: colors.main.black,
    [breakpoints.down('sm')]: {
      marginTop: '1rem',
      marginBottom: '1rem',
    },
  },
  contentTitle: {
    margin: '1rem 0.5rem',
    textAlign: 'center',
  },
  lineContainer: {
    padding: '0 1rem',
    margin: 'auto',
  },
  line: {
    height: '1px',
    width: '100%',
    maxWidth: '1200px',
    margin: '1.875rem auto 0 auto',
    backgroundColor: colors.main.borderGrey,
    [breakpoints.down('sm')]: {
      marginTop: '1rem',
    },
  },
}))

export default YTVSection
