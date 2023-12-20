import { useMemo } from 'react'
import { makeStyles } from '@material-ui/core'
import { ArticleCard } from '@/shared-ui/components'
import { COMPONENT_WRAPPER } from 'src/constants'
import { useAppData, useWindowDimensions } from 'src/hooks'
import colors from '@/shared-ui/colors'

const SupportArticles = () => {
  const supportArticlesData = useAppData('supportArticles', true)
  const { title, maxCap, cards } = supportArticlesData
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
        cardsContainerClassName={classes.articleCard}
        shouldTruncate
        title={title?.value}
        maxCap={maxCap?.value}
        cards={parsedCards}
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
  articleCard: {
    '& i:hover::before': {
      color: colors.main.blue,
    },
    '& i:hover>svg': {
      color: colors.main.blue,
    },
  },
}))

export default SupportArticles
