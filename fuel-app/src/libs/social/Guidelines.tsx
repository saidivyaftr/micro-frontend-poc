import makeStyles from '@material-ui/core/styles/makeStyles'
import { useAppData } from 'src/hooks'
import { RichText } from '@/shared-ui/components'
import { PP_OBJECT_SANS } from 'src/constants/fontFamilyNames'

const Guidelines: React.FC = () => {
  const styles = useStyles()
  const { content } = useAppData('richText', true)

  return (
    <>
      {content?.value && (
        <div className={styles.descriptionContainer}>
          <RichText
            data={{
              content: {
                value: content?.value,
              },
            }}
            wrapperClassName={styles.richText}
          />
        </div>
      )}
    </>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  descriptionContainer: {
    margin: '5rem 1rem 4rem 1rem',
    wordBreak: 'break-word',
    [breakpoints.down('xs')]: {
      margin: '3rem 1rem 2rem 1rem',
    },
  },
  richText: {
    padding: 0,
    '& a': { fontFamily: `${PP_OBJECT_SANS} !important` },
  },
}))

export default Guidelines
