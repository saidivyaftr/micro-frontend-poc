const ArrowBackIcon = (props: any) => {
  const { color = '#141928' } = props
  return (
    <svg
      width="32"
      height="33"
      viewBox="0 0 32 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M6.10417 15.5L29 15.5L29 18.1667L6.33333 18.1667L4.77084 16.8333L6.10417 15.5Z"
        fill={color}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M5.21905 16.8333L12.2762 23.8905L10.3906 25.7762L1.44782 16.8333L10.724 7.55721L12.6096 9.44282L5.21905 16.8333Z"
        fill={color}
      />
    </svg>
  )
}

export default ArrowBackIcon
