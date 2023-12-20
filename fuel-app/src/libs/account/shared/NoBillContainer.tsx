import { CardWithTitle } from '@/shared-ui/components/Card/Card'
import { makeStyles } from '@material-ui/core'
import Image from 'next/future/image'
import { Typography } from 'src/blitz'

type BillProps = {
  image: {
    src: string
    alt: string
  }
  title: string
  description: string
}

const NoBillContainer = ({ image, title, description }: BillProps) => {
  const styles = useStyles()
  return (
    <CardWithTitle
      title={''}
      className={styles.card}
      classNameTitle={styles.classNameTitle}
    >
      <>
        <div className={styles.titleContent}>
          <Image src={image?.src} alt={image?.alt} className={styles.iconCtr} />
          <Typography
            tagType="h6"
            styleType="p1"
            fontType="boldFont"
            className={styles.subTitle}
          >
            {title}
          </Typography>
        </div>
        <Typography tagType="p" styleType="p2" className={styles.description}>
          {description}
        </Typography>
      </>
    </CardWithTitle>
  )
}

const useStyles = makeStyles(() => ({
  card: {
    width: '100%',
  },
  classNameTitle: {
    marginBottom: 32,
  },
  iconCtr: {
    width: '2.5rem',
    height: '2.5rem',
  },
  description: {
    margin: '0 auto',
  },
  subTitle: {
    margin: 0,
  },
  titleContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '1rem',
    marginBottom: '1rem',
  },
}))

export default NoBillContainer
