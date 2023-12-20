export const getSecondaryNavItems = (
  action_nav_links: any,
  sessionValid: boolean,
  isAccountDashboard: boolean,
  firstName: string,
) => {
  const { Links } = action_nav_links
  const profileItems = Links?.[3]
  const profileNavItems = profileItems?.items?.map((data: any) => {
    return {
      title: data?.name,
      href: data?.path?.url,
    }
  })

  let username = Links?.[3]?.name
  if (firstName) {
    username = isAccountDashboard ? firstName : `Hi, ${firstName}`
  }

  const commonItems = {
    signIn: {
      title: Links?.[2]?.name,
      href: Links?.[2]?.path?.url,
    },
    logIn: {
      isLoggedIn: sessionValid,
      username,
    },
    profileNav: {
      items: profileNavItems,
    },
  }

  if (isAccountDashboard) {
    return {
      search: {
        title: '',
        href: Links?.[0]?.path?.url,
      },
      cart: {
        title: '',
        href: Links?.[1]?.path?.url,
      },
      ...commonItems,
    }
  }

  return {
    search: {
      title: Links?.[0]?.name,
      href: Links?.[0]?.path?.url,
    },
    cart: {
      title: Links?.[1]?.name,
      href: Links?.[1]?.path?.url,
    },
    ...commonItems,
  }
}

export const getMenuLinks = (
  main_links: any,
  accountDashboardMenuItems: any,
  isAccountDashboard: boolean,
  sessionValid: boolean,
  query: any,
) => {
  const accountNumber = query?.account
  const shouldAppendAccountNumber = sessionValid && !!accountNumber
  const { Links } = isAccountDashboard ? accountDashboardMenuItems : main_links
  return Links?.map((linkData: any) => {
    const firstLevelSubItems = linkData?.items?.map((flLinkData: any) => {
      const secondLevelSubItems =
        flLinkData?.subitems?.map((slLinData: any) => {
          return {
            title: slLinData?.title,
            href:
              slLinData?.path?.url +
              (shouldAppendAccountNumber ? `?account=${accountNumber}` : ''),
          }
        }) || []
      return {
        title: flLinkData?.title,
        href:
          flLinkData?.path?.url +
          (shouldAppendAccountNumber ? `?account=${accountNumber}` : ''),
        subItems: secondLevelSubItems,
      }
    })

    return {
      title: linkData?.title,
      href:
        linkData?.path?.url +
        (shouldAppendAccountNumber ? `?account=${accountNumber}` : ''),
      subItems: firstLevelSubItems,
      badge: linkData?.badge?.value,
    }
  })
}

export const getUtilityNavItems = (
  action_nav_links: any,
  sites: any,
  isAccountDashboard: boolean,
) => {
  const { Links } = action_nav_links
  const utilityNavData = sites?.site?.map((data: any) => {
    return {
      site: data?.title,
      href: data?.path?.url,
    }
  })
  return {
    languageHref: "https//www.frontier.com/espanol'",
    languageTitle: 'Español',
    ...(!isAccountDashboard && {
      cart: {
        title: Links?.[1]?.name,
        href: Links?.[1]?.path?.url,
      },
    }),
    sites: utilityNavData,
  }
}
