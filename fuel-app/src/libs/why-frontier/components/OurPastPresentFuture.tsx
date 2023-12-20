import { HoverReveal } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/styles'
import colors from '@/shared-ui/colors'
import { useAppData } from 'src/hooks'

const BACKGROUND_COLOR = colors.main.dark
type IPosition = 'left' | 'right' | 'center'
type IColor = 'primary' | 'secondary' | 'tertiary' | 'default'
const LAYOUT_CONFIG: IPosition[] = ['left', 'center', 'right']

const OurPastPresentFuture = () => {
  const classes = useStyles()
  const { list } = useAppData('ourPastPresentFuture', true)
  if (!list || !list?.targetItems) {
    return null
  }
  return (
    <div className={classes.root}>
      {list?.targetItems?.map((item: any, index: number) => (
        <HoverReveal
          key={`hover-reveal-${index}`}
          titleBackground={BACKGROUND_COLOR}
          alignTitle={LAYOUT_CONFIG[index]}
          color={item?.color?.value as IColor}
          title={item?.title?.value}
          imageSrc={item?.image?.src}
          contentTitle={item?.contentTitle?.value}
          contentIntro={item?.contentIntro?.value}
          contentDescription={item?.contentDescription?.value}
          contentTextColor={item?.contentTextColor?.value as IColor}
        />
      ))}
    </div>
  )
}

const useStyles = makeStyles(() => ({
  root: {
    background: BACKGROUND_COLOR,
    padding: '24px 0px',
  },
}))

export default OurPastPresentFuture
