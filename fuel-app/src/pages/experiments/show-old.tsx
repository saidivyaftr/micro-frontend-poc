import { useEffect } from 'react'

function ShowOldExperience(): JSX.Element {
  useEffect(() => {
    window.location.href = '/login'
  }, [])
  return <div>&nbsp;</div>
}

export default ShowOldExperience
