import { makeStyles, Grid } from '@material-ui/core'
import { useState, useEffect } from 'react'
import { Loading } from '@/shared-ui/components'
import { useSelector } from 'react-redux'
import { Button, InjectHTML } from 'src/blitz'
import { COMPONENT_WRAPPER } from 'src/constants'
import colors from 'src/styles/theme/colors'
import { useAppData } from 'src/hooks'
import APIClient from 'src/api-client'

const QuickLinks = () => {
  const classes = useStyles()
  const [accountDetail, setAccountDetail] = useState<any>()

  const { sessionValid } = useSelector((state: any) => state?.session)

  const { isLoading } = useSelector((state: any) => state?.quickLinks) || {}
  const quickLinksData = useAppData('quickLinks', true)
  const { title, links, actionCardBackgroundColor } = quickLinksData
  const [promotionalTileData, setPromotionalTileData] = useState<any>({})
  useEffect(() => {
    if (sessionValid) {
      getAccountDetails()
    }
  }, [sessionValid])

  useEffect(() => {
    setPromotionalTileData(quickLinksData.accountHelp?.list[0])
  }, [quickLinksData])

  const getAccountDetails = async () => {
    try {
      const accountDetail = await APIClient.quickLinksMetaData()
      setAccountDetail(accountDetail.data)
    } catch {}
  }
  useEffect(() => {
    if (accountDetail) {
      const { paperless, autopayType } = accountDetail
      const autopay = autopayType ? true : false
      if (paperless) {
        if (autopay) {
          // Show Frontier App Tile
          setPromotionalTileData(quickLinksData?.frontierApp.list[0])
        }
      } else {
        if (!autopay) {
          // Show Auto Pay Tile
          setPromotionalTileData(quickLinksData?.autoPay.list[0])
        } else {
          // Show Paperless Billing Tile
          setPromotionalTileData(quickLinksData?.paperlessBilling.list[0])
        }
      }
    }
  }, [accountDetail])

  if (Object.keys(quickLinksData)?.length === 0) {
    return null
  }
  return (
    <div className={classes.root} data-testid="QuickLinks">
      {title?.value && (
        <InjectHTML
          addAnchorStyles
          data-testid="faqTitle"
          tagType="h2"
          styleType="h4"
          className={classes.title}
          value={title?.value}
        />
      )}
      <Grid container spacing={4}>
        <Grid item xs={12} sm={12} md={12} lg={7}>
          <Grid container spacing={2}>
            {links?.list?.map((item: any, index: number) => {
              return (
                <Grid
                  item
                  key={`action-card-${index}`}
                  xs={12}
                  sm={4}
                  md={4}
                  lg={4}
                >
                  <a
                    href={item?.href?.url}
                    id={item?.hrefId?.value}
                    className={classes.quickLinksCard}
                  >
                    <InjectHTML
                      addAnchorStyles
                      className={classes.quickLinkCardIcon}
                      value={item?.icon?.value}
                    />
                    <InjectHTML
                      addAnchorStyles
                      tagType="h3"
                      styleType="h6"
                      value={item?.title?.value}
                    />
                  </a>
                </Grid>
              )
            })}
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={5}>
          <div
            style={{
              backgroundColor:
                actionCardBackgroundColor?.Color?.field?.value ||
                actionCardBackgroundColor?.value,
            }}
            className={classes.actionCard}
          >
            {isLoading ? (
              <Loading />
            ) : (
              <>
                <InjectHTML
                  addAnchorStyles
                  className={classes.actionCardIcon}
                  value={promotionalTileData?.actionCardIcon?.value}
                />
                <InjectHTML
                  addAnchorStyles
                  tagType="h3"
                  styleType="h5"
                  value={promotionalTileData?.actionCardTitle?.value}
                  className={classes.actionCardTitle}
                />
                <InjectHTML
                  addAnchorStyles
                  enableClick={true}
                  className={classes.actionCardDescription}
                  value={promotionalTileData?.actionCardDescription?.value}
                  styleType="p1"
                />
                <Button
                  type="link"
                  text={promotionalTileData?.actionCardButtonText?.value}
                  href={promotionalTileData?.actionCardButtonUrl?.url}
                  variant="secondary"
                  className={classes.linkBtn}
                />
              </>
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    ...COMPONENT_WRAPPER,
    margin: '60px auto',
  },
  title: {
    margin: '32px auto',
  },
  quickLinksCard: {
    border: `1px solid ${colors.main.borderGrey}`,
    borderRadius: 16,
    padding: 16,
    display: 'block',
    minHeight: 125,
    height: '100%',
    '&:hover': {
      backgroundColor: colors.main.grey,
      boxShadow: '0px 0px 7px 3px rgb(0 0 0 / 9%)',
    },
    [breakpoints.down('xs')]: {
      minHeight: 'unset',
      border: 0,
      borderBottom: `1px solid ${colors.main.borderGrey}`,
      borderRadius: 0,
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: 0,
      paddingBottom: 16,
      '&:hover': {
        backgroundColor: 'transparent',
        boxShadow: 'none',
      },
    },
  },
  quickLinkCardIcon: {
    marginBottom: 18,
    height: 30,
    '& svg': {
      height: 30,
      width: 30,
    },
    [breakpoints.down('xs')]: {
      marginBottom: 0,
    },
  },
  actionCardIcon: {
    marginBottom: 12,
    [breakpoints.down('xs')]: {
      height: 'unset',
    },
  },
  actionCard: {
    borderRadius: 16,
    padding: 24,
    minHeight: 'unset',
    height: '100%',
    [breakpoints.up('lg')]: {
      marginLeft: 30,
      minHeight: 265,
    },
    [breakpoints.down('md')]: {
      width: '66%',
    },
    [breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  linkBtn: {
    width: 'max-content',
    display: 'block',
    [breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  actionCardDescription: {
    marginBottom: 24,
  },
  actionCardTitle: {
    [breakpoints.down('xs')]: {
      fontSize: 18,
    },
  },
}))

export default QuickLinks
