const ContentAnywhereIcon = (props: any) => {
  const { color = '#141928' } = props
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8 13.3334V9.33337C8 6.38786 10.3878 4.00004 13.3333 4.00004H18.6667C21.6122 4.00004 24 6.38786 24 9.33337V12H26.6667C28.1394 12 29.3333 13.1939 29.3333 14.6667V19.3334C29.3333 20.8061 28.1394 22 26.6667 22H26V24.6667H26.6667C29.6122 24.6667 32 22.2789 32 19.3334V14.6667C32 11.7212 29.6122 9.33337 26.6667 9.33337C26.6667 4.9151 23.0849 1.33337 18.6667 1.33337H13.3333C8.91506 1.33337 5.33333 4.9151 5.33333 9.33337V10.6667H4.66667C2.08934 10.6667 0 12.756 0 15.3334V20C0 22.5774 2.08934 24.6667 4.66667 24.6667H6V22H4.66667C3.5621 22 2.66667 21.1046 2.66667 20V15.3334C2.66667 14.2288 3.5621 13.3334 4.66667 13.3334H8Z"
        fill={color}
      />
      <path
        d="M18.6667 18.5523L16.9428 20.2762L15.0572 18.3906L20 13.4478L24.9428 18.3906L23.0572 20.2762L21.3333 18.5523V29.3334H18.6667V18.5523Z"
        fill={color}
      />
      <path
        d="M13.3333 26.1144L15.0572 24.3906L16.9428 26.2762L12 31.219L7.05719 26.2762L8.94281 24.3906L10.6667 26.1144V15.3334H13.3333V26.1144Z"
        fill={color}
      />
    </svg>
  )
}

export default ContentAnywhereIcon
