import { makeStyles } from '@material-ui/core/styles'
import { useAppData } from 'src/hooks'
import { useMemo } from 'react'
import { CheckMarkRed } from '@/shared-ui/react-icons'
import colors from '@/shared-ui/colors'
import { Grid } from '@material-ui/core'
import { Button } from '@/shared-ui/components'
import { Typography } from '@/shared-ui/components'
import StreamingPlatforms from './StreamingPlatforms'
import { COMPONENT_WRAPPER, STREAMING_SERVICES_LINK } from 'src/constants'
const Cards = () => {
  const classes = useStyles()
  const { optionCards } = useAppData('streamingServiceoptionCards', true)
  const cards = optionCards?.cards
  const lists = useMemo(() => {
    if (!cards) {
      return []
    }
    const tilesList = []
    for (const item of cards) {
      const payload: any = {
        image: item?.image,
        title: item?.title?.value,
        name: item?.name,
        types: item?.types?.list?.map(({ title }: any) => ({
          title: title?.value,
        })),
        perks: item?.perks?.list.map(({ title }: any) => ({
          title: title?.value,
        })),
        streamings: item?.streamings?.list || [],
        learnMoreText: item?.learnMoreText?.value,
        learnMoreLink: item?.learnMoreLink?.url,
        additionInfoText: item?.additionInfoText?.value,
        additionInfoLink: item?.additionInfoLink?.url,
      }
      tilesList.push(payload)
    }
    return tilesList
  }, [cards])
  const learnMoreAnalytics = (name: string) => {
    //@ts-ignore
    s_objectID = STREAMING_SERVICES_LINK.replace(
      '{SERVICE_NAME}',
      name.toLowerCase().replace(' ', ''),
    )
  }
  return (
    <div className={classes.wrapper}>
      <div className={classes.root}>
        <Grid className={classes.cardContainer} container spacing={2}>
          {lists?.map((list: any, index: number) => {
            return (
              <Grid key={`card-${index}`} item xs={12} md={4}>
                <div className={classes.cardWrapper}>
                  <div className={classes.cardTopContent}>
                    <img
                      src={list?.image?.src}
                      alt={list?.image?.alt}
                      className={classes.cardLogo}
                      loading="lazy"
                    />
                    <Typography
                      tagType="div"
                      styleType="p2"
                      className={classes.title}
                    >
                      {list?.title}
                    </Typography>
                    <div className={classes.highLightedInfo}>
                      {list?.types?.map(({ title }: any, index: number) => (
                        <div className={classes.highLightedWrapper} key={index}>
                          <div className={classes.checkIcon}>
                            <CheckMarkRed />
                          </div>
                          <Typography
                            tagType="span"
                            styleType="h6"
                            className={classes.specification}
                          >
                            {title || ''}
                          </Typography>
                        </div>
                      ))}
                    </div>
                    <div className={classes.secondaryContainer}>
                      <div className={classes.perksContainer}>
                        <ul>
                          {list?.perks?.map((perk: any, typeIndex: number) => (
                            <li
                              key={`card-${index}-perk-${typeIndex}`}
                              className={classes.description}
                            >
                              <Typography
                                tagType="span"
                                styleType="p3"
                                className={classes.descriptionText}
                              >
                                {perk?.title}
                              </Typography>
                            </li>
                          ))}
                        </ul>
                      </div>
                      {list.streamings && list.streamings.length > 0 && (
                        <StreamingPlatforms options={list.streamings} />
                      )}
                    </div>
                  </div>
                  <Button
                    variant="secondary"
                    type="link"
                    text={list?.learnMoreText}
                    href={list?.learnMoreLink}
                    className={classes.learnMoreBtn}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => learnMoreAnalytics(list?.name)}
                  />
                  {list?.additionInfoText && (
                    <Typography
                      tagType="span"
                      styleType="h6"
                      className={classes.descriptionText}
                    >
                      <a
                        href={list?.additionInfoLink}
                        className={classes.additionLink}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {list?.additionInfoText}{' '}
                      </a>
                    </Typography>
                  )}
                </div>
              </Grid>
            )
          })}
        </Grid>
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints, typography }) => ({
  wrapper: {
    backgroundColor: colors.main.lightGray,
    padding: '40px 0px',
    [breakpoints.down('md')]: {
      padding: '1vh 0',
      margin: 0,
    },
  },
  root: {
    ...COMPONENT_WRAPPER,
    overflow: 'hidden',
    padding: 0,
  },
  cardContainer: {
    padding: '0px 16px',
  },
  cardWrapper: {
    minHeight: 575,
    boxShadow: `0px 0px 5px ${colors.main.boxShadow}`,
    backgroundColor: colors.main.white,
  },
  cardTopContent: {
    padding: '0 18px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardLogo: {
    marginTop: 32,
    marginBottom: 20,
    width: 138,
    height: 60,
  },
  title: {
    fontWeight: 700,
    textAlign: 'center',
  },
  perksContainer: {
    width: '100%',
    '& ul': {
      padding: '0px 24px',
      listStyleType: 'disc',
      minHeight: 120,
      [breakpoints.down('md')]: {
        minHeight: 150,
      },
      [breakpoints.down('sm')]: {
        minHeight: 'unset',
      },
    },
    '& li': {
      marginBottom: 12,
    },
  },
  checkIcon: {
    minWidth: 25,
    '& svg': {
      height: 12,
      width: 15,
    },
  },
  highLightedInfo: {
    marginTop: 16,
    marginBottom: 16,
    backgroundColor: colors.main.lightGray,
    padding: 10,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  highLightedWrapper: {
    display: 'flex',
    width: '50%',
    alignItems: 'center',
    [breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  specification: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '1rem',
  },
  description: {
    color: colors.main.offBlack,
  },
  descriptionText: {
    fontSize: '1rem',
  },
  additionLink: {
    width: '80%',
    justifyContent: 'center',
    textDecoration: 'underline',
    border: 'none',
    fontSize: '1rem',
    [breakpoints.down('sm')]: {
      width: '90%',
    },
    margin: '10px auto',
    display: 'flex',
  },
  learnMoreBtn: {
    width: '80%',
    padding: '0.6rem',
    fontSize: typography.pxToRem(14),
    justifyContent: 'center',
    border: 'none',
    [breakpoints.down('sm')]: {
      width: '90%',
    },
    margin: '10px auto',
    display: 'flex',
  },
  secondaryContainer: {
    minHeight: 250,
    width: '100%',
  },
}))

export default Cards
