import { makeStyles } from '@material-ui/core'
import { useMemo } from 'react'
import { Button, Picture } from '@/shared-ui/components'
import { RightArrowIcon } from '@/shared-ui/react-icons'
import { COMPONENT_WRAPPER, CTA_BUTTON, SITE_INTERACTION } from 'src/constants'
import { useAppData } from 'src/hooks'
import colors from '@/shared-ui/colors'

const CardClicks = () => {
  const classes = useStyles()
  const { list }: any = useAppData('FrontierLifeLineCards', true)
  const dataList = useMemo(() => {
    if (!list?.targetItems) {
      return []
    }
    const tilesList = list?.targetItems?.map((item: any) => {
      const payload: any = {
        ...item,
        buttonValue: (
          <>
            {item?.buttonText?.value}
            <RightArrowIcon className={classes.iconStyles} />
          </>
        ),
      }
      return payload
    })
    return tilesList
  }, [list])
  return (
    <>
      {list && (
        <div className={classes.root}>
          {dataList?.map((item: any) => (
            <div className={classes.wrapper} key={item?.buttonText?.value}>
              {item?.image?.src && (
                <Picture
                  desktop={{
                    image: item?.image?.src,
                    webp: item?.image?.src,
                  }}
                  altText={item?.image?.alt}
                />
              )}
              {item?.buttonText?.value && (
                <Button
                  type="link"
                  href={item?.buttonUrl?.value}
                  text={item?.buttonValue}
                  className={classes.callBtn}
                  variant="tertiary"
                  triggerEvent={true}
                  eventObj={{ events: 'event14', eVar14: CTA_BUTTON }}
                  interactionType={SITE_INTERACTION}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    ...COMPONENT_WRAPPER,
    display: 'flex',
    gap: '1rem',
    margin: '80px auto',
    [breakpoints.down('xs')]: {
      flexDirection: 'column',
      margin: '64px auto 96px auto',
    },
  },
  wrapper: {
    background: colors.main.nightDarkBlack,
    borderRadius: 32,
    padding: 35,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    flexGrow: 1,
    [breakpoints.down('xs')]: {
      padding: 18,
    },
  },
  callBtn: {
    minHeight: 'initial',
    padding: 0,
    display: 'flex',
    width: 'fit-content',
    marginTop: '2rem',
    fontSize: '1.125rem',
    lineHeight: '1.125rem',
    justifyContent: 'center',
    textTransform: 'initial',
    color: `${colors.main.greenishBlue} !important`,
    backgroundColor: 'transparent !important',
    borderColor: 'transparent !important',
    [breakpoints.down('xs')]: {
      width: '100% !important',
      fontSize: '1rem',
      lineHeight: '1.5rem',
      marginTop: '1rem',
    },
  },
  iconStyles: {
    marginLeft: 10,
    [breakpoints.down('xs')]: {
      width: 20,
    },
    '& path ': {
      fill: colors.main.greenishBlue,
    },
  },
}))

export default CardClicks
