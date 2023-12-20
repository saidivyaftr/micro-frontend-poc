import { makeStyles } from '@material-ui/core'
import { InjectHTML } from '@/shared-ui/components'

import { useAppData } from 'src/hooks'
import { COMPONENT_WRAPPER, ZOOMED_OUT_MAX_WIDTH } from 'src/constants'
import colors from '@/shared-ui/colors'

const GetInternet = () => {
  const classes = useStyles()

  const { title, subTitle, list } = useAppData('getInternet', true)
  if (Object.keys(list)?.length === 0) {
    return null
  }
  return (
    <>
      <div className={classes.root}>
        <div className={classes.contentWrapper}>
          <div className={classes.titlesBlock}>
            <InjectHTML
              tagType="h3"
              styleType="h3"
              color="secondary"
              value={title?.value}
              className={classes.firstTitle}
              testId="getInternet-title"
            />
            <InjectHTML
              tagType="p"
              styleType="p1"
              color="tertiary"
              value={subTitle?.value}
              className={classes.subTitle}
              testId="getInternet-subTitle"
            />
          </div>
          <div className={classes.cardBlock}>
            {list?.targetItems?.map((eachCard: any, index: number) => {
              return (
                <div className={classes.cardStyles} key={'card' + index}>
                  <InjectHTML
                    tagType="h4"
                    styleType="h4"
                    value={eachCard?.title?.value}
                    testId="getInternet-card-title"
                  />
                  <ul className={classes.cardListStyles}>
                    {eachCard?.cardInfo?.targetItems?.map(
                      (item: any, index: number) => {
                        return (
                          <li key={'title' + index}>
                            <div className={classes.cardListTitle}>
                              <div className={classes.circleStyles}></div>
                              <InjectHTML
                                tagType="p"
                                styleType="p1"
                                value={item?.title?.value}
                                testId="getInternet-card-label"
                              />
                            </div>

                            <InjectHTML
                              tagType="p"
                              styleType="p1"
                              value={item?.amount?.value}
                              className={classes.amountText}
                            />
                          </li>
                        )
                      },
                    )}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  cardBlock: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: 48,
    [breakpoints.down('xs')]: { paddingTop: 32, display: 'block' },
    '&:last-child': {
      marginLeft: 'auto',
      [breakpoints.down('xs')]: { marginBottom: 0 },
    },
  },
  cardListStyles: {
    paddingLeft: 0,
    marginTop: 16,
    '& li': {
      display: 'flex',
      marginBottom: 8,
      justifyContent: 'space-between',
      alignItems: 'center',
      [breakpoints.down('sm')]: { paddingLeft: '11px' },
    },
  },
  amountText: {
    minWidth: 77,
    [breakpoints.down('sm')]: { minWidth: 66 },
  },
  cardStyles: {
    padding: '53px 40px 53px 40px',
    width: 'calc(50% - 16px)',
    borderRadius: 32,
    minHeight: 300,
    backgroundColor: colors.main.white,
    [breakpoints.down('sm')]: { padding: '32px' },

    [breakpoints.down('xs')]: {
      padding: '32px 17px 10px 30px',
      minHeight: 210,
      width: '100%',
      maxWidth: '400px',
      margin: '0px auto 16px auto',
    },
  },
  firstTitle: {
    paddingRight: '16px',
    maxWidth: 495,
    width: '100%',
    [breakpoints.down('xs')]: {
      maxWidth: 300,
      paddingRight: 10,
    },
  },
  root: {
    maxWidth: ZOOMED_OUT_MAX_WIDTH,
    background: colors.main.midnightExpress,
    margin: '0 auto',
    padding: '80px 0px',
    [breakpoints.down('sm')]: { padding: '40px 0px' },
  },
  circleStyles: {
    minWidth: 5,
    height: 5,
    borderRadius: '50%',
    background: colors.main.midnightExpress,
    marginRight: '17.5px',
    marginTop: '.625rem',
  },
  cardListTitle: {
    display: 'flex',
    paddingRight: 20,
  },
  contentWrapper: {
    ...COMPONENT_WRAPPER,
  },
  subTitle: {
    maxWidth: 600,
    width: '100%',
    [breakpoints.down('xs')]: {
      maxWidth: '100%',
      paddingRight: 10,
      paddingTop: 16,
    },
  },
  titlesBlock: {
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: '48px',
    borderBottom: `4px solid ${colors.main.greenishBlue}`,
    [breakpoints.down('xs')]: {
      display: 'block',
      paddingBottom: '32px',
    },
  },
}))

export default GetInternet
