import { Button, InjectHTML } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core'
import { AppRoutes } from 'src/constants'
import { useRouter } from 'next/router'
import useAppData from '@/shared-ui/hooks/useAppData'

export const AccountLinked = () => {
  const router = useRouter()
  const classes = useStyles()
  const linkAccountData = useAppData('linkAccountData', true)

  return (
    <div>
      <InjectHTML
        styleType="p1"
        className={classes.description}
        value={linkAccountData?.accountLinkedDescription?.value}
      />

      <Button
        type="button"
        text={linkAccountData?.goToAccountAccess?.value}
        onClick={() => {
          router.push(AppRoutes.AccountAccess)
        }}
      />
    </div>
  )
}

const useStyles = makeStyles(() => ({
  description: {
    margin: '32px 0',
  },
}))
