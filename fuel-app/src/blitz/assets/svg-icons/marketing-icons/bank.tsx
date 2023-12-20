const BankIcon = (props: any) => {
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
      <path d="M1.33594 28H30.6693V30.6666H1.33594V28Z" fill={color} />
      <path
        d="M5.33594 17.3333L5.33594 25.3333H2.66927L2.66927 17.3333H5.33594Z"
        fill={color}
      />
      <path
        d="M13.3359 17.3333V25.3333H10.6693V17.3333H13.3359Z"
        fill={color}
      />
      <path
        d="M21.3359 17.3333V25.3333H18.6693V17.3333H21.3359Z"
        fill={color}
      />
      <path
        d="M29.3359 17.3333V25.3333H26.6693V17.3333H29.3359Z"
        fill={color}
      />
      <path
        d="M16.0026 1.22217L1.33594 7.33328V10.2222L16.0026 4.11106L30.6693 10.2222V7.33328L16.0026 1.22217Z"
        fill={color}
      />
      <path
        d="M30.6693 14.6666V11.9999H1.33594L1.33594 14.6666H30.6693Z"
        fill={color}
      />
    </svg>
  )
}

export default BankIcon
