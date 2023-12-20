import { makeStyles } from '@material-ui/core'
import { Typography, InjectHTML } from '@/shared-ui/components'
import { useMemo } from 'react'
import { COMPONENT_WRAPPER } from 'src/constants'
import colors from '@/shared-ui/colors'
import mockData from './mockPolicies'
const CorporatePolicies = () => {
  const styles = customStyles()
  const policies = useMemo(() => {
    return mockData?.lists.map(({ title, href, info }: any) => ({
      title,
      href,
      info,
    }))
  }, [mockData?.lists])
  return (
    <div className={styles.root}>
      <Typography className={styles.heading} tagType="h1" styleType="h3">
        {mockData?.heading?.value}
      </Typography>
      <Typography className={styles.line} tagType="p" styleType="p3">
        {mockData?.description?.value}
      </Typography>
      <div>
        <ul className={styles.unList}>
          {policies?.map(({ href, info, title }: any, index: number) => (
            <li key={index} className={styles.listing}>
              <div>
                <a className={styles.link} href={href}>
                  <b>{title}</b>
                </a>
                {info}
              </div>
            </li>
          ))}
        </ul>
        <InjectHTML
          tagType="p"
          styleType="p3"
          className={styles.line}
          value={mockData?.termsConditions?.title?.value}
        />

        <InjectHTML
          className={styles.line}
          tagType="p"
          styleType="p3"
          value={mockData?.termsConditions?.addtionalInfo?.value}
        />
        <InjectHTML
          className={styles.line}
          tagType="p"
          styleType="p3"
          value={mockData?.termsConditions?.contactUs?.value}
        />
      </div>
    </div>
  )
}

const customStyles = makeStyles(({ breakpoints }) => ({
  root: {
    ...COMPONENT_WRAPPER,
    margin: '16px auto',
    [breakpoints.down('sm')]: {
      padding: '0 1rem',
    },
  },
  heading: {
    borderBottom: `1px solid ${colors.main.gray}`,
    marginBottom: '1rem',
    padding: '1rem 0',
  },
  listing: {
    fontSize: '0.875rem',
  },
  unList: {
    paddingLeft: '1rem',
  },
  line: {
    margin: '0 0 10px',
  },
  link: {
    paddingRight: 4,
  },
}))

export default CorporatePolicies
