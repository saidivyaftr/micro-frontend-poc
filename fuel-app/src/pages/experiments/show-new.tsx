import { useEffect } from 'react'

function ShowNewExperience(): JSX.Element {
  useEffect(() => {
    window.location.href = '/login'
  }, [])
  return <div>&nbsp;</div>
}

export default ShowNewExperience
