import { useMemo } from 'react'
import { makeStyles } from '@material-ui/core'
import { Typography, FourTiles, Button } from '@/shared-ui/components'
import colors from '@/shared-ui/colors'
import { useAppData } from 'src/hooks'
import { COMPONENT_WRAPPER } from 'src/constants'
import { ArrowCross, MessageIcon } from '@/shared-ui/react-icons'
import { PP_OBJECT_SANS_BOLD } from 'src/constants/fontFamilyNames'
const ApplyACP = () => {
  const classes = useStyles()
  const { title, tiles, btnText, btnUrl }: any = useAppData('ApplyACP', true)
  const cohesionHandler = () => {
    const payload = {
      '@type': 'redventures.usertracking.v3.ElementClicked',
      webElement: {
        elementType: 'BUTTON',
        location: 'ACP',
        position: 'Module',
        htmlId: null,
        text: 'Chat Now',
      },
      actionOutcome: 'EXTERNALLINK',
      outboundUrl: null,
    }
    // @ts-ignore: Unreachable code error
    tagular('beam', payload, true, false)
  }

  const list = useMemo(() => {
    if (!tiles?.list) {
      return []
    }
    const tilesList = []
    for (const item of tiles?.list) {
      const button = {
        text:
          item?.buttonVariant?.value == 'lite' ? (
            <>
              {item?.buttonText?.value}
              <ArrowCross />
            </>
          ) : (
            item.buttonText?.value
          ),
        variant: item.buttonVariant?.value,
        href: item.buttonhref?.url,
        objectID:
          item?.icon?.value === '3' ? 'hero-check-availability' : undefined,
      }
      const payload: any = {
        title: item?.title?.value,
        description: item?.description?.value,
        button: button,
        icon: <Typography styleType="h1">{item?.icon?.value}</Typography>,
      }
      tilesList.push(payload)
    }
    return tilesList
  }, [tiles])

  if (!tiles?.list) {
    return null
  }

  return (
    <div id="apply-acp" className={classes.root}>
      <div className={classes.wrapper}>
        {title?.value && (
          <Typography
            tagType="h2"
            color="secondary"
            styleType="h4"
            className={classes.title}
          >
            {title?.value}
          </Typography>
        )}
        <div className={classes.tilesWrapper}>
          <FourTiles
            type="light"
            textAlign="left"
            tiles={list}
            titleStyleType="h5"
            roundedBorders={true}
            tilesWrapperClassName={classes.tilesClassName}
            cardClassName={classes.cardClassName}
            descriptionClassName={classes.descriptionClassName}
            buttonClassName={classes.buttonClassName}
            isClickable={false}
          />
        </div>
        {btnText?.value && (
          <Button
            hoverVariant="secondary"
            type="link"
            target="_blank"
            text={
              <span className={classes.messageBtnText}>
                <MessageIcon /> {btnText?.value}
              </span>
            }
            href={btnUrl.url}
            className={classes.messageBtn}
            onClick={cohesionHandler}
          />
        )}
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    background: colors.main.dark,
    marginTop: 80,
  },
  tilesClassName: {
    '&:last-child': {
      '& a': {
        display: 'inline-block',
        textDecoration: 'underline',
        fontFamily: PP_OBJECT_SANS_BOLD,
        '&:hover': {
          color: colors.main.brightRed,
        },
      },
    },
  },
  wrapper: {
    ...COMPONENT_WRAPPER,
    paddingBottom: 80,
    paddingTop: 60,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  title: {
    marginBottom: '2rem',
  },
  buttonClassName: {
    width: 'unset',
    [breakpoints.down('md')]: {
      fontSize: '1rem',
    },
  },
  cardClassName: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingRight: '3.5rem',
    [breakpoints.down('md')]: {
      padding: '2rem',
    },
  },
  descriptionClassName: {
    flex: '1',
    marginTop: '1rem',
    [breakpoints.down('md')]: {
      marginTop: '0',
    },
  },
  messageBtnText: { display: 'flex', justifyContent: 'center', gap: '1rem' },
  messageBtn: {
    textTransform: 'uppercase',
    width: 'fit-content',
    margin: 'auto',
    [breakpoints.down('sm')]: {
      padding: '0.625rem',
    },
  },
  tilesWrapper: {
    marginTop: 32,
    marginBottom: '3rem',
  },
}))

export default ApplyACP
