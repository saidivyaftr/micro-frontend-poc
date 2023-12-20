import { useState, useMemo } from 'react'
import { makeStyles } from '@material-ui/core'
import { useAccountList, useActiveAccountId } from 'src/selector-hooks'
import { Skeleton, Typography } from 'src/blitz'
import colors from 'src/styles/theme/colors'
import { Dropdown } from 'src/ui-kit'
import { RightArrowIcon } from 'src/blitz/assets/react-icons'
import { useRouter } from 'next/router'
import { capitalizeString } from 'src/utils/addressHelpers'
import { AppRoutes } from 'src/constants'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import clx from 'classnames'
import { useFormatterAccountNumber } from '@/shared-ui/hooks/index'

export const AccountDropdown = () => {
  const classes = useStyles()
  const router = useRouter()
  const { data: accountListData, isLoading } = useAccountList()
  const activeAccountId = useActiveAccountId()
  const [isOpen, setIsOpen] = useState(false)
  const { formatterAccountNumber } = useFormatterAccountNumber()

  const getDisplayAddress = (street: string[] | string) => {
    return Array.isArray(street) ? street.join(', ') : street
  }

  const options = useMemo(() => {
    return accountListData?.map(({ accountNumber, serviceDetails }) => {
      const serviceAddress =
        serviceDetails?.details.serviceAddress?.street || ''
      let displayAddress = getDisplayAddress(serviceAddress)

      if (!displayAddress) {
        const billingAddress =
          serviceDetails?.details.billingAddress?.street || ''
        displayAddress = getDisplayAddress(billingAddress)
      }

      if (!displayAddress) {
        displayAddress = formatterAccountNumber(accountNumber)
      }

      return {
        label: capitalizeString(displayAddress ?? ''),
        value: accountNumber,
      }
    })
  }, [accountListData])

  if (isLoading) {
    return (
      <Skeleton
        width={300}
        height={40}
        backgroundColor={colors.main.skeletonBackgroundLight}
      />
    )
  }

  const selectedItem = options?.find(({ value }) => value === activeAccountId)
  const selectedItemValue = {
    label: (
      <div>
        <Typography
          tagType="span"
          color="tertiary"
          className={clx('dropdown-text', classes.dropdownText)}
        >
          <>
            <strong>Account:</strong>{' '}
            <span className="address-text">{selectedItem?.label}</span>
          </>
        </Typography>
      </div>
    ),
    value: selectedItem?.value,
  }

  const updateAccountSelection = (id: string) => {
    const ACCOUNT_SELECTION_EVENT = 'my account:select account'
    DTMClient.triggerEvent(
      {
        events: 'event14',
        eVar14: ACCOUNT_SELECTION_EVENT,
      },
      'tl_o',
      ACCOUNT_SELECTION_EVENT,
    )
    router.push(
      {
        pathname: router.pathname,
        query: { ...(router.query || {}), account: id },
      },
      undefined,
      {
        shallow: true,
      },
    )
  }

  if (options?.length === 0) {
    return null
  }

  if (options?.length === 1) {
    return (
      <div className={classes.fakeDropdown}>{selectedItemValue?.label}</div>
    )
  }

  return (
    <Dropdown
      className={classes.accountDropdown}
      value={selectedItemValue as any}
      options={[
        ...options,
        {
          label: (
            <Typography
              className={classes.dropdownText}
              fontType="boldFont"
              color="tertiary"
            >
              <span className={classes.manageAccountsItem}>
                Manage accounts
                <RightArrowIcon height="24" width="24" />
              </span>
            </Typography>
          ),
          value: 'Manage accounts',
        },
      ]}
      onChange={({ value }) => {
        if (value === 'Manage accounts') {
          router.push(
            { pathname: AppRoutes.ProfilePage, query: router.query },
            undefined,
            { shallow: false },
          )
        } else {
          updateAccountSelection(value)
        }
      }}
      styles={{ ...dropdownStyles(isOpen) }}
      onMenuOpen={() => setIsOpen(true)}
      onMenuClose={() => setIsOpen(false)}
    />
  )
}

const dropdownStyles = (isOpen: boolean) => ({
  controlStyles: {
    backgroundColor: isOpen ? colors.main.darkShadeBlue : 'transparent',
    padding: '0px 8px',
    border: `1px solid ${colors.main.white}`,
    maxWidth: '350px',
    height: 48,
    width: '100%',
    '&:hover': {
      outline: 0,
      backgroundColor: colors.main.darkShadeBlue,
    },
    '&:active': {
      backgroundColor: colors.main.darkShadeBlue,
    },
    '& svg': {
      height: 24,
      width: 24,
    },
  },
  menuStyles: {
    backgroundColor: colors.main.darkShadeBlue,
    border: `1px solid ${colors.main.white}`,
    maxWidth: '350px',
  },
  optionStyles: {
    backgroundColor: 'transparent',
    lineHeight: '20px',
    padding: 8,
    color: colors.main.white,
    height: 'auto',
    borderRadius: 8,
    margin: '0px 8px',
    width: 'calc(100% - 16px)',
    '&:hover': {
      color: colors.main.brightRed,
      background: colors.main.dark,
    },
  },
  singleValueStyles: {
    '& .menu-item': {
      minWidth: '100%',
      overflow: 'hidden',
      textOverflow: 'ellipse',
    },
  },
  dropdownIndicatorStyles: {
    color: colors.main.white,
    '&:hover': {
      color: colors.main.white,
    },
  },
})

const useStyles = makeStyles(({ breakpoints }) => ({
  accountDropdown: {
    '&::after': {
      content: "'Expand'",
      display: "none",
      margin: 'auto',
      padding: 4,
      borderRadius: 4,
      background: colors.main.grey,
      fontFamily: 'PP Object Sans',
      fontSize: 12,
      fontStyle: 'normal',
      fontWeight: 400,
      right: -30,
      top:10,
    },
    '&:hover::after': {
        display: "block",
        position: "absolute",
    },
    width: '100%',
    minWidth: '25rem',
    background: 'transparent',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'flex-end',
    '& .menu-item': {
      color: colors.main.white,
    },
    '& .menu-item-checkmark': {
      '& svg': {
        marginLeft: 8,
        '& path': {
          fill: colors.main.greenishBlue,
        },
      },
    },
    [breakpoints.down('md')]: {
      minWidth: '100%',
    },
    [breakpoints.down('xs')]: {
      minWidth: '100%',
      justifyContent: 'flex-start',
    },
  },
  manageAccountsItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  dropdownText: {
    fontSize: 16,
    lineHeight: '24px',
  },
  fakeDropdown: {
    padding: '12px 16px',
    border: `1px solid ${colors.main.darkShadeBlue}`,
    width: '100%',
    maxWidth: 300,
    borderRadius: 32,
    '& .address-text': {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      display: 'block',
    },
    '& .dropdown-text': {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
    },
    height: 48,
    [breakpoints.down('xs')]: {
      maxWidth: '100%',
    },
  },
}))
