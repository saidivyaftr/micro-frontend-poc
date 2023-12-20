const ChevronRightIcon = (props: any) => {
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
      <g clip-path="url(#clip0_19660_82035)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M11.7762 27.2761L9.89062 25.3905L18.6145 16.6667L9.89062 7.9428L11.7762 6.05719L22.3857 16.6667L11.7762 27.2761Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_19660_82035">
          <rect width="32" height="32" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

export default ChevronRightIcon
