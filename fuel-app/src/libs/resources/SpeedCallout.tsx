import { makeStyles } from '@material-ui/core/styles'
import { SpeedCard } from '@/shared-ui/components'
import { useMemo } from 'react'
import { useAppData } from 'src/hooks'
import { COMPONENT_WRAPPER } from 'src/constants'
const SpeedCallOut = ({ data }: any) => {
  const classes = useStyles()
  const quickInfo = useAppData('quickInfo', true, data)

  const list = useMemo(
    () => ({
      title: quickInfo?.title?.value,
      backgroundColor: quickInfo?.backgroundColor?.value,
      perks: quickInfo?.perks?.list?.map(({ items, subtitle, title }: any) => ({
        subtitle: subtitle?.value,
        title: title?.value,
        targetItems: items?.targetItems?.map(({ name }: any) => ({
          name: name?.value,
        })),
      })),
      titleFontColor: quickInfo?.titleFontColor?.value,
    }),
    [quickInfo],
  )

  return (
    <div className={classes.root} data-testid="speedCallOut-info">
      <SpeedCard
        title={list?.title}
        backgroundColor={list?.backgroundColor}
        perks={list?.perks}
        titleFontColor={list?.titleFontColor}
      />
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    ...COMPONENT_WRAPPER,
    padding: '.5rem 0',
    maxWidth: '906px',
    margin: '2.5rem auto',
    [breakpoints.down('sm')]: {
      padding: '0 1rem',
    },
  },
}))

export default SpeedCallOut
