import { useAppData } from 'src/hooks'
import { InjectHTML, Button } from '@/shared-ui/components'
import Icon from '@/shared-ui/react-icons/check-mark-thin'
import { makeStyles } from '@material-ui/core'
import { COMPONENT_WRAPPER, CTA_BUTTON, SITE_INTERACTION } from 'src/constants'
import colors from '@/shared-ui/colors'
const UltrafastInternet = () => {
  const classes = useStyles()
  const { cardsData, title, button }: any = useAppData(
    'ultrafastInternet',
    true,
  )
  const onButtonClick = () => {
    //@ts-ignore
    s_objectID = COMPARISON.replace('{NAME}', buttonText?.value)
  }
  return (
    <div id="channel-fast-internet" className={classes.root}>
      <div className={classes.container}>
        <InjectHTML
          className={classes.mainTitle}
          tagType="h3"
          styleType="h3"
          value={title?.value}
        />

        <div className={classes.cardsContainer}>
          {cardsData?.targetItems?.map((eachCard: any, index: number) => (
            <div className={classes.card} key={index}>
              <InjectHTML
                color="primary"
                className={classes.heading}
                tagType="h4"
                styleType="h4"
                value={eachCard?.heading?.value}
              />

              <InjectHTML
                className={classes.subHeading}
                tagType="h6"
                styleType="h6"
                value={eachCard?.subHeading?.value}
              />

              <InjectHTML
                tagType="p"
                data-testid="caption"
                className={classes.legalText}
                styleType="legal"
                value={eachCard?.legalText?.value || ''}
              />
              <ul className={classes.listItems}>
                {eachCard?.listChecks?.list.map((item: any, index: number) => (
                  <li key={index} className={classes.listItem}>
                    <Icon className={classes.svgAlign} />
                    <InjectHTML
                      className={classes.bulletsStyle}
                      tagType="div"
                      styleType="p1"
                      value={item?.text?.value}
                    />{' '}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className={classes.cta}>
          <Button
            type="link"
            text={button?.text}
            href={button?.url}
            hoverVariant="secondary"
            onClick={onButtonClick}
            className={classes.ctaButtonStyles}
            triggerEvent={true}
            eventObj={{ events: 'event14', eVar14: CTA_BUTTON }}
            interactionType={SITE_INTERACTION}
          />
        </div>
      </div>
    </div>
  )
}

export default UltrafastInternet

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    padding: '80px 16px',
    backgroundColor: colors.main.midnightExpress,
    [breakpoints.down('md')]: {
      padding: '48px 16px',
    },
    [breakpoints.down('xs')]: {
      marginTop: 50,
    },
  },
  card: {
    backgroundColor: colors.main.white,
    padding: '2rem 2rem 1rem 2rem',
    width: '48%',
    [breakpoints.down('sm')]: {
      width: '100%',
      marginBottom: '2rem',
      padding: '1rem 1em 0rem 1rem',
    },
  },
  cardsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    [breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  mainTitle: {
    color: colors.main.greenishBlue,
    marginBottom: '3rem',
    maxWidth: '456px',
  },
  container: {
    ...COMPONENT_WRAPPER,
    [breakpoints.down('xs')]: {
      padding: 0,
    },
  },
  heading: {
    marginBottom: '1rem',
    [breakpoints.down('xs')]: {
      '& br': {
        display: 'none',
      },
    },
  },
  subHeading: {
    marginBottom: '1rem',
    '& sup': {
      fontSize: '0.5rem',
      lineHeight: 0,
    },
  },
  cta: {
    display: 'block',
    textAlign: 'center',
    marginTop: '60px',
    [breakpoints.down('sm')]: {
      margin: '16px 18px 0px 18px',
    },
  },

  listItem: {
    marginBottom: 4,
    display: 'flex',
    gridGap: '0.625rem',
    gap: '0.625rem',
    alignItems: 'center',
  },
  bulletsStyle: {
    margin: '2px 0',
    '& sup': {
      fontSize: '0.5rem',
      lineHeight: 0,
    },
  },
  listItems: {
    paddingLeft: 0,
  },
  svgAlign: {
    placeSelf: 'center stretch',
    width: '0.938rem',
  },
  ctaButtonStyles: {
    [breakpoints.down('xs')]: {
      display: 'block',
      lineHeight: 1,
      fontSize: '1.125rem',
      minHeight: 'auto',
      padding: '14px',
    },
  },
  legalText: {
    marginTop: '1rem',
    fontSize: '0.75rem',
    lineHeight: '1rem',
  },
}))
