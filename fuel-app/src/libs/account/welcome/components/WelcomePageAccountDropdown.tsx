import { useState, useMemo } from 'react'
import { makeStyles } from '@material-ui/core'
import {
  useSelectedUnprovisionedService,
  useUnprovisionedServices,
  useUnprovisionedServicesLoading,
} from 'src/selector-hooks'
import { Skeleton, Typography } from 'src/blitz'
import colors from 'src/styles/theme/colors'
import { Dropdown } from 'src/ui-kit'
import { capitalizeString } from 'src/utils/addressHelpers'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import clx from 'classnames'
import { useDispatch } from 'react-redux'
import { welcomeSlice } from 'src/redux/slicers'
import useWindowDimensions from '@/shared-ui/hooks/useWindowDimensions'

export const WelcomePageAccountDropdown = () => {
  const classes = useStyles()
  const isLoading = useUnprovisionedServicesLoading()
  const unprovisionedServices = useUnprovisionedServices()
  const selectedService = useSelectedUnprovisionedService()
  const dispatch = useDispatch()
  const { width } = useWindowDimensions()
  const isMobile = width < 768

  const [isOpen, setIsOpen] = useState(false)

  const options = useMemo(() => {
    return unprovisionedServices?.map(({ id, address }:any) => {
      let displayAddress = ''
      if (address) {
        const { streetNumber, streetName, streetSuffix, state } = address;
        displayAddress = [streetNumber, streetName,streetSuffix, state]
          .filter(Boolean)
          .join(' ')
      }
      if (!displayAddress) {
        displayAddress = id
      }
      return {
        label: capitalizeString(displayAddress ?? ''),
        value: id,
      }
    })
  }, [unprovisionedServices])

  if (isLoading) {
    return (
      <Skeleton
        width={300}
        height={40}
        backgroundColor={colors.main.skeletonBackgroundLight}
      />
    )
  }

  const selectedItem = options?.find(
    ({ value }) => value === selectedService.id,
  )

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

  const updateAccountSelection = (updatedId: string) => {
    const ACCOUNT_SELECTION_EVENT = 'my account:select account'
    DTMClient.triggerEvent(
      {
        events: 'event14',
        eVar14: ACCOUNT_SELECTION_EVENT,
      },
      'tl_o',
      ACCOUNT_SELECTION_EVENT,
    )
    const service = unprovisionedServices.find(({ id }) => id === updatedId)
    dispatch(welcomeSlice.actions.setSelectedService(service))
  }

  // TODO remove this and make above one to 1
  if (!(options?.length > 1)) {
    return null
  }

  return (
    <Dropdown
      className={classes.accountDropdown}
      value={selectedItemValue as any}
      options={options}
      onChange={({ value }) => {
        updateAccountSelection(value)
      }}
      styles={{ ...dropdownStyles(isOpen, isMobile) }}
      onMenuOpen={() => setIsOpen(true)}
      onMenuClose={() => setIsOpen(false)}
    />
  )
}

const dropdownStyles = (isOpen: boolean, isMobile: boolean) => ({
  controlStyles: {
    backgroundColor: isOpen ? colors.main.darkShadeBlue : 'transparent',
    padding: '0px 8px',
    border: `1px solid ${colors.main.white}`,
    maxWidth: isMobile ? '100%' : '350px',
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
    maxWidth: isMobile ? '100%' : '350px',
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
    minWidth: '18rem',
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
