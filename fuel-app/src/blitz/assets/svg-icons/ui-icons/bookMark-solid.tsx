const BookMarkSolidIcon = (props: any) => {
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
        d="M28 9.33341L28 26.0001C28 29.2963 24.2369 31.1778 21.6 29.2001L16.8 25.6001C16.3259 25.2445 15.6741 25.2445 15.2 25.6001L10.4 29.2001C7.76306 31.1778 4 29.2963 4 26.0001L4 9.33341C4 5.65152 6.98477 2.66675 10.6667 2.66675L21.3333 2.66675C25.0152 2.66675 28 5.65152 28 9.33341Z"
        fill={color}
      />
    </svg>
  )
}

export default BookMarkSolidIcon
