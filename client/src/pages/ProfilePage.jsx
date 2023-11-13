import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser, updateUserAsync } from '../redux'
import { toast } from 'react-toastify'

export const ProfilePage = () => {
	const dispatch = useDispatch()
	const user = useSelector(selectUser)

	const [firstNameValue, setFirstNameValue] = useState('')
	const [lastNameValue, setLastNameValue] = useState('')
	const [emailValue, setEmailValue] = useState('')
	const [editUserData, setEditUserData] = useState(false)

	const onSave = () => {
		dispatch(
			updateUserAsync(user.id, {
				firstName: firstNameValue,
				lastName: lastNameValue,
				email: emailValue,
			})
		).then((newUser) => {
			sessionStorage.removeItem('userData')
			sessionStorage.setItem('userData', JSON.stringify(newUser))
			setFirstNameValue('')
			setLastNameValue('')
			setEmailValue('')
			setEditUserData(!editUserData)
		})

		toast(`Вы обновили свои данные`)
	}

	const formError = !firstNameValue || !lastNameValue || !emailValue

	return !editUserData ? (
		<div className="w-[320px] flex flex-col mt-40 py-4 px-4 mx-auto border border-gray-400 rounded-2xl shadow-lg shadow-gray-500">
			<div className="flex justify-end">
				<i
					className="fa fa-pencil-square-o fa-3x text-blue-800 hover:cursor-pointer"
					onClick={() => setEditUserData(!editUserData)}
				></i>
			</div>
			<i className="fa fa-smile-o text-[300px] text-center"></i>
			<div className="text-center text-2xl pt-2">
				{user.lastName} {user.firstName}
			</div>
			<div className="text-center text-lg pb-5 text-green-900">
				{user.email}
			</div>
		</div>
	) : (
		<div className="w-[320px] flex flex-col mt-40 px-5 py-4 mx-auto border border-gray-400 rounded-2xl shadow-lg shadow-gray-500">
			<div className="flex justify-end">
				<div className="flex flex-row w-full justify-between">
					<i
						className="fa fa-arrow-left fa-3x text-blue-800 hover:cursor-pointer"
						onClick={() => setEditUserData(!editUserData)}
					></i>
					{formError ? (
						<i className="fa fa-check-circle-o fa-3x text-gray-400"></i>
					) : (
						<i
							className="fa fa-check-circle-o fa-3x text-green-800 hover:cursor-pointer"
							onClick={onSave}
						></i>
					)}
				</div>
			</div>
			<i className="fa fa-smile-o text-[200px] text-center"></i>
			<div
				className="flex flex-col m-5 w-[260px]"
				// onSubmit={handleSubmit(onSubmit)}
			>
				<label className="text-sm px-2" htmlFor="firstName">
					Имя
				</label>
				<input
					className="border rounded-md py-1 px-2 m-2 border-gray-400 bg-[#e0e9f8]"
					id="firstName"
					value={firstNameValue}
					name="firstName"
					type="text"
					placeholder={user.firstName}
					onChange={(e) => setFirstNameValue(e.target.value)}
					// {...register('firstName', {
					// 	onChange: () => setServerError(null),
					// })}
				/>
				{!firstNameValue ? (
					<div className="px-3 text-red-700 text-xs">
						Поле не должно быть пустым
					</div>
				) : null}
				<label className="text-sm px-2" htmlFor="lastName">
					Фамилия
				</label>
				<input
					className="border rounded-md py-1 px-2 m-2 border-gray-400 bg-[#e0e9f8]"
					id="lastName"
					value={lastNameValue}
					name="lastName"
					type="text"
					placeholder={user.lastName}
					onChange={(e) => setLastNameValue(e.target.value)}
					// {...register('lastName', {
					// 	onChange: () => setServerError(null),
					// })}
				/>
				{!lastNameValue ? (
					<div className="px-3 text-red-700 text-xs">
						Поле не должно быть пустым
					</div>
				) : null}
				<label className="text-sm px-2" htmlFor="registerEmail">
					Электронная почта
				</label>
				<input
					className="border rounded-md py-1 px-2 m-2 border-gray-400 bg-[#e0e9f8]"
					id="registerEmail"
					value={emailValue}
					name="registerEmail"
					type="email"
					placeholder={user.email}
					onChange={(e) => setEmailValue(e.target.value)}
					// {...register('email', {
					// 	onChange: () => setServerError(null),
					// })}
				/>
				{!emailValue ? (
					<div className="px-3 text-red-700 text-xs">
						Почта должна соответствовать шаблону {user.email}
					</div>
				) : null}
			</div>
		</div>
	)
}
