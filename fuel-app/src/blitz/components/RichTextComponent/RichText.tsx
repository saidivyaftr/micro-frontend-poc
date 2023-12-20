import Image from 'src/components/ImageWithPlaceholder'
// import { useAppData } from 'src/hooks'
import { InjectHTML } from '@/shared-ui/components'
import css from './RichText.module.scss'
import clx from 'classnames'

interface RichTextProps {
  data?: any
  wrapperClassName?: string
  tabIndex?: number
}

const RichText: React.FC<RichTextProps> = ({
  data,
  wrapperClassName = '',
  tabIndex,
}) => {
  // eslint-disable-next-line no-unused-vars
  // const item = useAppData('richText', true, data)
  // commented to fix lint issue while git commit
  return (
    <div
      className={clx(css.resourceWrapper, wrapperClassName)}
      tabIndex={tabIndex}
    >
      {data?.image?.src && (
        <Image src={data?.image?.src} alt={data?.image?.alt} />
      )}
      {data?.content && (
        <div>
          <InjectHTML
            pureInjection
            value={data?.content?.value}
            testId="test-content"
            fontType="regularFont"
          />
        </div>
      )}
      {data?.script && <InjectHTML pureInjection value={data?.script?.value} />}
    </div>
  )
}

export default RichText
