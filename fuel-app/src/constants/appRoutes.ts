export const AppRoutes = {
  BillingPage: '/account/billing',
  StatementComparison: '/account/billing/billing-history/compare-statements',
  CurrentBillPage: '/account/statements/current',
  PastBillPage: '/account/statements/history',
  CompareBillSelectPage: '/account/statements/compare-bills/select',
  CompareBillPage: '/account/statements/compare-bills/compare',
  MakePaymentPage: '/account/payments/onetime',
  MakePaymentConfirmation: '/account/payments/onetime/confirmation',
  AddPaymentMethodPage: '/account/payments/new-method',
  PaymentActivityPage: '/account/billing/billing-history/payments',
  ManagePaymentMethodPage: '/account/payments/methods',
  AutoPaySignUpPage: '/account/payments/autopay/signup',
  AutoPayManagePage: '/account/payments/autopay/manage',
  AutopayConfirmationPage: '/account/payments/autopay/confirmation',
  ExpresspayConfirmationPage: '/expresspay/confirmation',
  HelpCenterQuickLink: '/helpcenter',
  PaymentMethodsPage: '/account/billing/payment-methods',
  TicketStatusQuickLink: '/helpcenter/categories/ticket-status',
  OrderStatusQuickLink: '/helpcenter/categories/order-status',
  SupportWizardQuickLink: '/helpcenter/categories/support-wizard',
  FrontierEmailQuickLink: 'https://login.frontier.com/webmail',
  YoutubeTvActivationPage: '/youtubetv/activate',
  YoutubeTvConfirmationPage: '/youtubetv/confirmation',
  AccountPage: '/account/dashboard',
  WelcomePage: '/account/welcome',
  LoginPage: '/login',
  SelfServiceHomeShieldElite: '/services/homeshield-elite',
  SelfServicePremiumTechPro: '/services/premium-tech-pro',
  SelfServiceWholeHomeWifi: '/services/whole-home-wifi',
  SelfServiceYoutubeTv: '/services/youtube-tv',
  SelfServiceTotalShield: '/services/total-shield',
  SelfServiceEeroSecure: '/services/eero-secure',
  SelfServiceCartPage: '/services/cart',
  SelfServiceConfirmationPage: '/services/confirmation',
  AccountDashboard: '/account/dashboard',
  MyServices: '/account/services',
  MyServicesAddons: '/account/services#addOns',
  AdditionalServices: '/services',
  ForgotIdPage: '/forgot-id',
  ForgotPasswordPage: '/forgot-password',
  ResetPasswordPage: '/reset-password',
  ContactVerificationPage: '/contact-verification',
  ProfilePage: '/account/profile',
  MakeAPaymentPage: '/account/billing/make-a-payment',
  BillingHistory: '/account/billing/billing-history',
  PaymentsHistory: '/account/payments/history',
  AccountAccess: '/account/account-access',
  LinkAccount: '/account/account-access/link-account',
  checkForOutages:
    '/helpcenter/internet/troubleshooting/check-for-service-outages',
}

export const isPostLoginRoute = (pathname: string) => {
  return pathname?.includes('/account') || pathname?.includes('/services')
}
