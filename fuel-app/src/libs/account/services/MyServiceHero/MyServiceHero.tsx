import { makeStyles } from '@material-ui/core'
import { Breadcrumb, Typography } from 'src/blitz'
import { COMPONENT_WRAPPER, SESSION_STORAGE } from 'src/constants'
import colors from 'src/styles/theme/colors'
import { AccountDropdown } from '../../shared/AccountDropdown'
import { useCartDataContext } from 'src/libs/services/CartContextProvider'
import { formatUrl } from 'src/utils/urlHelpers'
import { Button } from '@/shared-ui/components'
import clx from 'classnames'
import { useEffect, useState } from 'react'
import EmptyCartModal from 'src/libs/services/shared/EmptyCartModal'
import HeroCartIcon from 'src/libs/services/shared/HeroCartIcon'

interface PageProps {
  title?: string
  breadcrumb?: any
  dashboard?: boolean
  showAccountsDropdown?: boolean
  showCheckoutButton?: boolean
  pageContent?: any
  tabs?: { url: string; title: string; component: any }[]
}

export type ModalType = 'EMPTY_CART' | 'INTERMEDIATE_CART' | 'NO_MODAL'

const MyServicesHero = ({
  title,
  breadcrumb,
  showAccountsDropdown = true,
  showCheckoutButton = false,
}: PageProps) => {
  const classes = useStyles()
  const [offersInfo, setOffersInfo] = useState(
    sessionStorage.getItem(SESSION_STORAGE.CART_DATA),
  )
  const { contextCartData } = useCartDataContext()
  const [modalType, setModalType] = useState<ModalType>('NO_MODAL')

  const handleCloseModal = () => {
    setModalType('NO_MODAL')
  }

  useEffect(() => {
    setOffersInfo(sessionStorage.getItem(SESSION_STORAGE.CART_DATA))
  }, [contextCartData])

  return (
    <div className={classes.wrapper}>
      <div className={classes.containerTop}>
        <div className={classes.breadcrumbWrapper}>
          <Breadcrumb
            variant="secondary"
            links={breadcrumb}
            breadCrumbClassName={classes.breadCrumbClassName}
          />
        </div>
        <HeroCartIcon />
      </div>
      <div className={classes.container}>
        <div className={classes.leftPanel}>
          <Typography styleType="h1" tagType="h1" color="tertiary">
            {title}
          </Typography>
          <div className={classes.cartIconMobileView}>
            <HeroCartIcon />
          </div>
        </div>
        {showAccountsDropdown && (
          <div className={classes.rightPanel}>
            <AccountDropdown />
          </div>
        )}
        {showCheckoutButton && (
          <Button
            variant="primary"
            type="link"
            href={`${formatUrl('/services/cart')}${window.location.search}`}
            text={'checkout'}
            hoverVariant="secondary"
            className={clx(classes.checkoutButton, {
              [classes.disabled]: !offersInfo,
            })}
            disabled
          />
        )}
      </div>
      <EmptyCartModal
        showEmptyCart={modalType === 'EMPTY_CART'}
        handleCloseModal={handleCloseModal}
      />
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  wrapper: {
    width: '100%',
    height: '14rem',
    background: colors.main.dark,
  },
  container: {
    ...COMPONENT_WRAPPER,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingTop: 60,
    [breakpoints.down('xs')]: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      gap: '1rem',
    },
  },
  leftPanel: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    [breakpoints.up('sm')]: {
      margin: '0',
      alignItems: 'flex-start',
      '&& h1': {
        fontSize: '2.4rem',
        lineHeight: '3.5rem',
      },
    },
  },
  rightPanel: {
    display: 'none',
    [breakpoints.up('sm')]: {
      maxWidth: '25rem',
      height: 'fit-content',
      display: 'flex',
      width: '100%',
      justifyContent: 'flex-end',
      alignItems: 'center',
      gap: '0.5rem',
    },
  },
  breadcrumbWrapper: {
    ...COMPONENT_WRAPPER,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingTop: 22,
    '& .active-link': {
      '&:hover': {
        color: colors.main.brightRed,
      },
    },
    '& a': {
      '&:hover': {
        color: colors.main.brightRed,
      },
    },
  },
  breadCrumbClassName: {
    fontSize: '1rem',
    lineHeight: '1.5rem',
  },
  containerTop: {
    display: 'none',
    [breakpoints.up('sm')]: {
      ...COMPONENT_WRAPPER,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
    },
  },
  cartIcon: {
    paddingTop: 22,
  },
  cartIconMobileView: {
    display: 'block',
    [breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  checkoutButton: {
    display: 'none',
    [breakpoints.up('sm')]: {
      display: 'block',
      marginLeft: '1rem',
    },
  },
  disabled: {
    pointerEvents: 'none',
    opacity: 0.3,
    cursor: 'not-allowed',
  },
}))

export default MyServicesHero
