const Icon = (props: any) => {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="80" height="80" rx="40" fill="#96FFF5" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M34 22H46L46 26H34V22ZM30 26V22C30 19.7909 31.7909 18 34 18H46C48.2091 18 50 19.7909 50 22V26H60V30H50H46H34H30L20 30V26L30 26ZM24 51V34H20V51C20 57.6274 25.3726 63 32 63H48C54.6274 63 60 57.6274 60 51V34H56V51C56 55.4183 52.4183 59 48 59H32C27.5817 59 24 55.4183 24 51ZM30 34L30 53H34L34 34H30ZM38 53L38 34H42L42 53H38ZM46 53L46 34H50L50 53H46Z"
        fill="#141928"
      />
    </svg>
  )
}

export default Icon
