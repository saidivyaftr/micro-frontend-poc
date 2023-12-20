import { makeStyles } from '@material-ui/core'
import { useRouter } from 'next/router'
import React from 'react'
import { Typography } from 'src/blitz'
import { AppRoutes } from 'src/constants/appRoutes'
import { useActiveAccount } from 'src/selector-hooks'
import { Button } from 'src/ui-kit'
import { accountIdRegex } from 'src/utils/regex-helper'

const useStyles = makeStyles(() => ({
  header: {
    display: 'flex',
    padding: '10px 0',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: '30px',
    marginTop: 0,
    flex: '0 0 auto',
    fontWeight: 'normal',
  },
  titleWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 6,
  },
  accountNum: {
    flex: '0 0 auto',
  },
  compareButton: {
    height: '34px',
    flex: '0 0 auto',
  },
  billHeaderNumber: {
    marginLeft: '140px',
  },
  description: {
    margin: '0',
  },
}))

type HeaderProps = {
  title: string
  description?: string
  showCompareBillsButton?: boolean
}

export const BillsHeader: React.FC<HeaderProps> = ({
  title,
  description,
  showCompareBillsButton = true,
}) => {
  const classes = useStyles()
  const router = useRouter()
  const activeAccount = useActiveAccount()
  const hasActiveAccount = !activeAccount.isLoading && !activeAccount.error

  return (
    <section>
      <div className={classes.header}>
        <div className={classes.titleWrapper}>
          <Typography
            tagType="h3"
            styleType="h3"
            fontType="regularFont"
            className={classes.title}
          >
            {title}
          </Typography>
        </div>
        <div className={classes.billHeaderNumber}>
          {hasActiveAccount && (
            <i className={classes.accountNum}>{`${accountIdRegex(
              activeAccount.data.id,
            )} ${activeAccount.data.firstName} ${
              activeAccount.data.lastName
            }`}</i>
          )}
        </div>
        {showCompareBillsButton && (
          <Button
            type="secondary"
            onClick={() => {
              router.push(
                {
                  pathname: AppRoutes.CompareBillSelectPage,
                  query: router.query,
                },
                undefined,
                { shallow: false },
              )
            }}
            customClass={classes.compareButton}
          >
            Compare Bills
          </Button>
        )}
      </div>
      {!!description && <p className={classes.description}>{description}</p>}
    </section>
  )
}
