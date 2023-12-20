import { storiesOf } from '@storybook/react'
import { useEffect, useMemo, useState } from 'react'
import * as Icons from './svg-icons'

const iconsList = Object.keys(Icons).sort((a, b) => (a > b ? 1 : -1))

const RenderSvgIcons = () => {
  const [search, setSearch] = useState('')

  const listOfIcons = useMemo(() => {
    if (!search) {
      return iconsList
    }
    return iconsList?.filter((x: string) =>
      x?.toLowerCase()?.includes(search?.toLowerCase()),
    )
  }, [search])

  useEffect(() => {
    const rootElement = document.getElementById('root')
    if (rootElement) {
      rootElement.style.background = '#F4F4F4'
      rootElement.style.width = '100%'
    }
  }, [])

  return (
    <div
      style={{
        backgroundColor: '#F4F4F4',
        padding: 24,
        minHeight: '90vh',
        overflowY: 'hidden',
        fontFamily: 'sans-serif',
      }}
    >
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: '90%',
          height: 40,
          margin: '24px auto',
          display: 'block',
          borderRadius: 8,
          border: 0,
          padding: '8px 16px',
        }}
        placeholder="search..."
      />

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {listOfIcons?.map((icon: any) => {
          //@ts-ignore
          const Component: any = Icons[icon]
          return (
            <div
              key={`icon-${name}`}
              style={{
                padding: 20,
                width: 200,
                height: 120,
                objectFit: 'contain',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                border: `1px solid #00000010`,
                gap: 16,
                background: 'transparent',
              }}
            >
              <Component
                width="30"
                height="30"
                style={{ objectFit: 'contain' }}
              />
              <div>{icon}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

storiesOf('SVG Icons', module).add('SVG Icons', () => {
  //@ts-ignore
  return <RenderSvgIcons />
})
