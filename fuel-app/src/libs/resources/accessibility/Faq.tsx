import React, { useMemo, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { makeStyles } from '@material-ui/core'
import { Accordion, InjectHTML } from '@/shared-ui/components'
import { FAQ_EXPAND, SITE_INTERACTION, COMPONENT_WRAPPER } from 'src/constants'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import dynamic from 'next/dynamic'
import { useAppData } from 'src/hooks'
import {
  PP_OBJECT_SANS,
  PP_OBJECT_SANS_BOLD,
} from 'src/constants/fontFamilyNames'

const AccessibilityForm = dynamic(() => import('./FormIframe'))

const FiberInternetFAQ = () => {
  useEffect(() => {
    const accordionItems = document.querySelectorAll(
      `.${classes.accordionDescription}`,
    )
    const secondAccordionItem = accordionItems[3]

    const formContainer = document.createElement('div')
    formContainer.setAttribute('id', 'form-container')

    const formComponent = <AccessibilityForm />
    ReactDOM.render(formComponent, formContainer)

    secondAccordionItem.appendChild(formContainer)

    return () => {
      ReactDOM.unmountComponentAtNode(formContainer)
    }
  }, [])
  const classes = useStyles()
  const { faqItems, title, showMoreText, showLessText, schema } = useAppData(
    'faqList',
    true,
  )
  const faqList = faqItems?.faqs || []

  const FIFaqList = useMemo(() => {
    return faqList?.map(({ title, description }: any) => ({
      title: title?.value || '',
      description: description?.value || '',
    }))
  }, [faqList])

  const accordionClickHandler = (isExpanded: boolean, title: any) => {
    if (!isExpanded) return
    const description = FAQ_EXPAND.replace(
      '{TITLE}',
      `accessible tv:${title.toLowerCase()}`,
    )
    DTMClient.triggerEvent(
      { events: 'event14', eVar14: description },
      'tl_o',
      SITE_INTERACTION,
    )
  }

  if (!title?.value) {
    return null
  }

  return (
    <>
      <div className={classes.root}>
        {title?.value && (
          <InjectHTML
            data-testid="faqTitle"
            tagType="h2"
            styleType="h3"
            className={classes.faqTitle}
            value={title?.value}
          />
        )}
        <div className={classes.faqContainer}>
          <Accordion
            list={FIFaqList}
            descriptionClassName={classes.accordionDescription}
            titleClassName={classes.title}
            accordionClickHandler={accordionClickHandler}
            maxCap={25}
            shouldTruncate={true}
            showMoreText={showMoreText?.value}
            showLessText={showLessText?.value}
          />
        </div>
        {schema?.value && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: schema?.value }}
          />
        )}
      </div>
    </>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    ...COMPONENT_WRAPPER,
    margin: '60px auto',
  },
  title: {
    fontFamily: PP_OBJECT_SANS,
    [breakpoints.down('xs')]: {
      paddingLeft: '0',
      paddingRight: '0',
    },
    '& svg': {
      height: '2rem',
      width: '2rem',
      [breakpoints.down('xs')]: {
        height: '1.5rem',
        width: '1.5rem',
      },
    },
  },
  faqTitle: {
    textAlign: 'center',
    maxWidth: 600,
    margin: 'auto',
  },
  faqContainer: {
    maxWidth: '60rem',
    margin: '1.874rem auto',
  },
  accordionDescription: {
    marginTop: 0,
    [breakpoints.down('xs')]: {
      padding: '1rem 0',
    },
    '& a': {
      textDecoration: 'underline',
    },
    '& p': {
      margin: '0!important',
      marginBottom: '16px!important',
    },
    '& ol li': {
      [breakpoints.down('xs')]: {
        padding: '0 0 1rem 0.4rem',
      },
    },
    '& ol li::marker': {
      fontSize: '1rem',
      lineHeight: '1.625rem',
      [breakpoints.down('xs')]: {
        fontFamily: PP_OBJECT_SANS_BOLD,
      },
    },
  },
}))

export default FiberInternetFAQ
