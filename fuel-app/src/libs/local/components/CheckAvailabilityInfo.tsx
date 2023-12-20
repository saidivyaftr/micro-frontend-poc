import { makeStyles } from '@material-ui/core'
import { CheckAvailability } from '@/shared-ui/components'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
const CheckAvailabilityInfo = ({ data }: any) => {
  const classes = useStyles()
  const router = useRouter()
  const pageName = useMemo(() => {
    return router.asPath.split('/').splice(1, 3).join('/')
  }, [router])
  if (!data || Object.keys(data)?.length === 0) {
    return null
  }

  const {
    titleColorCode,
    buttonText,
    buttonURL,
    buttonTitle,
    signIn,
    buttonhoverVariant,
    linkColorCode,
    backgroundColor,
  } = data || {}

  return (
    <>
      <CheckAvailability
        titleText={buttonTitle?.value}
        buttonText={buttonText?.value}
        buttonURL={buttonURL?.value}
        linkURL={signIn?.url}
        linkText={signIn?.text}
        containerBgColor={backgroundColor?.targetItem?.color?.value}
        titleColorCode={titleColorCode?.targetItem?.color?.value}
        linkColorCode={linkColorCode?.targetItem?.color?.value}
        buttonhoverVariant={buttonhoverVariant?.type?.field?.value}
        rootStylesClassName={classes.rootStylesClassName}
        containerClass={classes.containerClass}
        contentWrapperClass={classes.contentWrapperClass}
        btnEventName={`${pageName}:${buttonText?.value?.toLowerCase()}`}
        linkEventName={`${pageName}:${signIn?.text?.toLowerCase()}`}
        titleTextClassName={classes.titleText}
      />
    </>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  rootStylesClassName: {
    marginTop: '-3.125rem',
  },
  containerClass: {
    [breakpoints.up('md')]: {
      padding: '0.25rem 2rem',
    },
  },
  contentWrapperClass: {
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: '1.125rem',
  },
}))
export default CheckAvailabilityInfo
