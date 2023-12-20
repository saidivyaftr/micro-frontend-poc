const BulletIcon = (props: any) => {
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
        d="M12.6641 15.3337C12.6641 13.8609 13.858 12.667 15.3307 12.667H16.6641C18.1368 12.667 19.3307 13.8609 19.3307 15.3337V16.667C19.3307 18.1398 18.1368 19.3337 16.6641 19.3337H15.3307C13.858 19.3337 12.6641 18.1398 12.6641 16.667V15.3337Z"
        fill={color}
      />
    </svg>
  )
}

export default BulletIcon
