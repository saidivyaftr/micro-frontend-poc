import { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core'
import { InjectHTML, Typography } from '@/shared-ui/components'
import { COMPONENT_WRAPPER } from 'src/constants'
import colors from '@/shared-ui/colors'
import APIClient from 'src/api-client'
import useAppData from '@/shared-ui/hooks/useAppData'
const EquipmentTable = () => {
  const classes = useStyles()
  const { headings, errorMessage1 } =
    useAppData('equipmentTableData', true) || {}
  const [equipments, setEquipments] = useState([])
  const params = new URLSearchParams(window.location.search)
  const token: any = params.get('token')
  const getUpsReturns = async () => {
    try {
      const response = await APIClient.getUPSReturns(token)
      const equipments = response.data?.items?.map((equipment: any) => ({
        productType: equipment.productType,
        model: equipment.model,
        returnable: equipment.qty,
      }))
      setEquipments(equipments)
    } catch (err) {
      setEquipments([])
    }
  }

  useEffect(() => {
    getUpsReturns()
  }, [])

  return (
    <div className={classes.wrapper}>
      <div className={classes.section}>
        <table className={classes.table}>
          <thead>
            <tr>
              {headings?.list.map((heading: any, index: number) => (
                <th
                  key={`return-list-${index}`}
                  className={`${classes.tableCell} ${classes.tableHead}`}
                >
                  <Typography
                    tagType="h6"
                    fontType="regularFont"
                    className={classes.heading}
                  >
                    {heading?.text.value}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {equipments?.map((equipment: any, index: number) => (
              <tr key={`return-list-${index}`}>
                <td className={classes.tableCell}>{equipment?.productType}</td>
                <td className={classes.tableCell}>{equipment?.model}</td>
                <td className={classes.tableCell}>{equipment?.returnable}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {!(equipments?.length > 0) && (
          <InjectHTML
            styleType="p2"
            tagType="p"
            value={errorMessage1?.value}
            className={classes.description}
          />
        )}
      </div>
    </div>
  )
}

const useStyles = makeStyles(() => ({
  wrapper: {
    ...COMPONENT_WRAPPER,
    textAlign: 'left',
  },
  section: {
    padding: '1.5rem 0',
    textAlign: 'left',
  },
  description: {
    textAlign: 'center',
    marginTop: '1rem',
  },
  heading: {
    fontWeight: 600,
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableCell: {
    width: '33.33%',

    border: `1px solid ${colors.main.borderLightGray}`,
    padding: '1rem 1rem',
    '&:nth-child(even)': {
      borderLeft: 'none',
      borderRight: 'none',
    },
    '& h6': {
      margin: 0,
    },
  },
  tableHead: {
    borderBottom: `3px solid ${colors.main.brightRed}`,
  },
}))

export default EquipmentTable
