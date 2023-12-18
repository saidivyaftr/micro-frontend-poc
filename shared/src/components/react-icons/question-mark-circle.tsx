const QuestionMarkCircle = (props: any) => {
  const { fill } = props
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="80" height="80" rx="40" fill="#96FFF5" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M32 30C32 27.2386 34.2386 25 37 25H43.5C46.2614 25 48.5 27.2386 48.5 30V32.5542C48.5 33.7991 47.7313 34.9146 46.568 35.3577L42.508 36.9044C39.7937 37.9384 38 40.5412 38 43.4458V47.5H42V43.4458C42 42.2009 42.7687 41.0855 43.932 40.6423L47.992 39.0957C50.7063 38.0616 52.5 35.4588 52.5 32.5542V30C52.5 25.0294 48.4706 21 43.5 21H37C32.0294 21 28 25.0294 28 30V34H32V30ZM41 58C42.1046 58 43 57.1046 43 56V54C43 52.8954 42.1046 52 41 52H39C37.8954 52 37 52.8954 37 54V56C37 57.1046 37.8954 58 39 58H41Z"
        fill={fill || '#141928'}
      />
    </svg>
  )
}

export default QuestionMarkCircle
