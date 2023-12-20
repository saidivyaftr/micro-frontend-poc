import colors from '@/shared-ui/colors'
import { InjectHTML, TwoColumnLayout } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core'

const CardTwoColumnLayout = ({ data }: any) => {
  const classes = useStyles()
  const { direction, title, content, image, mobileImage }: any = data

  const Content = (): JSX.Element => (
    <>
      {title?.value && (
        <div className={classes.content}>
          {title?.value && (
            <InjectHTML
              tagType="h2"
              styleType="h3"
              color="default"
              value={title?.value}
              className={classes.titleStyles}
            />
          )}
          <div>
            {content?.value && (
              <InjectHTML
                styleType="p1"
                color="default"
                value={content?.value}
              />
            )}
          </div>
        </div>
      )}
    </>
  )

  return (
    <TwoColumnLayout
      gridClassName={classes.gridBlockStyle}
      imageWrapperClassName={classes.imageWrapper}
      image={image?.src}
      mobileImage={mobileImage?.src}
      title={image?.alt}
      content={<Content />}
      reverse={
        direction?.direction?.field?.value === 'row-reverse' ? true : false
      }
      gridItemClassName={classes.gridItemContent}
      gridItemImageClassName={classes.gridItemImageClassName}
    />
  )
}

const useStyles = makeStyles(({ breakpoints, typography }) => ({
  gridBlockStyle: {
    flexWrap: 'nowrap',
    justifyContent: 'center',
    [breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  content: {
    padding: '4rem 4rem 0 4rem',
    display: 'flex',
    flexDirection: 'column',
    [breakpoints.down('sm')]: {
      padding: '2rem',
      width: '100%',
    },
  },
  imageWrapper: {
    [breakpoints.down('sm')]: {
      marginRight: 0,
    },
    '& img': {
      display: 'flex',
      borderRadius: '32px 0px 0px 32px',
      maxHeight: '454px',
      objectPosition: 'center right',
      [breakpoints.down('xs')]: {
        borderRadius: '0px 0px 32px 32px',
        minHeight: 'unset',
      },
    },
  },
  titleStyles: {
    marginBottom: `${typography.pxToRem(16)}`,
    [breakpoints.down('sm')]: {
      fontSize: '1.5rem',
      textAlign: 'center',
    },
  },
  gridItemContent: {
    background: colors.main.newBackgroundGray,
    borderRadius: '0 32px 32px 0',
    minWidth: '500px',
    flex: '0 0 500px',
    width: '50%',
    [breakpoints.down('sm')]: {
      width: '100%',
      minWidth: 'unset',
      flex: 'unset',
    },
    [breakpoints.down('xs')]: {
      borderRadius: '32px 32px 0 0',
    },
  },
  gridItemImageClassName: {
    width: '50%',
    flex: '0 0 700px',
    [breakpoints.down('sm')]: {
      width: '100%',
      minWidth: 'unset',
      flex: 'unset',
    },
  },
}))

export default CardTwoColumnLayout
