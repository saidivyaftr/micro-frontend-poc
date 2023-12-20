import { makeStyles } from '@material-ui/core'
import { Button, InjectHTML, TwoColumnLayout } from '@/shared-ui/components'
import { COMPONENT_WRAPPER } from 'src/constants'
import { useAppData, useWindowDimensions } from 'src/hooks'
import { useMemo } from 'react'

const EeroSecure = () => {
  const {
    image,
    mobileImage,
    buttonUrl,
    buttonText,
    description,
    title,
    logoImage,
    logoMobileImage,
    contentBlockColorCode,
    tooltipColorCode,
    backgroundColor,
    paddingTopMobile,
    paddingBottomMobile,
    paddingTopDesktop,
    paddingBottomDesktop,
  } = useAppData('EeroSecure', true)

  const classes = useStyles({
    contentBlockColorCode,
    tooltipColorCode,
    backgroundColor,
    logo: logoImage?.src,
    mobileLogo: logoMobileImage?.src,
  })()

  const mobileDevice = 768
  const { width } = useWindowDimensions()
  const isMobile = width <= mobileDevice
  const styles = useMemo(() => {
    if (isMobile) {
      return {
        ...(paddingTopMobile?.value && { paddingTop: paddingTopMobile?.value }),
        ...(paddingBottomMobile?.value && {
          paddingBottom: paddingBottomMobile?.value,
        }),
      }
    } else {
      return {
        ...(paddingTopDesktop?.value && {
          paddingTop: paddingTopDesktop?.value,
        }),
        ...(paddingBottomDesktop?.value && {
          paddingBottom: paddingBottomDesktop?.value,
        }),
      }
    }
  }, [isMobile])

  const ImageContent = () => (
    <div id="eero-secure" className={classes.ImageContent}>
      {logoImage?.src && (
        <InjectHTML
          tagType="h1"
          className={classes.title}
          value={title?.value}
        />
      )}
      <div>
        {description?.value && (
          <InjectHTML
            tagType="span"
            styleType="p1"
            className={classes.description}
            value={description?.value}
          />
        )}
        {buttonText?.value && (
          <div className={classes.buttonContainer}>
            <Button
              type="link"
              variant="secondary"
              text={buttonText?.value}
              href={buttonUrl?.value}
              triggerEvent={true}
            />
          </div>
        )}
      </div>
    </div>
  )

  if (!title?.value || !description?.value) {
    return null
  }
  return (
    <div className={classes.wrapper} style={styles}>
      <TwoColumnLayout
        gridClassName={classes.gridBlockStyle}
        imageWrapperClassName={classes.imageWrapper}
        image={image?.src}
        mobileImage={mobileImage?.src}
        title={image?.alt}
        content={<ImageContent />}
        testId="Image-id"
        mobileReverse={true}
        imageClassName={classes.gridImage}
      />
    </div>
  )
}

const useStyles = ({ logo, mobileLogo }: any) =>
  makeStyles(({ breakpoints }) => ({
    wrapper: {
      ...COMPONENT_WRAPPER,
      paddingTop: 60,
      margin: '0 auto',
      paddingBottom: '60px',
      [breakpoints.down('sm')]: {
        paddingBottom: '60px',
        paddingTop: 30,
      },
    },
    gridBlockStyle: {
      flexWrap: 'initial',
    },
    title: {
      fontSize: 0,
      height: '48px',
      width: '340px',
      backgroundRepeat: 'none',
      backgroundImage: `url(${logo})`,
      marginBottom: '2rem',
      [breakpoints.down('sm')]: {
        backgroundImage: `url(${mobileLogo})`,
        height: '38px',
        marginTop: '32px',
        width: '272px',
      },
    },
    ImageContent: {
      borderRadius: 32,
      padding: '4rem',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      [breakpoints.down('sm')]: {
        padding: 0,
        borderRadius: 32,
      },
    },
    imageWrapper: {
      marginRight: -2,
      [breakpoints.up('md')]: {
        height: '100%',
      },
      [breakpoints.down('sm')]: {
        marginRight: 0,
      },
      '& img': {
        display: 'flex',
        borderRadius: 32,
        [breakpoints.down('md')]: {
          height: 'auto',
        },
        [breakpoints.down('sm')]: {
          borderRadius: 32,
        },
      },
    },
    titleStyles: {
      marginBottom: 12,
      [breakpoints.down('sm')]: {
        fontSize: '1.5rem',
      },
    },
    description: {
      display: 'initial',
    },
    buttonContainer: {
      marginTop: '1rem',
    },
    gridImage: {
      objectFit: 'none',
      [breakpoints.down('sm')]: {
        objectFit: 'cover',
      },
    },
  }))

export default EeroSecure
