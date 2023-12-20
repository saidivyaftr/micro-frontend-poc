import { formatData } from './helper'
import { setCookie } from 'nookies'
import { DarkFooter } from '@/shared-ui/components'
import { locales, TRANSLATIONS_ENABLED_PAGES } from 'src/locales'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { FOOTER_LINKS, SITE_INTERACTION } from 'src/constants'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import { useAppData } from 'src/hooks'
interface DarkFooterProps {
  data?: any
  miniFooter?: boolean
}
/* eslint-disable @typescript-eslint/indent */
const Footer: React.FC<DarkFooterProps> = ({
  miniFooter,
  data,
}: DarkFooterProps): JSX.Element => {
  const item = useAppData('newFooter', true, data)
  const router = useRouter()
  const selectedLocale = locales.find(({ code }) => code === router.locale)
  const selectedLocaleCode = selectedLocale?.code
  const shouldShowTranslations = useMemo(() => {
    const shouldShowTranslations = TRANSLATIONS_ENABLED_PAGES.find(
      (pathname) => pathname === router?.asPath,
    )
    return Boolean(shouldShowTranslations)
  }, [router])
  const toggleLocale = ({ value }: any) => {
    setCookie(null, 'website#lang', value || 'en')
    let pathname = router.asPath
    if (pathname && pathname[0] !== '/') {
      pathname = '/' + pathname
    }
    const newLocation =
      selectedLocaleCode === 'es' ? `/es${pathname}` : pathname
    window.location.href = newLocation
  }
  const finalData = useMemo(() => {
    return formatData(item)
  }, [item])
  const clickAnalytics = (title: string) => {
    DTMClient.triggerEvent(
      {
        events: 'event14',
        eVar14: FOOTER_LINKS.replace('{NAME}', title.toLowerCase()),
      },
      'tl_o',
      SITE_INTERACTION,
    )
  }
  return (
    <DarkFooter
      {...finalData}
      onClickCallback={clickAnalytics}
      shouldShowTranslations={shouldShowTranslations}
      toggleLocale={toggleLocale}
      selectedLanguage={selectedLocale?.name}
      miniFooter={miniFooter}
    />
  )
}

export default Footer
