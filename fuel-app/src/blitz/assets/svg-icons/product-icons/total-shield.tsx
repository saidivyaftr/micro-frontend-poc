const TotalShieldIcon = (props: any) => {
  const { color = '#141928' } = props
  return (
    <svg
      width="32"
      height="33"
      viewBox="0 0 32 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M29.3346 5.16683L26.6255 5.43774C24.0559 5.69471 21.4719 5.11586 19.2575 3.78721L16.0013 1.8335L12.7451 3.78721C10.5307 5.11586 7.94673 5.69471 5.37711 5.43774L2.66797 5.16683V16.2843C2.66797 20.9678 5.12529 25.3079 9.14136 27.7175L16.0013 31.8335L22.8612 27.7175C26.8773 25.3079 29.3346 20.9678 29.3346 16.2843V5.16683ZM26.668 8.11175C23.6011 8.37126 20.528 7.65936 17.8855 6.07386L16.0013 4.94334L14.1171 6.07386C11.4746 7.65936 8.40155 8.37126 5.33464 8.11175V16.2843C5.33464 20.0311 7.30049 23.5032 10.5134 25.4309L16.0013 28.7237L21.4893 25.4309C24.7021 23.5032 26.668 20.0311 26.668 16.2843V8.11175Z"
        fill={color}
      />
    </svg>
  )
}

export default TotalShieldIcon