import { useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser, setUser, updateUserAsync } from '../redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export const ProfilePage = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const user = useSelector(selectUser)

	const [firstNameValue, setFirstNameValue] = useState('')
	const [lastNameValue, setLastNameValue] = useState('')
	const [emailValue, setEmailValue] = useState('')

	const onSave = () => {
		dispatch(
			updateUserAsync(user.id, {
				firstName: firstNameValue ? firstNameValue : '',
				lastName: lastNameValue ? lastNameValue : '',
				email: emailValue ? emailValue : '',
			})
		).then(() => navigate(`/profile`))

		sessionStorage.removeItem('userData')
		sessionStorage.setItem('userData', JSON.stringify(user))
		toast(`Вы обновили свои данные`)
	}

	useLayoutEffect(() => {
		setFirstNameValue(firstNameValue)
		setLastNameValue(lastNameValue)
		setEmailValue(emailValue)
	}, [dispatch, emailValue, firstNameValue, lastNameValue, user])

	const formError = !firstNameValue || !lastNameValue || !emailValue

	return (
		<div className="w-[320px] flex flex-col px-5 py-2 mx-auto border border-gray-400 rounded-2xl shadow-lg shadow-gray-500">
			<div className="flex justify-end">
				{formError ? (
					<i className="fa fa-check-circle-o fa-4x text-gray-400"></i>
				) : (
					<i
						className="fa fa-check-circle-o fa-4x text-green-800 hover:cursor-pointer"
						onClick={onSave}
					></i>
				)}
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
			</div>
		</div>
	)
}
