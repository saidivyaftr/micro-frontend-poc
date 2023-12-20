/**
 * @module Yext
 * @description Our Yext Resource
 */
import Head from 'next/head'
import Script from 'next/script'
import StyleSheet from './link'

/**
 * @function Component
 * @description Yext Search
 */

export default function Component() {
  const addSearchBarOnHelpCenter = async (ANSWERS) => {
    if (!window) await new Promise((res) => setTimeout(() => res(true), 1000))
    let limiter = 3
    if (
      window &&
      (window.location.pathname.includes('helpcenter') ||
        window.location.pathname.includes('contact-us'))
    ) {
      const id = setInterval(async () => {
        try {
          ANSWERS.addComponent('SearchBar', {
            container: '.yext-search-container-help-center',
            name: 'yext-help-center', // Must be unique for every search bar on the same page
            submitIcon: 'magnifying_glass',
            redirectUrl: '/search',
            placeholderText: '...',
          })
          clearInterval(id)
          return
        } catch (error) {
          console.log('UNABLE TO LOAD SEARCH CONTAINER ON HELP CENTER')
        }
        limiter--
        if (limiter <= 0) {
          clearInterval(id)
        } else if (limiter === 1) {
          await new Promise((res) => setTimeout(() => res(true), 2000))
        }
      }, 1000)
    }
  }
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://assets.sitescdn.net/answers-search-bar/v1.0/answers.css"
        />
      </Head>
      <Script
        src="https://assets.sitescdn.net/answers-search-bar/v1.0/answerstemplates.compiled.min.js"
        strategy="lazyOnload"
      />
      <Script
        src="https://assets.sitescdn.net/answers-search-bar/v1.0/answers.min.js"
        strategy="lazyOnload"
        onLoad={() => {
          ANSWERS.domReady(() => {
            try {
              ANSWERS.init({
                apiKey: '9aa0b84c073c91a533e0a7a9ca3980c5',
                experienceKey: 'frontier-communications-answers',
                experienceVersion: 'PRODUCTION',
                locale: 'en', // e.g. en
                businessId: '3557194',
                templateBundle:
                  TemplateBundle.default /* eslint-disable-line no-undef */,
                onReady: () => {
                  try {
                    ANSWERS.addComponent('SearchBar', {
                      container: '.yext-search-container',
                      name: 'mobile-search-1', // Must be unique for every search bar on the same page
                      submitIcon: 'magnifying_glass',
                      redirectUrl: '/search',
                      placeholderText: 'Search',
                    })
                  } catch (error) {
                    console.log('UNABLE TO LOAD SEARCH CONTAINER ON NAV BAR')
                  }
                  addSearchBarOnHelpCenter(ANSWERS)
                },
              })
            } catch (error) {
              console.error('Unable to load yext at the moment')
            }
          })
        }}
      />
    </>
  )
}
