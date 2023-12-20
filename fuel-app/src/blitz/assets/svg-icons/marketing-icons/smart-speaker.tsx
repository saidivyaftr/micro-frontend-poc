const SmartSpeakerIcon = (props: any) => {
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
        d="M16.0009 1.3335C21.0669 1.3335 25.1902 3.35161 25.3305 5.86768L27.8419 20.9358C28.4181 24.3931 26.672 27.822 23.5371 29.3894C18.7929 31.7615 13.2088 31.7615 8.46466 29.3894C5.32969 27.822 3.58365 24.3931 4.15987 20.9358L6.67122 5.86768C6.81149 3.35161 10.9348 1.3335 16.0009 1.3335ZM22.632 6.00016C22.5423 5.85526 22.2607 5.51182 21.408 5.08547C20.1619 4.46246 18.254 4.00016 16.0009 4.00016C13.7478 4.00016 11.8398 4.46246 10.5938 5.08547C9.74106 5.51182 9.4594 5.85526 9.36974 6.00016C9.4594 6.14507 9.74106 6.4885 10.5938 6.91486C11.8398 7.53786 13.7478 8.00016 16.0009 8.00016C18.254 8.00016 20.1619 7.53786 21.408 6.91486C22.2607 6.4885 22.5423 6.14507 22.632 6.00016ZM16.0009 10.6668C18.8702 10.6668 21.4372 10.0194 23.1493 9.00082L24.9692 19.9204C19.1923 22.1128 12.8095 22.1128 7.03255 19.9204L8.85248 9.00082C10.5646 10.0194 13.1315 10.6668 16.0009 10.6668ZM6.73268 22.6498C6.87131 24.4837 7.95788 26.1546 9.65723 27.0043C13.6506 29.001 18.3511 29.001 22.3445 27.0043C24.0438 26.1546 25.1304 24.4837 25.2691 22.6498C19.2715 24.7586 12.7303 24.7586 6.73268 22.6498Z"
        fill={color}
      />
    </svg>
  )
}
export default SmartSpeakerIcon