import {
  TwoColumnLayout,
  Button,
  InjectHTML,
  Typography,
} from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core'
import clx from 'classnames'
import { RightArrowIcon } from '@/shared-ui/react-icons'
import { PP_OBJECT_SANS } from 'src/constants/fontFamilyNames'

const ImageWithTextPanel = (props: any) => {
  const classes = useStyles()
  const { data, reverse, compnentName, setmodalData } = props
  const {
    heading,
    subHeading,
    image,
    mobileImage,
    navigationHeading,
    navigation1Text,
    navigation2Text,
  } = data

  const handleNavigationClick = (clickType: string) => {
    setmodalData(clickType)
  }

  const getbUttontext = (title: string) => {
    return (
      <div className={classes.navigationLink}>
        <div>{title}</div> <RightArrowIcon />
      </div>
    )
  }

  const NonImageContent = (reverse: boolean) => (
    <div
      className={clx(
        classes.NonImageContainer,
        reverse && classes.reverseClass,
      )}
    >
      <div className={classes.NonImageWrapper}>
        <InjectHTML
          className={classes.title}
          tagType="h2"
          styleType="h3"
          value={heading?.value}
        />
        <div className={classes.desc}>
          <InjectHTML tagType="span" styleType="p1" value={subHeading?.value} />
        </div>
        <Typography tagType="span" styleType="p1" fontType="boldFont">
          {navigationHeading?.value}
        </Typography>
        <div className={classes.NavigationLinks}>
          <div className={classes.navigationWrapper}>
            <Button
              buttonSize="small"
              className={classes.navigation}
              text={getbUttontext(navigation1Text?.value)}
              type="button"
              variant="lite"
              onClick={() => handleNavigationClick(compnentName + 'Nav1')}
            />
          </div>
          <div className={classes.navigationWrapper}>
            <Button
              buttonSize="small"
              className={classes.navigation}
              text={getbUttontext(navigation2Text?.value)}
              type="button"
              variant="lite"
              onClick={() => handleNavigationClick(compnentName + 'Nav2')}
            />
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className={classes.ImageWithTextPanel}>
      <TwoColumnLayout
        title=""
        content={NonImageContent(!reverse)}
        image={image?.src}
        mobileImage={mobileImage?.src}
        mobileReverse
        roundedBorders
        reverse={reverse}
        imageClassName={classes.ImageRound}
        innerWrapperClassName={classes.wrapper}
      />
    </div>
  )
}
const useStyles = makeStyles(({ breakpoints }) => ({
  wrapper: {
    borderRadius: '0rem',
  },
  ImageWithTextPanel: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5rem',
    [breakpoints.down('md')]: {
      padding: '1rem',
    },
  },
  navigation: {
    fontSize: '1rem',
    height: 'fit-content',
  },
  title: {
    fontSize: '1.875rem',
    lineHeight: '2.375rem',
    [breakpoints.down('xs')]: {
      fontSize: '1.25rem',
      lineHeight: '1.75rem',
    },
  },
  navigationWrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  ImageRound: {
    borderRadius: '2.25rem',
  },
  NonImageWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  NonImageContainer: {
    padding: '2rem 1rem 2rem 5rem',
    [breakpoints.down('sm')]: {
      padding: '2rem 0rem 0rem 0rem',
    },
  },
  reverseClass: {
    padding: '2rem 5rem 2rem 0rem',
    [breakpoints.down('sm')]: {
      padding: '2rem 0rem 0rem 0rem',
    },
  },
  NavigationLinks: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  navigationLink: {
    display: 'flex',
    fontSize: '1.125rem',
    lineHeight: '1.5rem',
    flexDirection: 'row',
    fontWeight: 500,
    gap: '.5rem',
    fontFamily: PP_OBJECT_SANS,
    [breakpoints.down('xs')]: {
      fontSize: '1rem',
      lineHeight: '1.375rem',
    },
    '& svg': {
      height: '1rem',
      width: '1rem',
      alignSelf: 'center',
    },
  },
  desc: {},
}))
export default ImageWithTextPanel
