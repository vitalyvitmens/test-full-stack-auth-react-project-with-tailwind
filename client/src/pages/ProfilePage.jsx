import { useState } from 'react'

export const ProfilePage = () => {
	const [correct, setCorrect] = useState(false)

	const onCorrectChange = () => {
		return setCorrect(!correct)
	}

	return (
		<div className="w-[320px] flex flex-col px-5 py-2 mx-auto items-center border border-gray-400 rounded-2xl shadow-lg shadow-gray-500">
			<div className="flex items-end text-end justify-end">
				{correct ? (
					<i
						className="fa fa-check-circle-o fa-4x text-green-800 hover:cursor-pointer"
						onClick={() => onCorrectChange()}
					></i>
				) : (
					<i
						className="fa fa-circle-o fa-4x text-gray-400 hover:cursor-pointer"
						onClick={() => onCorrectChange()}
					></i>
				)}
			</div>
			<i className="fa fa-smile-o text-[200px]"></i>
			<form
				className="flex flex-col m-5 w-[260px]"
				// onSubmit={handleSubmit(onSubmit)}
			>
				<label className="text-sm px-2" htmlFor="firstName">
					Имя
				</label>
				<input
					className="border rounded-md py-1 px-2 m-2 border-gray-400 bg-[#e0e9f8]"
					id="firstName"
					name="firstName"
					type="text"
					placeholder="Иванов"
					// {...register('firstName', {
					// 	onChange: () => setServerError(null),
					// })}
				/>
				<label className="text-sm px-2" htmlFor="lastName">
					Фамилия
				</label>
				<input
					className="border rounded-md py-1 px-2 m-2 border-gray-400 bg-[#e0e9f8]"
					id="lastName"
					name="lastName"
					type="text"
					placeholder="Иван"
					// {...register('lastName', {
					// 	onChange: () => setServerError(null),
					// })}
				/>
				<label className="text-sm px-2" htmlFor="registerEmail">
					Электронная почта
				</label>
				<input
					className="border rounded-md py-1 px-2 m-2 border-gray-400 bg-[#e0e9f8]"
					id="registerEmail"
					name="registerEmail"
					type="email"
					placeholder="test@example.com"
					// {...register('email', {
					// 	onChange: () => setServerError(null),
					// })}
				/>
			</form>
		</div>
	)
}
