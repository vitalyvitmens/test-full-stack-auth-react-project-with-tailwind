import { Link } from 'react-router-dom'
import { PROP_TYPE } from '../constants'

export const Error = ({ error }) =>
	error && (
		<>
			<div className="flex flex-col items-center text-sm/[18px] pt-40">
				<h2 className="my-5 text-xl">{error}</h2>
				<div className="bg-dribbble h-[600px] w-[800px] bg-center"></div>
				<Link
					className="mt-5 text-green-900 text-xl font-semibold underline hover:opacity-70"
					to="/"
				>
					НА ГЛАВНУЮ
				</Link>
			</div>
		</>
	)

Error.propTypes = {
	error: PROP_TYPE.ERROR,
}
