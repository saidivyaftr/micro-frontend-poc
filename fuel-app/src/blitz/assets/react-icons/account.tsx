const AccountIcon = (props: any) => {
  const { color = '#FF0037' } = props
  return (
    <svg
      width="49"
      height="48"
      viewBox="0 0 49 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="24.5" cy="24" r="22" stroke={color} strokeWidth="4" />
      <circle cx="24.5" cy="17" r="6.5" stroke={color} strokeWidth="3" />
      <path
        d="M40.5 40C40.5 31.1634 33.3366 24 24.5 24C15.6634 24 8.5 31.1634 8.5 40"
        stroke={color}
        strokeWidth="3"
      />
    </svg>
  )
}

export default AccountIcon
