import { Testimonial } from '@/shared-ui/components'
import { useAppData } from 'src/hooks'
const Testimonials = ({ styles }: any) => {
  const {
    list,
    eyebrowText,
    backgroundColor,
    quoteTagType,
    quoteStyleType,
    creditTagType,
    creditStyleType,
    pagination,
    navigation,
  } = useAppData('testimonials', true)
  if (!list?.targetItems?.length) {
    return null
  }

  const slideData = list.targetItems.map(
    (listData: { testimony: { value: any }; author: { value: any } }) => ({
      quote: listData?.testimony?.value,
      credit: listData?.author?.value,
    }),
  )
  return (
    <div style={styles}>
      <Testimonial
        eyebrowText={eyebrowText?.value}
        slides={slideData}
        backgroundColor={backgroundColor?.targetItem?.color?.value}
        quoteTagType={quoteTagType?.targetItem?.value?.value}
        quoteStyleType={quoteStyleType?.targetItem?.value?.value}
        creditTagType={creditTagType?.targetItem?.value?.value}
        creditStyleType={creditStyleType?.targetItem?.value?.value}
        pagination={pagination?.value}
        navigation={navigation?.value}
      />
    </div>
  )
}
export default Testimonials
