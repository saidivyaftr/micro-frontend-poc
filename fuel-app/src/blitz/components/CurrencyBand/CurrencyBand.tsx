import Typography from '../Typography'
import clx from 'classnames'
import css from './CurrencyBand.module.scss'

const defaultAmount = '00.00'

const variantClass = {
  ['small-square']: 'smallSquare',
  ['small-rect']: 'smallRect',
  ['large-square']: 'largeSquare',
}

type CurrencyBandProps = {
  amount: string
  variant?: 'small-square' | 'small-rect' | 'large-square'
  wrapperClassName?: string
  dataTestId?: string
}

const CurrencyBand = ({
  wrapperClassName = '',
  dataTestId = 'currency-band',
  amount,
  variant = 'small-rect',
}: CurrencyBandProps) => {
  const [wholeAmount, decimalAmount] = Number(amount ?? defaultAmount)
    .toFixed(2)
    .split('.')

  return (
    <div className={clx(css.wrapper, wrapperClassName)}>
      <Typography
        fontType="regularBandwidthFont"
        testId={`${dataTestId}-currency`}
      >
        $
      </Typography>
      <Typography
        className={clx(css[variantClass[variant]])}
        tagType={'span'}
        fontType="regularBandwidthFont"
        testId={`${dataTestId}-whole-amount`}
      >
        {wholeAmount === '0' ? '00' : wholeAmount}
      </Typography>
      <Typography fontType="boldFont" testId={`${dataTestId}-decimal-amount`}>
        {`.${decimalAmount}`}
      </Typography>
    </div>
  )
}

export default CurrencyBand
