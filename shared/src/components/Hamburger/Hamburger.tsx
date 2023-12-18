import { IHamburger } from './types'
import css from './hamburger.module.scss'

const Hamburger = (props: IHamburger) => {
  const { isActive = false } = props
  const rootClass = isActive
    ? `${css.hamburger} ${css.isActive}`
    : css.hamburger
  return (
    <div className={rootClass} id="hamburger-1">
      <span className={css.line}></span>
      <span className={css.line}></span>
      <span className={css.line}></span>
    </div>
  )
}

export default Hamburger
