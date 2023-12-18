const VideoPlayIcon = () => {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_2020_1923)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M29.3333 13.3333H34.6667C43.5032 13.3333 50.6667 20.4968 50.6667 29.3333V34.6667C50.6667 43.5032 43.5032 50.6667 34.6667 50.6667H29.3333C20.4968 50.6667 13.3333 43.5032 13.3333 34.6667V29.3333C13.3333 20.4968 20.4968 13.3333 29.3333 13.3333ZM8 29.3333C8 17.5513 17.5513 8 29.3333 8H34.6667C46.4487 8 56 17.5513 56 29.3333V34.6667C56 46.4487 46.4487 56 34.6667 56H29.3333C17.5513 56 8 46.4487 8 34.6667V29.3333ZM41.7513 32L25.5956 22.4044V41.5956L41.7513 32Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_2020_1923"
          x="-2"
          y="-2"
          width="68"
          height="68"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.35 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_2020_1923"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_2020_1923"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  )
}

export default VideoPlayIcon
