import React from 'react'
import { makeStyles } from '@material-ui/core'
import { useAppData, useUpdateSearchPlaceholder } from 'src/hooks'
import colors from '@/shared-ui/colors'
import { ChevronRight } from '@/shared-ui/react-icons'
import { InjectHTML, Typography } from '@/shared-ui/components'

const BreadcrumbNav = () => {
  useUpdateSearchPlaceholder()
  const data = useAppData('breadcrumb', true)
  const { path } = data
  const { targetItems } = path
  const classes = useStyles()
  if (!path) return null

  return (
    <div className={classes.BreadcrumbNav}>
      {targetItems.map((r: any, index: number) =>
        index < targetItems.length - 1 ? (
          <React.Fragment key={index}>
            <InjectHTML
              value={`<a href=${r.href.url}>${r.pageName.value}</a>`}
            />
            <ChevronRight className={classes.breadcrumbSeperator} />
          </React.Fragment>
        ) : (
          <Typography key={index}>{r.pageName.value}</Typography>
        ),
      )}
    </div>
  )
}

const useStyles = makeStyles(() => ({
  BreadcrumbNav: {
    maxWidth: 1200,
    margin: '.625rem auto',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gridGap: '.5rem',
    gap: '.5rem',
    paddingLeft: '1rem',
    '& a': {
      fontWeight: 700,
      textDecoration: 'underline',
      '&:hover': { color: colors.main.brightRed },
    },
  },
  breadcrumbSeperator: {
    height: '.75rem',
    width: '.75rem',
  },
}))

export default BreadcrumbNav
