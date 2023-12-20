import { Typography, InjectHTML, Button } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core'
import { useMemo } from 'react'
import { SITE_INTERACTION } from 'src/constants'
import { useRouter } from 'next/router'
import clx from 'classnames'

const FastestInternet = ({ data }: any) => {
  const classes = useStyles()
  const router = useRouter()
  const pageName = useMemo(() => {
    return router.asPath.split('/').splice(1, 3).join('/')
  }, [router])
  if (!data || Object.keys(data).length === 0) {
    return null
  }
  const { image, mobileImage, title, description, eyebrowText, button }: any =
    data

  return (
    <div className={classes.root} data-testid="fastest-internet">
      <div className={classes.wrapper}>
        <div className={classes.innerWrapper}>
          <div className={classes.content}>
            {eyebrowText && (
              <InjectHTML
                fontType="boldFont"
                styleType="p3"
                data-testid="hero-banner-eyebrowtext"
                tagType="h2"
                className={classes.eyebrowText}
                value={eyebrowText?.value as string}
              />
            )}
            <Typography tagType="h3" styleType="h4" className={classes.title}>
              {title?.value}
            </Typography>
            {description?.value && (
              <InjectHTML
                className={classes.description}
                tagType="p"
                data-testid="caption"
                styleType="p1"
                value={description?.value}
              />
            )}
            <Button
              type="link"
              text={button?.text}
              className={classes.button}
              href={`${origin}${button?.url}`}
              variant={'secondary'}
              triggerEvent={true}
              eventObj={{
                events: 'event14',
                eVar14: `${pageName}:${button?.text?.toLowerCase()}`,
              }}
              interactionType={SITE_INTERACTION}
            />
          </div>
          {image && (
            <div className={clx(classes.imageWrapper, classes.desktop)}>
              <img
                className={classes.image}
                src={image?.src}
                alt={title?.value}
                loading="lazy"
              />
            </div>
          )}
          {mobileImage && (
            <div className={clx(classes.imageWrapper, classes.mobile)}>
              <img
                className={classes.image}
                src={mobileImage?.src}
                alt={title?.value}
                loading="lazy"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {},
  wrapper: {
    boxSizing: 'content-box',
    margin: '0 auto',
    padding: '6.75rem 1rem ',
    [theme.breakpoints.down('xs')]: {
      padding: '2.5rem 1rem ',
    },
  },
  innerWrapper: {
    margin: '0 auto',
    maxWidth: '1200px',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  eyebrowText: {
    textTransform: 'uppercase',
    paddingBottom: '1rem',
    margin: 0,
    [theme.breakpoints.down('xs')]: {
      paddingTop: '2rem',
      fontSize: '0.875rem',
      lineHeight: '1.125rem',
    },
  },
  title: {
    display: 'initial',
    [theme.breakpoints.down('xs')]: {
      marginTop: '36px',
    },
  },
  description: {
    padding: '2rem 0',
    [theme.breakpoints.down('xs')]: {
      padding: '1rem 0',
    },
  },
  button: {},
  content: {
    paddingRight: '4rem',
    flex: 1,
    [theme.breakpoints.down('xs')]: {
      order: 2,
      paddingRight: 0,
    },
  },
  imageWrapper: {
    flex: 1,
  },
  image: {
    borderRadius: '2rem',
    maxWidth: '100%',
    [theme.breakpoints.down('xs')]: {
      order: 1,
      borderRadius: '1.5rem',
    },
  },
  desktop: {
    display: 'block',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  mobile: {
    display: 'none',
    [theme.breakpoints.down('xs')]: {
      display: 'block',
    },
  },
}))

export default FastestInternet
