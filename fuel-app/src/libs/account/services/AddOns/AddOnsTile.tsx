import { Button, InjectHTML } from '@/shared-ui/components'
import { DeleteAqua } from '@/shared-ui/react-icons/index'
import { makeStyles } from '@material-ui/core/styles'
import { useMemo } from 'react'
import { SELF_SERVICE } from 'src/constants/'
import { OfferListItemType } from './AddOns'

const AddOnsTile = ({
  tile,
  showButtonLoading,
  cartData,
  selectedTileTitle,
  isWHWFinOffers,
}: {
  tile: OfferListItemType
  showButtonLoading: boolean
  cartData: any
  selectedTileTitle: string
  isWHWFinOffers?: boolean
}) => {
  const classes = useStyles()

  const isAddedToCart = useMemo(() => {
    if (cartData?.CartLineItems) {
      const cartItems = cartData.CartLineItems.find(
        (item: { Type: string; ItemCode: string }) =>
          item.Type === 'New' && item.ItemCode === tile.itemCode,
      )
      if (cartItems) {
        return true
      }
    }
    return false
  }, [cartData])
  const tileDescription =
    tile.category === SELF_SERVICE.EXTENDERS && isWHWFinOffers
      ? tile.WHWFinOffersDescription
      : tile.description
  const isExtender = tile.category === 'EXTENDERS'
  const clickHandler = () => {
    let action = ''
    if (isExtender) {
      action = 'ADD_EXTENDER'
    } else {
      action = isAddedToCart ? 'REMOVE' : 'ADD'
    }
    tile.AddToCartButton?.onClick(tile, action)
  }
  return (
    <div className={classes.tileClass}>
      {tile?.icon && <div className={classes.iconClassName}>{tile?.icon}</div>}
      {tile?.title && (
        <InjectHTML
          testId="test-title"
          styleType={'h5'}
          tagType="h5"
          className={classes.titleClassName}
          value={tile.title}
        />
      )}
      {tile?.description && (
        <InjectHTML
          styleType={'p1'}
          testId="test-description"
          color={'default'}
          className={classes.descriptionClassName}
          value={tileDescription}
        />
      )}

      {tile?.subTitle && (
        <InjectHTML
          testId="test-subTitle"
          tagType="h6"
          styleType="h6"
          className={classes.subTitleClassName}
          value={tile.subTitle}
        />
      )}
      <div className={classes.buttonDiv}>
        <Button
          type="button"
          onClick={clickHandler}
          variant={'secondary'}
          text={
            isAddedToCart && !isExtender ? (
              <>
                {tile?.RemoveFromCartButton?.text}
                <DeleteAqua className={classes.buttonIconClassName} />
              </>
            ) : isExtender ? (
              tile?.addMeshExtender.value
            ) : (
              tile?.AddToCartButton.text
            )
          }
          className={classes.buttonClassName}
          hoverVariant="primary"
          isBusy={selectedTileTitle === tile.title ? showButtonLoading : false}
        />
      </div>

      <div className={classes.buttonDiv}>
        {tile?.LearnMoreButton.text && (
          <Button
            type="link"
            onClick={tile?.LearnMoreButton?.onClick}
            variant={'tertiary'}
            text={tile?.LearnMoreButton.text}
            disabled={Boolean(tile?.LearnMoreButton?.onClick)}
            href={tile?.LearnMoreButton?.href}
            className={classes.buttonClassName}
            objectID={tile?.LearnMoreButton?.objectID}
            hoverVariant="primary"
            onContextMenu={(e) => e.preventDefault()}
          />
        )}
      </div>
    </div>
  )
}

export default AddOnsTile

const useStyles = makeStyles(({ breakpoints }) => ({
  container: {
    position: 'relative',
    padding: 0,
  },
  tileClass: {
    width: '100%',
  },
  titleClassName: {
    paddingBottom: 16,
  },
  descriptionClassName: {
    paddingBottom: 16,
    height: 150,
    '& li': { padding: 8 },
  },

  subTitleClassName: {
    paddingBottom: 16,
  },

  buttonClassName: {
    marginRight: 16,
    marginBottom: 16,
    [breakpoints.up('md')]: {
      marginBottom: 16,
    },
    [breakpoints.up('lg')]: {
      marginBottom: 0,
    },
  },
  buttonIconClassName: {
    marginLeft: 6,
  },
  buttonDiv: {
    display: 'block',
    [breakpoints.up('sm')]: {
      display: 'inline-block',
    },
  },
  iconClassName: {
    paddingBottom: 16,
    '& svg': {
      height: 'auto',
      width: '40px',
      display: 'block',
      [breakpoints.down('xs')]: {
        width: '26px',
      },
    },
  },
}))
