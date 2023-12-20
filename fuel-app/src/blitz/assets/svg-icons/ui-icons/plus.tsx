const PlusIcon = (props: any) => {
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
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M14.668 17.3332V25.3332H17.3346V17.3332L25.3346 17.3332V14.6665L17.3346 14.6665V6.6665H14.668V14.6665L6.66797 14.6665V17.3332L14.668 17.3332Z"
        fill={color}
      />
    </svg>
  )
}

export default PlusIcon
