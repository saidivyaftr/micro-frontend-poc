import colors from '@/shared-ui/colors'
import { Accordion, InjectHTML } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { COMPONENT_WRAPPER, FAQ_EXPAND, SITE_INTERACTION } from 'src/constants'
import { PP_OBJECT_SANS_MEDIUM } from 'src/constants/fontFamilyNames'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'

const FAQ = ({ data }: any) => {
  const router = useRouter()
  const {
    faqItems,
    title,
    schema,
    maxCap,
    description,
    showMoreText,
    showLessText,
    backgroundColor,
  } = data

  const classes = useStyles(backgroundColor?.color || colors.main.grayWhite)()
  const FIFaqList = useMemo(() => {
    return faqItems?.list
      ?.map(({ title, description }: any) => {
        if (title?.value && description?.value) {
          return {
            title: title?.value || '',
            description: description?.value || '',
          }
        }
        return ''
      })
      .filter((item: any) => !!item)
  }, [faqItems])

  const accordionClickHandler = (isExpanded: boolean, title: any) => {
    if (!isExpanded) return
    const description = FAQ_EXPAND.replace(
      '{TITLE}',
      `${router?.query?.page}:${title?.toLowerCase()}`,
    )

    DTMClient.triggerEvent(
      { events: 'event14', eVar14: description },
      'tl_o',
      SITE_INTERACTION,
    )
  }
  if (Object.keys(data)?.length === 0) {
    return null
  }

  return (
    <div id="Corporate-FAQ" className={classes.wrapper}>
      <div className={classes.root} data-testid="HelpCenterFAQ">
        {title?.value && (
          <InjectHTML
            addAnchorStyles
            data-testid="faqTitle"
            tagType="h2"
            styleType="h3"
            className={classes.faqTitle}
            value={title?.value}
          />
        )}
        {description?.value && (
          <InjectHTML
            addAnchorStyles
            data-testid="faqDescription"
            styleType="h6"
            tagType="h3"
            className={classes.faqDescription}
            value={description?.value}
          />
        )}
        <div className={classes.faqContainer}>
          <Accordion
            list={FIFaqList}
            descriptionClassName={classes.accordionDescription}
            shouldTruncate
            maxCap={maxCap?.value}
            showMoreText={showMoreText?.value}
            showLessText={showLessText?.value}
            accordionClickHandler={accordionClickHandler}
          />
        </div>
        {schema?.value != null && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: schema?.value }}
          />
        )}
      </div>
    </div>
  )
}

const useStyles = (backgroundColor: any) =>
  makeStyles(({ breakpoints, typography }) => ({
    wrapper: {
      backgroundColor: backgroundColor,
    },
    root: {
      ...COMPONENT_WRAPPER,
      padding: `${typography.pxToRem(80)} ${typography.pxToRem(120)}`,
      [breakpoints.down('sm')]: {
        padding: `${typography.pxToRem(16)}`,
      },
    },
    faqTitle: {
      textAlign: 'center',
      margin: `${typography.pxToRem(16)} auto`,
    },
    faqDescription: {
      margin: `${typography.pxToRem(16)} auto`,
    },
    faqContainer: {
      margin: `${typography.pxToRem(30)} auto`,
    },
    accordionDescription: {
      marginTop: 0,
      padding: `${typography.pxToRem(16)}`,
      '& a': {
        textDecoration: 'underline',
        fontFamily: PP_OBJECT_SANS_MEDIUM,
      },
      '& p': {
        margin: '0!important',
        marginBottom: `${typography.pxToRem(16)}!important`,
      },
    },
  }))

export default FAQ
