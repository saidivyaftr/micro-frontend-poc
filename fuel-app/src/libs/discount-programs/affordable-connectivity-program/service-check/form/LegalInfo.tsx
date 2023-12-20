import { makeStyles } from '@material-ui/core'
import { RichText } from '@/shared-ui/components'
import { Checkbox } from 'src/ui-kit'
import { hasError } from './formHelper'
import { getIn } from 'formik'
import { useAppData } from 'src/hooks'
import { FormLayout } from './Forms'
import colors from '@/shared-ui/colors'

const LegalInfo = ({ formik, children }: any) => {
  const classes = useStyles()
  const { setFieldValue, values, errors, touched } = formik
  const {
    title,
    description,
    checkboxLabel,
    checkboxName,
    checkboxRequired,
    richTextContent,
  } = useAppData('legalInfoFormData', true)
  return (
    <div className={`${classes.root}`}>
      <FormLayout
        title={title?.value}
        description={description?.value}
        partDescription={
          !!parseInt(formik.values.hasApplicationId) ? 'PART 2' : 'PART 3'
        }
      >
        <div className={classes.formWrapper}>
          <RichText
            wrapperClassName={classes.richText}
            data={{
              content: {
                value: richTextContent?.value,
              },
            }}
            tabIndex={0}
          />

          <Checkbox
            label={checkboxLabel?.value}
            name={checkboxName?.value}
            required={checkboxRequired?.value}
            helperText={
              hasError(touched, errors, checkboxName?.value) &&
              getIn(errors, checkboxName?.value)
            }
            isError={hasError(touched, errors, checkboxName?.value)}
            setValue={() => {
              return setFieldValue(
                `${checkboxName?.value}`,
                !getIn(values, checkboxName?.value),
              )
            }}
            checked={getIn(values, checkboxName?.value)}
          />

          {children}
        </div>
      </FormLayout>
    </div>
  )
}

const useStyles = makeStyles(({ typography, breakpoints }) => ({
  root: {
    width: '100%',
  },
  headline: {
    margin: 0,
    marginBottom: 16,
  },
  formWrapper: {
    paddingTop: '48px',
  },
  actionList: {
    listStyleType: 'circle',
  },
  richText: {
    fontFamily: 'PP OBJECT SANS',
    marginBottom: '2rem',
    maxHeight: 400,
    borderRadius: 16,
    overflowY: 'scroll',
    backgroundColor: colors.main.white,
    padding: 32,
    border: `1px solid ${colors.main.borderGrey}`,
    '&::-webkit-scrollbar': {
      visibility: 'visible',
      width: 8,
      marginRight: 2,
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: colors.main.gray,
      marginRight: 2,
      borderRadius: 10,
    },
    '& ul': {
      paddingLeft: '1.5rem',
    },
    '& li': {
      marginBottom: '1rem',
      fontSize: typography.pxToRem(18),
    },
    '& p': { marginBottom: '0.5rem', fontSize: typography.pxToRem(18) },
    [breakpoints.down('xs')]: {
      padding: 16,
    },
  },
}))

export default LegalInfo
