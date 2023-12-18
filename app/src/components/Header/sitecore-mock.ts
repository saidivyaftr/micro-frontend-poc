// TODO: (AM) Move this to sitecore

export const accountDashboardMenuItems = {
  Links: [
    {
      title: 'My Account',
      path: { url: '' },
      items: [
        {
          path: { url: '/account/dashboard' },
          title: 'Dashboard',
        },
        {
          path: { url: '/account/profile' },
          title: 'My Profile',
        },
        {
          path: { url: '/account/account-access' },
          title: 'Account access',
        },
      ],
    },
    {
      title: 'My Billing',
      path: { url: '' },
      items: [
        {
          path: { url: '/account/billing' },
          title: 'My Billing',
        },
        {
          path: { url: '/account/billing/make-a-payment' },
          title: 'Make a payment',
        },
        {
          path: { url: '/account/billing/payment-methods' },
          title: 'Payment methods',
        },
        {
          path: { url: '/account/billing/billing-history' },
          title: 'Billing history',
        },
      ],
    },
    {
      title: 'My Services',
      path: { url: '/account/services' },
      items: [],
    },
  ],
}

export const accountDashboardActionNavLinks = {
  Links: [
    { name: 'Search', path: { url: '/search/' }, items: [] },
    {
      name: 'Cart',
      path: { url: '/services/cart' },
      items: [],
      showCart: false,
    },
    { name: 'Sign In/Register', path: { url: '/login/' }, items: [] },
    {
      name: 'Sign Out',
      path: { url: '/' },
      items: [{ name: 'Sign Out', path: { url: '/logout' } }],
    },
  ],
}

// Sticky nav bar sitecore
export const loggedInSites = {
  site: [
    {
      title: 'Back to residential',
      path: {
        url: '/',
      },
    },
  ],
}
