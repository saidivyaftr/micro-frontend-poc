import {
  Button,
  InjectHTML,
  TooltipPopover,
  TwoColumnLayout,
} from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core'
import { InfoIconWhite } from 'src/blitz/assets/react-icons'
import { COMPONENT_WRAPPER, CTA_BUTTON, SITE_INTERACTION } from 'src/constants'
import { useAppData, useChatState } from 'src/hooks'
import colors from 'src/styles/theme/colors'

const TwoColumnLayoutWithImage = () => {
  const data = useAppData('twoColumnLayoutGlobal', true)
  const { setChatState } = useChatState()

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
                  className={
                    contentBlockColorCode?.targetItem?.color?.value !==
                    '#141928'
                      ? classes.btn
                      : ''
                  }
                  onClick={() => setChatState(true)}
                  triggerEvent={true}
                  eventObj={{
                    events: 'event14',
                    eVar14: `${CTA_BUTTON}:chat-now`,
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
    <div id="whole-home-Wi-Fi" className={classes.container}>
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
        padding: '0 1rem',
        paddingBottom: '2rem',
        paddingTop: '3rem',
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
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      [breakpoints.down('sm')]: {
        padding: '2rem',
        borderRadius: '0px 0px 32px 32px',
      },
    },
    imageWrapper: {
      background: backgroundColor?.targetItem?.color?.value,
      [breakpoints.up('md')]: {
        height: '100%',
      },
      [breakpoints.down('sm')]: {
        marginRight: 0,
      },
      '& img': {
        display: 'flex',
        borderRadius: '32px 0px 0px 32px',
        maxHeight: '408px',
        [breakpoints.down('sm')]: {
          borderRadius: '32px 32px 0px 0px',
          maxHeight: 'unset',
        },
      },
    },
    titleStyles: {
      marginBottom: 12,
      [breakpoints.down('sm')]: {
        fontSize: '1.5rem',
      },
    },
    toolTipIconStyles: {
      display: 'initial',
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
      marginTop: '2rem',
    },
    btn: {
      '&:hover': {
        color: `${colors.main.midnightExpress} !important`,
        backgroundColor: `${colors.main.brightRed} !important`,
      },
    },
  }))

export default TwoColumnLayoutWithImage
