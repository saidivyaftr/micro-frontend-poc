import { InjectHTML, TwoColumnLayout } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core'
import { COMPONENT_WRAPPER } from 'src/constants'
import { useAppData } from 'src/hooks'
import { IShopComponents } from './types'

const HomeWiFi = ({ styles }: IShopComponents) => {
  const data = useAppData('homewifi', true)
  const {
    title,
    description,
    image,
    mobileImage,
    tooltipColorCode,
    contentBlockColorCode,
    backgroundColor,
  }: any = data

  const classes = useStyles({
    contentBlockColorCode,
    tooltipColorCode,
    backgroundColor,
  })()
  const ImageContent = () => (
    <>
      {title?.value && (
        <div id="home-WiFi" className={classes.ImageContent}>
          {title?.value && (
            <InjectHTML
              tagType="h2"
              styleType="h4"
              value={title?.value}
              className={classes.titleStyles}
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
          </div>
        </div>
      )}
    </>
  )

  if (!title || !description) {
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
        reverse={true}
        testId="Image-id"
        mobileReverse={true}
      />
    </div>
  )
}

const useStyles = ({}: any) =>
  makeStyles(({ breakpoints }) => ({
    wrapper: {
      ...COMPONENT_WRAPPER,
      paddingTop: 60,
      margin: '0 auto',
      [breakpoints.down('sm')]: {
        paddingBottom: '30px',
        paddingTop: '3rem',
      },
    },
    gridBlockStyle: {
      flexWrap: 'initial',
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
        marginTop: 32,
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
  }))

export default HomeWiFi
