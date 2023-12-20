import { Typography } from '@/shared-ui/components'
import { IBlackHeader } from './types'
import css from './BlackHeader.module.scss'

const BlackHeader = ({ title }: IBlackHeader) => {
  return (
    <div className={css.root}>
      <div className={css.contentWrapper}>
        <Typography
          tagType="h1"
          color="default"
          styleType="h1"
          className={css.title}
        >
          {title}
        </Typography>
      </div>
    </div>
  )
}

export default BlackHeader
