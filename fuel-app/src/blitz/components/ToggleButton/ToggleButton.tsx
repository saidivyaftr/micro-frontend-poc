import css from './ToggleButton.module.scss'
import { IToggleButton } from './types'
import clx from 'classnames'

const ToggleButton: React.FunctionComponent<IToggleButton> = ({
  onClickToggle,
  isChecked = false,
}) => {
  return (
    <div className={clx(css.toggleButton)}>
      <label className={clx(css.buttonSwitch, css.large)}>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={(event) => {
            onClickToggle(event.target.checked)
          }}
        />
        <span
          className={clx(
            css.switch,
            css.large,
            isChecked ? css.onSwitch : css.offSwitch,
          )}
        />
      </label>
    </div>
  )
}

export default ToggleButton
