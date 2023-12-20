import { makeStyles } from '@material-ui/core'
import { InjectHTML, TwoColumnLayout } from '@/shared-ui/components'
import { COMPONENT_WRAPPER } from 'src/constants'
import { useAppData } from 'src/hooks'
import colors from '@/shared-ui/colors'
import { useMemo } from 'react'
import { PP_OBJECT_SANS_MEDIUM } from 'src/constants/fontFamilyNames'
const ServiceImpact: React.FC = () => {
  const classes = useStyles()
  const data = useAppData('serviceImpact', true)
  const { title, list } = data
  const items = useMemo(() => {
    if (!list) {
      return []
    }
    const tilesList = list?.targetItems?.map((item: any) => {
      return {
        image: item?.image?.src,
        imageAlt: item?.mobileImage?.alt,
        mobileImage: item?.mobileImage?.src,
        title: item?.title?.value,
        description: item?.description?.value,
        reverse: item?.reverse?.value,
        mobileReverse: item?.mobileReverse?.value,
      }
    })
    return tilesList
  }, [list])
  return (
    <div data-testid="service-impact" className={classes.root}>
      {title?.value && (
        <InjectHTML
          data-testid="service-impact-title"
          tagType="h3"
          styleType="h3"
          fontType="boldFont"
          className={classes.title}
          value={title?.value}
        />
      )}
      {items?.map((item: any, key: number) => {
        return (
          <div className={classes.twoLayerWrapper} key={key}>
            <TwoColumnLayout
              title={item?.imageAlt}
              content={
                <div className={classes.content}>
                  {item?.title && (
                    <InjectHTML
                      tagType="h4"
                      styleType="h4"
                      fontType="boldFont"
                      value={item?.title}
                    />
                  )}
                  {item?.description && (
                    <InjectHTML
                      tagType="p"
                      styleType="p1"
                      fontType="regularFont"
                      value={item?.description}
                    />
                  )}
                </div>
              }
              image={item?.image}
              mobileImage={item?.mobileImage}
              reverse={item?.reverse}
              imageClassName={classes.imageClassName}
              mobileReverse={item?.mobileReverse}
            />
          </div>
        )
      })}
    </div>
  )
}
const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    ...COMPONENT_WRAPPER,
    padding: '4rem 0',
    [breakpoints.down('xs')]: {
      padding: '2.5rem 0',
    },
  },
  title: {
    margin: '0',
    textAlign: 'center',
  },
  twoLayerWrapper: {
    marginTop: '5rem',
    [breakpoints.down('xs')]: {
      marginTop: '1rem',
    },
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: '2rem',
    paddingRight: '2.4rem',
    justifyContent: 'center',
    '& h4': {
      marginBottom: '1rem',
    },
    '& div': {
      display: 'inline',
      marginBottom: '1rem',
      '& a': {
        fontFamily: PP_OBJECT_SANS_MEDIUM,
        textDecoration: 'underline',
        display: 'unset',
        '&:hover': {
          color: colors.main.brightRed,
        },
      },
    },
    [breakpoints.down('xs')]: {
      padding: '0',
      paddingTop: '2rem',
    },
  },
  imageClassName: {
    borderRadius: 36,
  },
}))

export default ServiceImpact
