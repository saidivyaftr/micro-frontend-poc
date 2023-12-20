import React from 'react'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import clx from 'classnames'
import { makeStyles } from '@material-ui/core'
import colors from '@/shared-ui/colors'
import { Tooltip } from '@/shared-ui/components'
import { QuestionIcon } from '@/shared-ui/react-icons'
export type IRadioInput = {
  label: string
  value: string
  name: string
  // eslint-disable-next-line no-unused-vars
  setValue: (val: string) => string
  options?: IRadioOption[]
  required?: boolean
  info?: string
  direction?: IDirection
  customIcon?: React.ReactComponentElement<any>
}

export type IRadioOption = {
  subtext?: string
  label: string
  value: string
}

export type IDirection = 'row' | 'column'

const RadioInput = (props: IRadioInput) => {
  const styles = useStyles()
  const {
    label,
    value,
    setValue,
    name,
    options = [],
    required,
    info,
    direction = 'row',
    customIcon: CustomIcon,
  } = props
  return (
    <FormControl className={clx({ [styles.radioRow]: direction === 'row' })}>
      <FormLabel
        className={clx(styles.radioLabel, {
          [styles.radioLabelRow]: direction === 'row',
          [styles.radioLabelColumn]: direction === 'column',
        })}
      >
        {label}
        {required && <span className={styles.required}>*</span>}
        {info && (
          <span className={styles.info}>
            <Tooltip
              tooltipText={info}
              tooltipIcon={<QuestionIcon />}
              includeBorder
              tooltipDirection="bottom"
              hideBorder
              dropShadow
            />
          </span>
        )}
      </FormLabel>
      <RadioGroup
        aria-label={name}
        name={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        row
        className={clx(styles.radio)}
      >
        {options?.map((option, key) => {
          return (
            <>
              <FormControlLabel
                key={key}
                value={option?.value}
                control={
                  CustomIcon ? (
                    CustomIcon
                  ) : (
                    <Radio className={styles.radioBtn} />
                  )
                }
                label={option?.label}
              />
              {option?.subtext && (
                <span className={styles.subtext}>{option?.subtext}</span>
              )}
            </>
          )
        })}
      </RadioGroup>
    </FormControl>
  )
}
const useStyles = makeStyles(({ typography, breakpoints }) => ({
  radioRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  radioLabel: {
    fontSize: '1.125rem',
    '&.Mui-focused': {
      color: colors.main.darkBlue,
    },
    [breakpoints.down('sm')]: {
      fontSize: typography.pxToRem(16),
    },
  },
  radioLabelRow: {
    marginRight: 48,
    textAlign: 'left',
    [breakpoints.down('md')]: {
      marginBottom: 8,
    },
  },
  radioLabelColumn: {
    marginBottom: 8,
  },
  required: {
    color: colors.main.brightRed,
    fontSize: 24,
    position: 'relative',
    top: 4,
  },
  radioBtn: {
    padding: '0 8px',
  },
  info: {
    marginLeft: 10,
    display: 'inline-flex',
    position: 'relative',
    top: 4,
    '& :hover': {
      '& svg path': {
        fill: colors.main.brightRed,
      },
    },
  },
  radio: {
    gap: 48,
    [breakpoints.down('sm')]: {
      gap: 32,
    },
    [breakpoints.down('xs')]: {
      justifyContent: 'space-between',
      gap: 'unset',
    },
  },
  subtext: {
    fontSize: '12px',
    marginLeft: '32px',
    marginBottom: '16px',
    [breakpoints.down('sm')]: {
      marginTop: '4px',
    },
  },
}))
export default RadioInput
