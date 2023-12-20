import {
  Button,
  InjectHTML,
  TooltipPopover,
  TwoColumnLayout,
} from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core'
import { InfoIconWhite } from 'src/blitz/assets/react-icons'
import { COMPONENT_WRAPPER, CTA_BUTTON, SITE_INTERACTION } from 'src/constants'
import { useAppData } from 'src/hooks'
import colors from 'src/styles/theme/colors'

const TwoColumnLayoutWithImage = () => {
  const data = useAppData('twoColumnLayoutGlobal', true)

  const {
    title,
    description,
    image,
    mobileImage,
    tooltipContent,
    tooltipColorCode,
    contentBlockColorCode,
    descriptionColorCode,
    titleColorCode,
    legalText,
    backgroundColor,
    button,
  }: any = data

  const classes = useStyles({
    contentBlockColorCode,
    tooltipColorCode,
    backgroundColor,
  })()

  const ImageContent = () => (
    <>
      {title?.value && (
        <div className={classes.ImageContent}>
          {title?.value && (
            <InjectHTML
              tagType="h2"
              styleType="h3"
              color={titleColorCode?.targetItem?.color?.value}
              value={title?.value}
              className={classes.titleStyles}
            />
          )}
          <div>
            {description?.value && (
              <InjectHTML
                tagType="span"
                styleType="p1"
                color={descriptionColorCode?.targetItem?.color?.value}
                className={classes.description}
                value={description?.value}
              />
            )}
            {tooltipContent?.value && (
              <TooltipPopover
                tooltipIcon={<InfoIconWhite />}
                dropShadow={false}
                tooltipContent={tooltipContent?.value}
                tooltipClassName={classes.toolTipIconStyles}
              />
            )}
            {button?.text && (
              <div className={classes.buttonContainer}>
                <Button
                  type="link"
                  hoverVariant="secondary"
                  text={button?.text}
                  className={classes.btn}
                  triggerEvent={true}
                  href={button?.url}
                  eventObj={{
                    events: 'event14',
                    eVar14: `${CTA_BUTTON}:call-now`,
                  }}
                  interactionType={SITE_INTERACTION}
                />
              </div>
            )}
            {legalText?.value && (
              <InjectHTML
                className={classes.legalText}
                tagType="p"
                data-testid="caption"
                styleType="legal"
                value={legalText?.value}
              />
            )}
          </div>
        </div>
      )}
    </>
  )

  if (!title || !description) {
    return null
  }

  return (
    <div id="two-column-layout-with-image" className={classes.container}>
      <div className={classes.wrapper}>
        <TwoColumnLayout
          gridClassName={classes.gridBlockStyle}
          imageWrapperClassName={classes.imageWrapper}
          className={classes.className}
          image={image?.src}
          mobileImage={mobileImage?.src}
          title={image?.alt}
          content={<ImageContent />}
          reverse={true}
          gridItemClassName={classes.gridItemContent}
          mobileReverse={true}
        />
      </div>
    </div>
  )
}

const useStyles = ({
  contentBlockColorCode,
  tooltipColorCode,
  backgroundColor,
}: any) =>
  makeStyles(({ breakpoints }) => ({
    container: {
      background: backgroundColor?.targetItem?.color?.value,
    },
    className: {
      background: backgroundColor?.targetItem?.color?.value,
    },
    wrapper: {
      ...COMPONENT_WRAPPER,
      padding: 0,
      margin: '0 auto',
      paddingBottom: '60px',
      [breakpoints.down('sm')]: {
        padding: '2.5rem 1rem 2rem',
      },
    },
    gridBlockStyle: {
      flexWrap: 'initial',
    },
    ImageContent: {
      backgroundColor:
        contentBlockColorCode?.targetItem?.color?.value || colors.main.grey,
      borderRadius: '0px 32px 32px 0px',
      padding: '4rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      [breakpoints.down('sm')]: {
        padding: '1.75rem',
        borderRadius: '0px 0px 32px 32px',
        width: '100%',
      },
    },
    imageWrapper: {
      background: backgroundColor?.targetItem?.color?.value,
      [breakpoints.down('sm')]: {
        marginRight: 0,
      },
      '& img': {
        display: 'flex',
        borderRadius: '32px 0px 0px 32px',
        maxHeight: '454px',
        objectPosition: 'center right',
        [breakpoints.down('sm')]: {
          borderRadius: '32px 32px 0px 0px',
          minHeight: 'unset',
        },
      },
    },
    titleStyles: {
      marginBottom: 12,
      [breakpoints.down('sm')]: {
        fontSize: '1.5rem',
        textAlign: 'center',
      },
    },
    toolTipIconStyles: {
      color: tooltipColorCode?.targetItem?.color?.value || 'initial',
    },
    description: {
      display: 'initial',
    },
    legalText: {
      color: colors.main.midnightExpress,
      margin: '1rem 0 0',
    },
    buttonContainer: {
      marginTop: '1rem',
    },
    btn: {
      '&:hover': {
        color: `${colors.main.midnightExpress} !important`,
        backgroundColor: `${colors.main.brightRed} !important`,
      },
      [breakpoints.down('xs')]: {
        padding: '.75rem',
      },
    },
    gridItemContent: {
      minWidth: '500px',
      flex: '0 0 500px',
      [breakpoints.down('sm')]: {
        minWidth: 'unset',
        flex: 'unset',
      },
    },
  }))

export default TwoColumnLayoutWithImage
