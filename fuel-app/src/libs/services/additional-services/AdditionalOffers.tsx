import { Typography, InjectHTML, Loading } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core/styles'
import colors from '@/shared-ui/colors'
import { COMPONENT_WRAPPER, SELF_SERVICE } from 'src/constants'
import { useAppData, useWindowDimensions } from 'src/hooks'
import { IFourTileItem } from '@/shared-ui/components/FourTiles/types'
import { offerData, tileData } from '../shared/types'
import {
  siteInteractionAnalytics,
  VASProductListAnalytics,
} from '../shared/AnalyticsUtlis'
import { useEffect, useState } from 'react'
import Tile from './Tile'
import {
  PP_OBJECT_SANS,
  PP_OBJECT_SANS_BOLD,
} from 'src/constants/fontFamilyNames'
import { useSelector } from 'react-redux'
import { formatUrl } from 'src/utils/urlHelpers'

type propsType = {
  pageCode?: string
  pdpOffersData?: offerData[]
  accountBtn?: string
  icaseId?: string
  loading?: boolean
}

const AdditionalOffers = (props: propsType) => {
  const { pageCode, pdpOffersData, loading } = props
  const { title, subTitle, tileList } = useAppData('ServicesList', true)
  const classes = useStyles()
  const [showLoading, setShowLoading] = useState<boolean>(
    loading ? loading : true,
  )
  const offersData = pdpOffersData
  const [offerList, setOfferList] = useState<IFourTileItem[]>([])
  const [productListString, setProductListString] = useState<string>('')

  const { width } = useWindowDimensions()
  const isMobile = width <= 768

  const hasDTMLLoaded = useSelector(
    (state: any) => state?.appConfig?.configs?.['DTM'],
  )
  useEffect(() => {
    if (hasDTMLLoaded && productListString !== '') {
      VASProductListAnalytics(productListString)
    }
  }, [hasDTMLLoaded, productListString])

  const onClickTile = (product: string) => {
    const str = SELF_SERVICE.LEARN_MORE + ' - ' + product
    siteInteractionAnalytics(str, SELF_SERVICE.SITE_INTERACTION)
  }

  useEffect(() => {
    if (offersData) {
      const filteredByOffers = tileList.list.filter((tile: tileData) => {
        return (
          offersData.filter(
            (offer: offerData) => offer?.ItemCode === tile?.id?.value,
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
            subTitle: getPriceString(tile?.Price, tile?.ItemCode),
            description: tile?.description?.value,
            icon: <InjectHTML value={tile?.icon?.rendered} />,
            button: {
              text: tile?.buttonText?.value,
              href: formatUrl(tile?.href?.value),
              onClick: () => onClickTile(tile?.title?.value),
            },
          }
        })

      setOfferList(list)
      setShowLoading(false)
      // Send List to Analytics
      let productString = ';'
      mergeById.map((item: offerData, index: number) => {
        switch (item.ItemCode) {
          case SELF_SERVICE.PRODUCT_WHWIFI_PAGE_CODE:
            productString += SELF_SERVICE.PRODUCT_WHWIFI
            break
          case SELF_SERVICE.PRODUCT_MPTP_PAGE_CODE:
            productString += SELF_SERVICE.PRODUCT_MPTP
            break
          case SELF_SERVICE.PRODUCT_FSWFI_PAGE_CODE:
            productString += SELF_SERVICE.PRODUCT_EEROSECURE
            break
          case SELF_SERVICE.PRODUCT_YTTVE_PAGE_CODE:
            productString += SELF_SERVICE.PRODUCT_YTTVE
            break
          case SELF_SERVICE.PRODUCT_FTRTS_PAGE_CODE:
            productString += SELF_SERVICE.PRODUCT_FTRTS
            break
        }
        // The empty semicolons, because we are not returning Quantity, Price, or Events with an Add to Cart event.
        productString += ';' // Quantity
        productString += ';' // Price
        productString += ';' // Event
        // Adding , to separate the products
        if (index + 1 !== mergeById.length) {
          productString += ',;' // if more product
        }
      })
      //My Account VAS Add-Ons
      setProductListString(productString)
    }
  }, [offersData])
  /* eslint-disable @typescript-eslint/indent */
  const getPriceString = (price: string, itemCode?: string) => {
    return isMobile
      ? `<span style="font-size:30px;font-family: '${PP_OBJECT_SANS_BOLD}'">$${price}</span><span style="font-size:14px;font-family: '${PP_OBJECT_SANS}'">/mo. ${
          itemCode === 'YTTVE' ? '+taxes' : ''
        }</span>`
      : `<span style="font-size:56px;font-family: '${PP_OBJECT_SANS_BOLD}'">$${price}</span><span style="font-size:16px;font-family: '${PP_OBJECT_SANS}'">/mo. ${
          itemCode === 'YTTVE' ? '+taxes' : ''
        }</span>`
  }
  return showLoading ? (
    <Loading className={classes.loaderArea} />
  ) : offerList.length > 0 ? (
    <div id="special-about-fiber">
      <div className={classes.wrapper}>
        <div className={classes.container} id="more">
          <Typography tagType="h3" styleType="h3" className={classes.title}>
            {title?.value}
          </Typography>
          <Typography tagType="p" styleType="p2" className={classes.subTitle}>
            {subTitle?.value}
          </Typography>
          {offerList && !showLoading && (
            <div className={classes.tileParent}>
              {offerList?.map((item: IFourTileItem, i: number) => (
                <Tile
                  key={i}
                  tile={item}
                  type="light"
                  titleStyleType="h5"
                  descriptionStyleType="p1"
                  descriptionClassName={classes.tileDescription}
                  iconClassName={classes.ymalIcon}
                  titleClassName={classes.tileTitle}
                  className={classes.tile}
                  subTitleClassName={classes.subTitleClassName}
                  buttonClassName={classes.buttonClassName}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  ) : (
    <></>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    background: colors.main.grey,
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
    marginBottom: 16,
    textAlign: 'center',
  },
  subTitle: {
    marginBottom: 48,
    textAlign: 'center',
    [breakpoints.down('sm')]: {
      textAlign: 'center',
      marginBottom: 32,
    },
  },
  loaderArea: {
    ...COMPONENT_WRAPPER,
    height: 100,
  },
  tileParent: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    justifyContent: 'flex-start',
    gap: '32px',
    [breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  },
  tile: {
    backgroundColor: colors.main.white,
    width: '48%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: '32px 32px 32px 32px',
    borderRadius: '1rem',
    [breakpoints.down('sm')]: {
      padding: '32px 16px 32px 16px',
      width: '70%',
    },
    [breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  tileTitle: {
    marginTop: 32,
    fontSize: '30px',
    [breakpoints.down('xs')]: {
      fontSize: '24px',
    },
  },
  tileDescription: {
    minHeight: 80,
    fontSize: '16px',
    margin: '1rem 0 2rem 0',
    [breakpoints.down('xs')]: {
      margin: '1rem 0',
    },
  },
  ymalIcon: {
    '& svg': {
      height: 'auto',
      width: '40px',
      display: 'block',
      [breakpoints.down('xs')]: {
        width: '26px',
      },
    },
  },
  subTitleClassName: {
    fontSize: '56px',
    marginTop: '16px',
    [breakpoints.down('xs')]: {
      marginTop: '32px',
      fontSize: '30px',
    },
  },
  buttonClassName: {
    marginTop: '16px',
    [breakpoints.down('xs')]: {
      marginTop: '20px',
    },
  },
}))

export default AdditionalOffers
