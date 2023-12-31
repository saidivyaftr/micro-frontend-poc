const EverydayLowPriceIcon = (props: any) => {
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
        d="M8.66667 2C4.98477 2 2 4.98477 2 8.66667V14.4575C2 16.2256 2.70238 17.9213 3.95262 19.1716L13.286 28.5049C13.6246 28.8436 13.9906 29.1382 14.3769 29.3887L16.3361 27.4295C15.9142 27.2367 15.5189 26.9666 15.1716 26.6193L5.83824 17.286C5.08809 16.5358 4.66667 15.5184 4.66667 14.4575V8.66667C4.66667 6.45753 6.45753 4.66667 8.66667 4.66667H14.4575C15.5184 4.66667 16.5358 5.0881 17.286 5.83824L26.6193 15.1716C26.9666 15.5189 27.2367 15.9142 27.4295 16.3361L29.3887 14.3769C29.1382 13.9906 28.8436 13.6246 28.5049 13.286L19.1716 3.95262C17.9213 2.70238 16.2256 2 14.4575 2H8.66667Z"
        fill={color}
      />
      <path
        d="M30.4015 17.1353L17.1353 30.4015C19.1168 30.6593 21.1919 30.0271 22.714 28.5049L28.5049 22.714C30.0271 21.1919 30.6593 19.1168 30.4015 17.1353Z"
        fill={color}
      />
      <path
        d="M8.66667 10.6667C9.77124 10.6667 10.6667 9.77124 10.6667 8.66667C10.6667 7.5621 9.77124 6.66667 8.66667 6.66667C7.5621 6.66667 6.66667 7.5621 6.66667 8.66667C6.66667 9.77124 7.5621 10.6667 8.66667 10.6667Z"
        fill={color}
      />
      <path
        d="M20 12H17V10.6667H15V12H14C12.7113 12 11.6667 13.0447 11.6667 14.3333V14.6667C11.6667 15.9553 12.7113 17 14 17H18C18.1841 17 18.3333 17.1492 18.3333 17.3333V17.6667C18.3333 17.8508 18.1841 18 18 18H12V20H15V21.3333H17V20H18C19.2887 20 20.3333 18.9553 20.3333 17.6667V17.3333C20.3333 16.0447 19.2887 15 18 15H14C13.8159 15 13.6667 14.8508 13.6667 14.6667V14.3333C13.6667 14.1492 13.8159 14 14 14H20V12Z"
        fill={color}
      />
    </svg>
  )
}

export default EverydayLowPriceIcon
