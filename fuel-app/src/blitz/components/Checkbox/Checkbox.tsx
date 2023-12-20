import React from 'react'
import clx from 'classnames'
import { ICheckbox } from './types'
import css from './Checkbox.module.scss'

const Checkbox: React.FunctionComponent<ICheckbox> = ({
  type = 'checkbox',
  label,
  className,
  name,
  checked,
  disabled,
  onChange,
}) => {
  return (
    <>
      <label
        className={clx(css.checkboxContainer, className, {
          [css.disabled]: disabled,
        })}
      >
        <input
          className={css.checkboxInput}
          type={type}
          name={name}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
        />
        <span className={css.checkmark}></span>
        {label}
      </label>
    </>
  )
}

export default Checkbox
