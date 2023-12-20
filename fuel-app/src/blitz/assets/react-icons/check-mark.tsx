const Icon = (props: any) => {
    const { d = "M20.75 6L19.25 4.5L9.25 14.5L5.5 10.75L4 12.25L7.75 16L9.25 17.5L10.75 16L20.75 6Z", fill = "#FF0037", strokeWidth = "1", ...svgprops } = props
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...svgprops}
        >
            <path
                d={d}
                fill-rule="evenodd"
                clip-rule="evenodd"
                fill={fill}
                strokeWidth={strokeWidth} 
            />
        </svg>
    )
}
export default Icon
