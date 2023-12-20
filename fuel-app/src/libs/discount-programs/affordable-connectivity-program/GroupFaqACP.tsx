import { useMemo, useState } from 'react'
import { makeStyles } from '@material-ui/core'
import { Accordion, Typography } from '@/shared-ui/components'
import { useAppData } from 'src/hooks'
import { COMPONENT_WRAPPER, TAB_CLICK } from 'src/constants'
import { FAQ_EXPAND, SITE_INTERACTION } from 'src/constants'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import SwiperTabs from './SwiperTabs'

const GroupFaqACP = () => {
  const classes = useStyles()
  const { field, title } = useAppData('faqGroup', true)
  const [selectedTab, setSelectedTab] = useState(0)

  const onTabChange = (newTabIndex: number) => {
    DTMClient.triggerEvent(
      {
        events: 'event14',
        eVar14: TAB_CLICK.replace('{NAME}', tabs[newTabIndex].toLowerCase()),
      },
      'tl_o',
      SITE_INTERACTION,
    )
    setSelectedTab(newTabIndex)
  }
  const tabs = useMemo(() => {
    return field?.list?.map(({ title }: any) => title?.value) || []
  }, [field])

  const fieldListFaq = useMemo(() => {
    return field?.list.map((faqSection: any) => {
      return faqSection?.faqItems.faqs?.map(({ title, description }: any) => ({
        title: title?.value || '',
        description: description?.value || '',
      }))
    })
  }, [field])
  const accordionClickHandler = (isExpanded: boolean, title: any) => {
    if (!isExpanded) return
    const description = FAQ_EXPAND.replace(
      '{TITLE}',
      `acp-faq:${title.toLowerCase()}`,
    )
    DTMClient.triggerEvent(
      { events: 'event14', eVar14: description },
      'tl_o',
      SITE_INTERACTION,
    )
  }

  return (
    <div className={classes.root}>
      {title?.value && (
        <Typography
          tagType="h4"
          styleType="h4"
          className={classes.faqMaintTitle}
        >
          {title?.value}
        </Typography>
      )}
      <SwiperTabs
        tabs={tabs}
        selectedTabIndex={selectedTab}
        setSelectedTab={onTabChange}
      />

      {fieldListFaq?.map((list: any, index: number) => {
        return (
          <div key={index}>
            {index == selectedTab && (
              <div className={classes.faqContainer}>
                <Accordion
                  list={list}
                  borderUnderDescription={true}
                  descriptionClassName={classes.accordionDescription}
                  accordionClickHandler={accordionClickHandler}
                />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

const useStyles = makeStyles(() => ({
  root: {
    ...COMPONENT_WRAPPER,
    margin: '60px auto',
    maxWidth: '1000px',
  },

  faqMaintTitle: { textAlign: 'center', marginBottom: '3.5rem' },
  faqContainer: {
    maxWidth: '968px',
    margin: '1rem auto',
  },
  accordionDescription: {
    marginTop: 0,
    padding: 16,
    '& a': {
      textDecoration: 'underline',
    },
    '& p': {
      margin: '0!important',
      marginBottom: '16px!important',
    },
  },
}))

export default GroupFaqACP
