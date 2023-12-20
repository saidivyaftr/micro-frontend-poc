import { makeStyles } from '@material-ui/core'
import clx from 'classnames'
import { Typography, TwoColumnLayout } from '@/shared-ui/components'

export const TwoColumnLayoutComponent = (data: any) => {
  const classes = useStyles()
  const {
    reverse,
    mobileReverse,
    title,
    description,
    desktopImage,
    mobileImage,
  }: any = data?.data

  const renderContent = () => {
    return (
      <div className={classes.contentWrapper}>
        <Typography tagType="h2" styleType="h3" className={classes.title}>
          {title?.value}
        </Typography>
        <Typography tagType="p" styleType="p2" className={classes.description}>
          {description?.value}
        </Typography>
      </div>
    )
  }

  return (
    <div className={classes.wrapper}>
      <TwoColumnLayout
        gridClassName={clx(classes.gridBlockStyle, {
          [classes.reverse]: reverse?.value === 'true',
        })}
        gridItemClassName={clx(classes.gridItemClassName, {
          [classes.gridItemClassNameReverse]: reverse?.value === 'true',
        })}
        gridItemImageClassName={classes.gridItemImageClassName}
        innerWrapperClassName={classes.innerWrapperClassName}
        imageWrapperClassName={classes.imageWrapper}
        image={desktopImage?.src}
        mobileImage={mobileImage?.src}
        title={''}
        content={renderContent()}
        testId="Image-id"
        reverse={reverse?.value === 'true' ? true : false}
        mobileReverse={mobileReverse?.value === 'true' ? true : false}
      />
    </div>
  )
}
const useStyles = makeStyles(({ breakpoints }: { breakpoints: any }) => ({
  contentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  title: {
    fontSize: '1.875rem',
    lineHeight: '2.375rem',
    [breakpoints.down('sm')]: {
      fontSize: '1.25rem',
      lineHeight: '1.75rem',
    },
  },
  description: {
    fontSize: '1.125rem',
    lineHeight: '1.625rem',
    marginTop: '1rem',
    [breakpoints.down('sm')]: {
      fontSize: '1rem',
      lineHeight: '1.5rem',
    },
  },
  wrapper: {
    maxWidth: '1200px',
    margin: '0 auto',
    [breakpoints.down('sm')]: {
      padding: '0',
      paddingTop: '1.5rem',
    },
  },
  innerWrapperClassName: {
    padding: 0,
    [breakpoints.down('sm')]: {
      padding: '0 1rem',
    },
  },
  gridBlockStyle: {
    flexWrap: 'initial',
    paddingTop: '5rem',
    [breakpoints.down('lg')]: {
      padding: '5rem 1rem 0',
    },
    [breakpoints.down('md')]: {
      gap: '2rem',
    },
    [breakpoints.down('xs')]: {
      padding: 0,
      flexDirection: 'column-reverse',
    },
  },
  reverse: {
    [breakpoints.down('lg')]: {
      flexDirection: 'row-reverse',
    },
    [breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
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
  gridItemClassName: {
    [breakpoints.up('sm')]: {
      flexBasis: '50%',
      maxWidth: '50%',
    },
    [breakpoints.up('lg')]: {
      maxWidth: '500px',
      padding: '4rem 4rem 4rem 0',
    },
  },
  gridItemClassNameReverse: {
    [breakpoints.up('lg')]: {
      padding: '4rem 0 4rem 4rem',
    },
  },
  gridItemImageClassName: {
    [breakpoints.up('sm')]: {
      flexBasis: '50%',
      maxWidth: '50%',
    },
    [breakpoints.up('lg')]: {
      maxWidth: '700px',
      flexBasis: '100%',
    },
  },
}))

export default TwoColumnLayoutComponent
