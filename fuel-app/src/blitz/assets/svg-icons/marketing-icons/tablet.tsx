const TabletIcon = (props: any) => {
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
        d="M10 0C6.68629 0 4 2.68629 4 6V26C4 29.3137 6.68629 32 10 32H22C25.3137 32 28 29.3137 28 26V6C28 2.68629 25.3137 0 22 0H10ZM22 2.66667H10C8.15905 2.66667 6.66667 4.15905 6.66667 6V25.3333H25.3333V6C25.3333 4.15905 23.841 2.66667 22 2.66667ZM15.3333 26.6667C14.597 26.6667 14 27.2636 14 28V29.3333C14 30.0697 14.597 30.6667 15.3333 30.6667H16.6667C17.403 30.6667 18 30.0697 18 29.3333V28C18 27.2636 17.403 26.6667 16.6667 26.6667H15.3333Z"
        fill={color}
      />
    </svg>
  )
}
export default TabletIcon
