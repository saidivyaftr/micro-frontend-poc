const InstallationIcon = (props: any) => {
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
        d="M14.1739 12.3366V15.7416L16.1739 17.8133L19.6506 17.8133L26.7686 10.6953C27.202 11.5734 27.5311 12.512 27.7399 13.4952C27.9115 14.3031 28.0017 15.141 28.0017 16C28.0017 22.6274 22.6291 28 16.0017 28C15.0794 28 14.1814 27.8959 13.3187 27.6989L10.8859 30.1317L9.00032 28.2461L12.4754 24.771L13.9125 25.0992C14.5817 25.252 15.2806 25.3333 16.0017 25.3333C21.1564 25.3333 25.3351 21.1547 25.3351 16C25.3351 15.9668 25.3349 15.9337 25.3345 15.9006L20.7552 20.48L15.0417 20.48L11.5072 16.8188V11.232L16.0723 6.66693C16.0488 6.66675 16.0253 6.66667 16.0017 6.66667C10.8471 6.66667 6.66838 10.8453 6.66838 16C6.66838 16.7057 6.74623 17.3901 6.89277 18.0461L7.21229 19.4766L3.72155 22.9673L1.83594 21.0817L4.29023 18.6274C4.10136 17.7818 4.00172 16.9025 4.00172 16C4.00172 9.37258 9.3743 4 16.0017 4C16.8522 4 17.6821 4.08848 18.4825 4.25674C19.4672 4.46371 20.4074 4.79139 21.2869 5.22358L14.1739 12.3366Z"
        fill={color}
      />
    </svg>
  )
}

export default InstallationIcon
