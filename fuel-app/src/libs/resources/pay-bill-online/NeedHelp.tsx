import { makeStyles } from '@material-ui/core'
import { Button, Typography } from '@/shared-ui/components'
import { COMPONENT_WRAPPER } from 'src/constants'
import { useAppData, useWindowDimensions } from 'src/hooks'
const midDevice = 768

const NeedHelp = () => {
  const classes = useStyles()
  const { width } = useWindowDimensions()

  const data = useAppData('needHelp', true)
  const { title, description, button, image, mobileImage } = data

  if (Object.keys(data).length === 0) return null

  return (
    <div className={classes.wrapper} data-testid="need-help">
      <div className={classes.container}>
        <div className={classes.content}>
          {title?.value && (
            <Typography
              tagType="h4"
              styleType="h4"
              data-testid="need-help-title"
            >
              {title?.value}
            </Typography>
          )}
          {description?.value && (
            <Typography
              tagType="p"
              styleType="p1"
              data-testid="need-help-description"
            >
              {description?.value}
            </Typography>
          )}
          {button?.text && (
            <Button
              type="link"
              className={classes.itemButton}
              href={button?.url}
              text={button?.text}
            />
          )}
        </div>
        <img
          className={classes.image}
          src={width > midDevice ? image?.src : mobileImage?.src}
          alt={width > midDevice ? image?.alt : mobileImage?.alt}
          data-testid="need-help-image"
        />
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  wrapper: {
    ...COMPONENT_WRAPPER,
    paddingTop: '4rem',
    marginBottom: '2.5rem',
    [breakpoints.down('xs')]: {
      paddingTop: '1.25rem',
    },
  },
  container: {
    display: 'flex',
    justifyContent: 'space-around',
    [breakpoints.down('md')]: {
      flexDirection: 'column-reverse',
    },
  },
  content: {
    flexBasis: '40%',
    padding: '4rem',
    [breakpoints.down('xs')]: {
      padding: '2rem 0 0',
    },
  },
  image: {
    maxHeight: 400,
    borderRadius: '2rem',
    objectFit: 'cover',
    display: 'flex',
    [breakpoints.down('md')]: {
      maxHeight: 'auto',
    },
    [breakpoints.down('sm')]: {
      borderRadius: '1rem',
    },
  },
  itemButton: {
    display: 'block',
    marginTop: '2rem',
    width: 'fit-content',
    fontFamily: 'PP Object Sans',
    [breakpoints.down('xs')]: {
      width: '100%',
      marginTop: 0,
    },
  },
}))

export default NeedHelp
