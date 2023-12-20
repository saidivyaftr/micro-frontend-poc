import { makeStyles } from '@material-ui/core/styles'
import { Typography, InjectHTML } from '@/shared-ui/components'
import { useAppData } from 'src/hooks'
import TwoColumnLayout from './TwoColumnLayout'
import colors from '@/shared-ui/colors'

const YoutubeTvDetails = () => {
  const classes = useStyles()
  const productData = useAppData('SelfServiceProductContent', true)

  const { title, description, image, featurelist } = productData

  if (!title?.value || !description?.value) {
    return null
  }
  return (
    <div className={classes.root}>
      <Typography tagType="h3" styleType="h3" className={classes.heading}>
        {title?.value}
      </Typography>
      <TwoColumnLayout
        image={image?.src}
        title={title?.value}
        imageClassName={classes.imageWrapper}
        gridItemImageClassName={classes.imageWidth}
        gridClassName={classes.gridContainer}
        innerWrapperClassName={classes.innerWrapper}
        content={
          <div className={classes.nonImageContainer}>
            <Typography tagType="h4" styleType="h4" color="default">
              {description?.value}
            </Typography>
            <Typography tagType="p" styleType="p1">
              <ul className={classes.list}>
                {featurelist?.list?.map((item: any) => (
                  <li
                    className={classes.listItem}
                    key={`${item?.title?.value}_key`}
                  >
                    <span className={classes.icon}>
                      <InjectHTML value={productData?.checkmark.value} />
                    </span>
                    <InjectHTML value={item?.title?.value} />
                  </li>
                ))}
              </ul>
            </Typography>
          </div>
        }
        mobileReverse
      />
    </div>
  )
}

export default YoutubeTvDetails

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    background: colors.main.white,
    padding: '80px 0px',
    [breakpoints.down('sm')]: {
      padding: '40px 0px',
    },
    '& img': {
      borderRadius: '2rem',
    },
  },
  imageWidth: {
    [breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  heading: {
    textAlign: 'center',
    paddingBottom: 49,
    [breakpoints.down('sm')]: {
      margin: '40px 0px 32px 0px',
    },
  },
  imageWrapper: {
    objectFit: 'fill',
    [breakpoints.down('xs')]: {
      objectFit: 'cover',
    },
  },
  gridContainer: {
    display: 'flex',
    flexDirection: 'row-reverse',
    [breakpoints.down('sm')]: {
      flexDirection: 'column-reverse',
    },
  },
  innerWrapper: {
    [breakpoints.down('sm')]: {
      paddingTop: 0,
      paddingBottom: '2rem',
    },
  },
  list: {
    listStyle: 'none',
    padding: '0',
  },
  listItem: {
    display: 'flex',
    marginBottom: '1rem',
  },
  icon: {
    marginRight: '0.5rem',
  },
  nonImageContainer: {
    padding: '0 2rem',
    [breakpoints.down('sm')]: {
      padding: '2rem 1rem 0 1rem',
    },
  },
}))
