const CheckboxIcon = (props: any) => {
  const { rect = {}, path = {}, checked = false, ...rest } = props
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      {checked ? (
        <>
          <rect
            x="0.5"
            y="0.5"
            width="23"
            height="23"
            rx="7.5"
            fill="#96FFF5"
            {...rect}
          />
          <path
            d="M5.39844 12.3336L9.58675 16.6982L18.6031 7.30225"
            stroke="#141928"
            {...path}
            strokeWidth="1.75"
            strokeLinecap="round"
          />
          <rect
            x="0.5"
            y="0.5"
            width="23"
            height="23"
            rx="7.5"
            stroke="#141928"
          />
        </>
      ) : (
        <>
          <rect
            x="0.5"
            y="0.5"
            width="23"
            height="23"
            rx="7.5"
            fill="#2D3548"
            {...rect}
          />
          <rect
            x="0.5"
            y="0.5"
            width="23"
            height="23"
            rx="7.5"
            stroke="#C4C5C9"
          />
        </>
      )}
    </svg>
  )
}
export default CheckboxIcon
