const MobilePhoneIcon = (props: any) => {
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
        d="M11.9997 1.33337C8.31778 1.33337 5.33301 4.31814 5.33301 8.00004V24C5.33301 24.4567 5.37891 24.9026 5.46637 25.3334H7.99967V8.00004C7.99967 5.7909 9.79054 4.00004 11.9997 4.00004H19.9997C22.2088 4.00004 23.9997 5.7909 23.9997 8.00004V25.3334H26.533C26.6204 24.9026 26.6663 24.4567 26.6663 24V8.00004C26.6663 4.31814 23.6816 1.33337 19.9997 1.33337H11.9997Z"
        fill={color}
      />
      <path
        d="M25.3335 28H6.66585C7.88213 29.6193 9.81858 30.6667 11.9997 30.6667H19.9997C22.1808 30.6667 24.1172 29.6193 25.3335 28Z"
        fill={color}
      />
      <path
        d="M16.6663 25.3334C17.4027 25.3334 17.9997 24.7364 17.9997 24V22.6667C17.9997 21.9303 17.4027 21.3334 16.6663 21.3334H15.333C14.5966 21.3334 13.9997 21.9303 13.9997 22.6667V24C13.9997 24.7364 14.5966 25.3334 15.333 25.3334H16.6663Z"
        fill={color}
      />
      <path d="M20.6663 6.66671H11.333V9.33337H20.6663V6.66671Z" fill={color} />
    </svg>
  )
}
export default MobilePhoneIcon
