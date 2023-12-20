const NotificationsSolidIcon = (props: any) => {
  const { color = '#141928' } = props
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M23.3058 24.0002C26.7783 24.0002 28.6014 19.879 26.2655 17.3095L25.9077 16.9158C24.6805 15.566 24.0006 13.8072 24.0006 11.9829V8.00016C24.0006 4.31826 21.0158 1.3335 17.3339 1.3335L14.6672 1.3335C10.9853 1.3335 8.00057 4.31826 8.00057 8.00016L8.00057 11.9829C8.00057 13.8072 7.32061 15.566 6.09346 16.9158L5.73561 17.3095C3.39971 19.879 5.2228 24.0002 8.69537 24.0002H23.3058Z"
        fill={color}
      />
      <path
        d="M15.3339 25.3335C14.2293 25.3335 13.3339 26.2289 13.3339 27.3335V28.6668C13.3339 29.7714 14.2293 30.6668 15.3339 30.6668H16.6672C17.7718 30.6668 18.6672 29.7714 18.6672 28.6668V27.3335C18.6672 26.2289 17.7718 25.3335 16.6672 25.3335H15.3339Z"
        fill={color}
      />
    </svg>
  )
}

export default NotificationsSolidIcon