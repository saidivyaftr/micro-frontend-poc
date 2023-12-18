const TicketStatus = (props: any) => {
  const { color } = props
  return (
    <svg
      width="22"
      height="18"
      viewBox="0 0 22 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.49012e-06 0L1.07288e-06 5.46323L0.666755 5.6989C2.02749 6.17985 3 7.47764 3 9C3 10.5224 2.02749 11.8201 0.666754 12.3011L0 12.5368V18L22 18V12.5368L21.3332 12.3011C19.9725 11.8202 19 10.5224 19 9C19 7.47764 19.9725 6.17985 21.3333 5.6989L22 5.46323V0H1.49012e-06ZM2 4.10001L2 2H13V16L2 16L2 13.9C3.77989 12.9901 5 11.1386 5 9C5 6.86144 3.77989 5.00989 2 4.10001ZM15 16L20 16V13.9C18.2201 12.9901 17 11.1386 17 9C17 6.86143 18.2201 5.00989 20 4.10001V2H15V16Z"
        fill={color ? color : '#FF0037'}
      />
    </svg>
  )
}

export default TicketStatus
