import React, { useRef } from 'react'
import css from './OTPInput.module.scss'
import clx from 'classnames'
import { WarningOutline } from '@/shared-ui/react-icons'
import { OTPInputProps } from './types'
import Typography from '../Typography'

const OTPInput: React.FC<OTPInputProps> = ({
  value,
  onChange,
  className,
  isInvalidOTP,
  invalidOTPMessage,
  errorMessageFontType = 'boldFont',
  errorMessageStyleType = 'p2',
}) => {
  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ]
  const focusNextInput = (targetBoxIndex: number) => {
    const targetElement: any = inputRefs[targetBoxIndex]?.current
    if (targetElement) {
      targetElement?.focus()
    }
  }
  const handleChange = (boxIndex: number, inputValue: string) => {
    const newValue = value?.split?.('')?.slice(0, 6)
    if (newValue) {
      newValue[boxIndex] = inputValue[0] ?? ' '
      onChange(
        newValue
          .map((x: string) => x ?? '')
          .join('')
          .trim(),
      )
      if (inputValue) {
        focusNextInput(boxIndex + 1)
      }
    }
  }

  const handlePaste = (event: any) => {
    const onlyDigits =
      event.clipboardData.getData('Text')?.replace(/\D/g, '')?.substr(0, 6) ||
      ''
    onChange(onlyDigits)
    focusNextInput(5)
  }

  const handleBackspace = (event: any, boxIndex: number) => {
    const ctrlDown = event.ctrlKey || event.metaKey
    // Detects backspace
    if (event.which === 8) {
      if (event.target.value === '') {
        focusNextInput(boxIndex - 1)
      }
    } else if (ctrlDown) {
      if (event.keyCode === 86) {
        return true
      }
    } else if (isNaN(event.key)) {
      console.log('event.keyCode', event.key) // Keep this console
      event.preventDefault()
    } else if (event.keyCode <= 47 || event.keyCode >= 58) {
      event.preventDefault()
    }
  }

  const renderInput = (boxIndex: number) => {
    return (
      <input
        aria-label={`OTP-${boxIndex + 1}-digit`}
        id={`input-${boxIndex}`}
        ref={inputRefs[boxIndex]}
        value={value[boxIndex] ?? ''}
        onChange={(event) => handleChange(boxIndex, event.target.value)}
        onPaste={handlePaste}
        className={clx(css.otpInput, 'otp-input-box', {
          [css.errorInput]: isInvalidOTP,
        })}
        onKeyDown={(e) => handleBackspace(e, boxIndex)}
        type="number"
        maxLength={1}
        pattern="[0-9]*"
      />
    )
  }
  return (
    <>
      <div className={clx(css.codeWrapper, className)}>
        {renderInput(0)}
        {renderInput(1)}
        {renderInput(2)}
        {renderInput(3)}
        {renderInput(4)}
        {renderInput(5)}
      </div>
      {isInvalidOTP && (
        <div className={css.invalidOTPError}>
          <WarningOutline className={css.warningIcon} />
          <Typography
            className={css.invalidOTPErrorMsg}
            styleType={errorMessageStyleType}
            fontType={errorMessageFontType}
          >
            {invalidOTPMessage}
          </Typography>
        </div>
      )}
    </>
  )
}

export default OTPInput
