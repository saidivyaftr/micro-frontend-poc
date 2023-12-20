const RemoveIcon = (props: any) => {
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
        d="M15.9974 29.3332C23.3612 29.3332 29.3307 23.3636 29.3307 15.9998C29.3307 8.63604 23.3612 2.6665 15.9974 2.6665C8.6336 2.6665 2.66406 8.63604 2.66406 15.9998C2.66406 23.3636 8.6336 29.3332 15.9974 29.3332ZM10.5 17.3332L21.5 17.3332V14.6665L10.5 14.6665V17.3332Z"
        fill={color}
      />
    </svg>
  )
}

export default RemoveIcon
