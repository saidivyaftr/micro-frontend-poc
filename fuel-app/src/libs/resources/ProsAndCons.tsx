import { makeStyles } from '@material-ui/core/styles'
import { ProsAndConsTable } from '@/shared-ui/components'
import { useMemo } from 'react'
import { COMPONENT_WRAPPER } from 'src/constants'
const ProsAndCons = ({ data }: any) => {
  const classes = customStyles()
  const headers = useMemo(() => {
    return data?.headers?.list.map(({ title }: any) => title?.value)
  }, [data?.headers?.list])
  const columns = useMemo(() => {
    return data?.columns?.list.map(({ title, pros, cons }: any) => ({
      title: title?.value,
      pros: pros?.data?.map(({ name }: any) => name?.value),
      cons: cons?.data?.map(({ name }: any) => name?.value),
    }))
  }, [data?.columns?.list])
  return (
    <div className={classes.root}>
      <ProsAndConsTable
        backgroundColor={data?.backgroundColor?.value}
        headers={headers}
        columns={columns}
      />
    </div>
  )
}

const customStyles = makeStyles(({ breakpoints }) => ({
  root: {
    ...COMPONENT_WRAPPER,
    margin: '32px auto 0',
    padding: '0 1rem',
    maxWidth: '938px',
    [breakpoints.down('sm')]: {
      padding: '0 1rem',
    },
  },
}))

export default ProsAndCons
