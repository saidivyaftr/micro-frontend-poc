const ChevronLeftIcon = (props: any) => {
  const { color = '#141928' } = props
  return (
    <svg
      width="32"
      height="33"
      viewBox="0 0 32 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_19660_82038)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M19.5568 6.05719L21.4424 7.94281L12.7185 16.6667L21.4424 25.3905L19.5568 27.2761L8.94729 16.6667L19.5568 6.05719Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_19660_82038">
          <rect width="32" height="32" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

export default ChevronLeftIcon
