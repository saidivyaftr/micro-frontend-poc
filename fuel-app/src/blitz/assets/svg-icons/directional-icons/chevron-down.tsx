const ChevronDownIcon = (props: any) => {
  const { color = '#141928' } = props
  return (
    <svg
      width="32"
      height="33"
      viewBox="0 0 32 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M5.05469 12.7762L6.94031 10.8906L15.6642 19.6145L24.388 10.8906L26.2736 12.7762L15.6642 23.3857L5.05469 12.7762Z"
        fill={color}
      />
    </svg>
  )
}

export default ChevronDownIcon
