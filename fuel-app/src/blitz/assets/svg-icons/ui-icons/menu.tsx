const MenuIcon = (props: any) => {
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
        d="M25.3346 10.6667L6.66797 10.6667V8L25.3346 8V10.6667Z"
        fill={color}
      />
      <path
        d="M25.3346 17.3333L6.66797 17.3333V14.6667L25.3346 14.6667V17.3333Z"
        fill={color}
      />
      <path
        d="M6.66797 24L25.3346 24V21.3333L6.66797 21.3333V24Z"
        fill={color}
      />
    </svg>
  )
}

export default MenuIcon
