import { useMemo } from 'react'
import { ArticleCard } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core'

const SuggestedArticles = ({ data }: any) => {
  const styles = useStyles()
  const { id, lists: articleLists, title } = data || {}
  const parsedCards = useMemo(() => {
    return articleLists?.links?.map(
      ({ boxCaption, boxTitle, boxLink }: any) => ({
        title: boxCaption?.value,
        subtitle: boxTitle?.value,
        href: boxLink?.url,
      }),
    )
  }, [articleLists])

  if (!data || Object.keys(data || {}).length == 0) {
    return null
  }

  return (
    <div className={styles.root} id={id?.value}>
      <ArticleCard
        cards={parsedCards}
        cardsPerRow={2}
        title={title?.value}
        cardsContainerClassName={styles.cardsContainerClassName}
      />
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    width: '100%',
    padding: 0,
    marginBottom: 80,
    [breakpoints.down('sm')]: {
      marginBottom: 32,
    },
  },
  cardsContainerClassName: {
    marginTop: 24,
  },
}))

export default SuggestedArticles
