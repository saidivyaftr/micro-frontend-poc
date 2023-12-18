const LeftArrowIcon = (props: any) => {
  const { color = '#141928' } = props
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.05208 7.4987L14.5 7.4987L14.5 8.83203L3.16667 8.83203L2.38542 8.16536L3.05208 7.4987Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.60953 8.16532L6.13812 11.6939L5.19531 12.6367L0.723909 8.16531L5.36198 3.52724L6.30479 4.47005L2.60953 8.16532Z"
        fill={color}
      />
    </svg>
  )
}

export default LeftArrowIcon
