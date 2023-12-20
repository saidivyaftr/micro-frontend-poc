import { useMemo } from 'react'
import { makeStyles } from '@material-ui/core'
import { ArticleCard } from '@/shared-ui/components'
import { COMPONENT_WRAPPER } from 'src/constants'
import { useAppData, useWindowDimensions } from 'src/hooks'

const SupportArticles = () => {
  const supportArticlesData = useAppData('supportArticles', true)
  const {
    title,
    maxCap,
    cards,
    subtext,
    showMoreButtonText,
    showLessButtonText,
  } = supportArticlesData
  const classes = useStyles()
  const { width } = useWindowDimensions()
  const isMobileView = width < 768
  const parsedCards = useMemo(() => {
    return cards?.list?.map(({ title, subtitle, href, type }: any) => ({
      title: title?.value,
      subtitle: subtitle?.value,
      href: href?.url,
      type: type?.value,
    }))
  }, [cards])

  if (Object.keys(supportArticlesData)?.length === 0) {
    return null
  }
  return (
    <div className={classes.root}>
      <ArticleCard
        shouldTruncate
        title={title?.value}
        subtext={subtext?.value}
        maxCap={maxCap?.value}
        cards={parsedCards}
        showMoreText={showMoreButtonText?.value}
        showLessText={showLessButtonText?.value}
        itemsPerView={isMobileView ? 3 : 6}
      />
    </div>
  )
}

const useStyles = makeStyles(() => ({
  root: {
    ...COMPONENT_WRAPPER,
    margin: '60px auto',
  },
}))

export default SupportArticles
