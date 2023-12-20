import { makeStyles } from '@material-ui/core'
import { InjectHTML } from '@/shared-ui/components'
import colors from '@/shared-ui/colors'

const Paytypes = ({ data }: any) => {
  const styles = useStyles()
  if (!data || Object.keys(data || {}).length == 0) {
    return null
  }
  const { lists: payTypes, id } = data || {}

  return (
    <div className={styles.root} id={id?.value}>
      {payTypes?.paytypes?.map((payType: any, index: number) => (
        <div key={index} className={styles.container} id={payType?.id?.value}>
          <InjectHTML
            addAnchorStyles
            tagType="h2"
            styleType="h4"
            value={payType?.title?.value}
          />
          <InjectHTML
            addAnchorStyles
            tagType="p"
            data-testid="description"
            styleType="p1"
            value={payType?.description?.value as string}
          />
          {payType?.types?.lists && (
            <div className={styles.payTypeWrapper}>
              {payType?.types?.lists?.map((type: any, index: any) => (
                <div key={index}>
                  <InjectHTML
                    addAnchorStyles
                    tagType="h3"
                    styleType="h5"
                    className={styles.typeTitle}
                    value={type?.title?.value}
                  />
                  <div className={styles.typeBox}>
                    <InjectHTML
                      addAnchorStyles
                      tagType="h6"
                      data-testid="type-description"
                      styleType="h6"
                      className={styles.typeDescription}
                      fontType="mediumFont"
                      value={type?.description?.value as string}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
          {payType?.note?.value && (
            <InjectHTML
              addAnchorStyles
              tagType="p"
              data-testid="caption"
              styleType="p3"
              value={payType?.note?.value as string}
            />
          )}
        </div>
      ))}
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    padding: 0,
  },
  container: {
    marginBottom: 80,
    [breakpoints.down('sm')]: {
      marginBottom: 32,
    },
  },
  payTypeWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    width: 'calc(100% - 32px)',
    gap: 16,
    '& > div': {
      width: '100%',
    },
    [breakpoints.down('sm')]: {
      flexDirection: 'column',
      width: '100%',
    },
  },
  typeBox: {
    backgroundColor: colors.main.midnightExpress,
    width: '100%',
    borderRadius: 32,
    padding: 32,
    [breakpoints.down('sm')]: {
      borderRadius: 16,
    },
  },
  typeDescription: {
    color: colors.main.blue,
  },
  typeTitle: {
    marginBottom: '1rem',
  },
}))

export default Paytypes
