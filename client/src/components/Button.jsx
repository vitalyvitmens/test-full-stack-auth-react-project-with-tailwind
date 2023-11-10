export const Button = ({
	title,
	onClick,
	disabled,
	children,
	bgColor = 'bg-red-600',
  fontSize = 'text-sm',
}) => {
	return (
		<button
			onClick={onClick}
			disabled={disabled}
			className={`my-2 py-2 px-8 ${fontSize} text-white ${bgColor} rounded-md hover:opacity-70 duration-150 ease-in ${
				disabled && 'opacity-50 hover:opacity-50'
			}`}
		>
			{title || children}
		</button>
	)
}
