import { makeStyles } from '@material-ui/core'
import colors from '@/shared-ui/colors'
import {
  Button,
  TwoColumnLayout,
  Typography,
  InjectHTML,
} from '@/shared-ui/components'

const ChatNow = ({ data }: any) => {
  const classes = useStyles()

  if (!data || Object.keys(data || {}).length == 0) {
    return null
  }
  const {
    firstTitle,
    content,
    buttonChatNowContent,
    buttonChatNowIcon,
    imageAlt,
    imageUrl,
    webpImageUrl,
    mobileUrl,
    mobileWebpImageUrl,
  } = data || {}

  const startChat = () => {
    try {
      const chat = document.getElementsByClassName(
        'minimized',
      ) as HTMLCollectionOf<HTMLElement>
      chat[0]?.click()
    } catch (e) {}
  }

  return (
    <div className={classes.content}>
      <TwoColumnLayout
        image={imageUrl?.src}
        webpImage={webpImageUrl?.src}
        title={imageAlt?.value}
        reverse
        roundedBorders
        className={classes.twoColumnLayout}
        imageWrapperClassName={classes.picture}
        mobileImage={mobileUrl?.src}
        mobileWebpImage={mobileWebpImageUrl?.src}
        imageClassName={classes.blurImageFix}
        gridItemImageClassName={classes.image}
        content={
          <>
            <div className={classes.gridItemContent}>
              <Typography
                tagType="span"
                styleType="h4"
                dangerouslySetInnerHTML={{
                  __html: firstTitle.value,
                }}
              />
              <Typography tagType="p" styleType="p1">
                {content.value}
              </Typography>

              <Button
                type="button"
                className={classes.link}
                text={
                  <>
                    <InjectHTML
                      addAnchorStyles
                      value={buttonChatNowIcon?.value}
                    />
                    {buttonChatNowContent.value}
                  </>
                }
                onClick={startChat}
              />
            </div>
          </>
        }
      />
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  content: {
    marginTop: '1rem',
  },
  gridItemContent: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '4rem',
    paddingLeft: '3rem',
    paddingRight: '3rem',
    alignItems: 'flex-start',
    height: '28rem',
    [breakpoints.down('xs')]: {
      height: '16.5rem',
      padding: '1rem',
    },
  },
  link: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '0.562rem',
    width: 'unset',
    '& div': {
      display: 'flex',
    },
    '& rect': {
      fill: 'none',
    },
    '& path': {
      fill: 'white',
    },
    [breakpoints.down('xs')]: {
      width: '100%',
      marginTop: '1rem',
      margin: 'auto',
      maxWidth: '19.43rem',
      paddingRight: '1rem',
      paddingLeft: '1rem',
    },
  },
  twoColumnLayout: {
    background: colors.main.newBackgroundGray,
    borderRadius: '2rem',
    [breakpoints.down('xs')]: {
      borderRadius: '1rem',
    },
  },
  blurImageFix: {
    maxHeight: '100%',
    display: 'block',
    [breakpoints.down('xs')]: {
      maxHeight: 'unset',
    },
  },
  picture: {
    display: 'block',
    backgroundColor: colors.main.newBackgroundGray,
    margin: 'auto',
    maxWidth: '420px',
    [breakpoints.down('xs')]: {
      maxWidth: '375px',
    },
  },
  image: {
    backgroundColor: colors.main.newBackgroundGray,
    alignSelf: 'flex-end',
    padding: '0 16px',
  },
}))

export default ChatNow
