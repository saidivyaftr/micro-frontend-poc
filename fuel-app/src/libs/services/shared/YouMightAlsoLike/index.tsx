import { Typography, InjectHTML, Loading } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core/styles'
import colors from '@/shared-ui/colors'
import { COMPONENT_WRAPPER, SELF_SERVICE, SESSION_STORAGE } from 'src/constants'
import { useAppData } from 'src/hooks'
import Swiper from './Swiper'
import { IFourTileItem } from '@/shared-ui/components/FourTiles/types'
import { offerData, tileData } from '../types'
import { siteInteractionAnalytics } from '../AnalyticsUtlis'
import { useEffect, useState } from 'react'
import APIClient from 'src/api-client'
import { useRouter } from 'next/router'
import { formatUrl } from 'src/utils/urlHelpers'
import { useCartDataContext } from 'src/libs/services/CartContextProvider'
import { getICase } from 'src/libs/account/welcome/helper'

type propsType = {
  pageCode?: string
  pdpOffersData?: offerData[]
  accountBtn?: string
  loading?: boolean
}

const YouMightAlsoLike = (props: propsType) => {
  const { pageCode, pdpOffersData, accountBtn, loading } = props

  const { title, tileList } = useAppData('RelatedProduct', true)
  const classes = useStyles()
  const [showLoading, setShowLoading] = useState<boolean>(
    loading ? loading : true,
  )
  const router = useRouter()
  const { s } = router.query
  const sourceId = s as string
  const { contextCartData } = useCartDataContext()

  useEffect(() => {
    if (contextCartData?.Offers) {
      setOffersData(contextCartData?.Offers)
    }
  }, [contextCartData])

  const [offersData, setOffersData] = useState<offerData[] | undefined>(
    pdpOffersData,
  )
  const [offerList, setOfferList] = useState<IFourTileItem[]>([])

  useEffect(() => {
    const getData = async () => {
      if (accountBtn) {
        const ICID =
          sessionStorage.getItem(SESSION_STORAGE.ICID) ||
          (await getICase(accountBtn))
        const response = await getOffersSelfService(accountBtn, ICID)
        setOffersData(response.Offers)
      }
    }
    // Call getData only if we do not have offersData from Parent
    if (!offersData && tileList) {
      getData()
    }
  }, [accountBtn, tileList])

  const getOffersSelfService = async (accountBtn: string, icaseId: string) => {
    try {
      const response: any = await APIClient.getOffersSelfService(
        accountBtn,
        icaseId,
        sourceId,
      )
      return response.data
    } catch (error) {}
  }

  const onClickTile = () => {
    siteInteractionAnalytics(
      SELF_SERVICE.RELATED_PRODUCT_LEARN_MORE,
      SELF_SERVICE.LEARN_MORE,
    )
  }

  useEffect(() => {
    if (offersData) {
      const filteredByOffers = tileList.list.filter((tile: tileData) => {
        return (
          offersData.filter(
            (offer: offerData) =>
              offer?.ItemCode === tile?.id?.value && offer?.Action === 'Add',
          ).length > 0
        )
      })
      // Merging both Array based in Id, so we can get price and other data from both array
      const mergeById = filteredByOffers?.map((item1: tileData) => ({
        ...offersData.find(
          (item2: offerData) => item2?.ItemCode === item1?.id?.value,
        ),
        ...item1,
      }))
      // Matching Data, and showing the left over item/s in related items
      const list = mergeById
        ?.filter(
          (o1: tileData) =>
            !offersData.some((o2: offerData) => {
              return o2?.ItemCode === o1?.id?.value && o2?.ItemCode === pageCode
            }),
        )
        .map((tile: tileData) => {
          return {
            title: tile?.title?.value,
            subTitle:
              tile.ItemCode === 'YTTVE'
                ? `$${tile?.Price}/mo. +taxes`
                : `$${tile?.Price}/mo.`,
            description: tile?.description?.value,
            icon: <InjectHTML value={tile?.icon?.rendered} />,
            button: {
              text: tile?.buttonText?.value,
              href: `${formatUrl(tile?.href?.url)}${window.location.search}`,
              onClick: onClickTile,
            },
          }
        })
      setOfferList(list)
      setShowLoading(false)
    }
  }, [offersData])
  return showLoading ? (
    <Loading className={classes.loaderArea} />
  ) : offerList.length > 0 ? (
    <div id="special-about-fiber" className={classes.root}>
      <div className={classes.wrapper}>
        <div className={classes.container} id="more">
          <Typography tagType="h2" styleType="h3" className={classes.title}>
            {title?.value}
          </Typography>
          {offerList && !showLoading && <Swiper tiles={offerList} />}
        </div>
      </div>
    </div>
  ) : (
    <></>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    background: colors.main.dark,
  },
  wrapper: {
    ...COMPONENT_WRAPPER,
    paddingTop: 80,
    paddingBottom: 16,
    [breakpoints.down('sm')]: {
      paddingTop: 32,
      paddingBottom: 32,
    },
  },
  container: {
    position: 'relative',
    [breakpoints.down('sm')]: {
      padding: 0,
    },
  },
  title: {
    marginBottom: 48,
    [breakpoints.down('sm')]: {
      textAlign: 'center',
      marginBottom: 32,
    },
    color: colors.main.greenishBlue,
  },
  loaderArea: {
    ...COMPONENT_WRAPPER,
    height: 100,
  },
}))

export default YouMightAlsoLike
