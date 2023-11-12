import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { AuthFormError, Button } from '../components'
import { useResetForm } from '../hooks'
import { request } from '../utils/request'
import { selectUser, updateUserAsync } from '../redux'
import { toast } from 'react-toastify'

const regFormSchema = yup.object().shape({
	firstName: yup
		.string()
		.required('Укажите своё имя')
		.matches(
			/^([А-Я]{1}[а-яё]{1,23}|[A-Z]{1}[a-z]{1,23})$/,
			'Неверно указано имя. Допускаются только буквы'
		)
		.min(2, 'Неверно указано имя. Минимум 2 символа')
		.max(15, 'Неверно указано имя. Максимум 15 символов'),
	lastName: yup
		.string()
		.required('Укажите свою фамилию')
		.matches(
			/^([А-Я]{1}[а-яё]{1,23}|[A-Z]{1}[a-z]{1,23})$/,
			'Неверно указана фамилия. Допускаются только буквы'
		)
		.min(2, 'Неверно указана фамилия. Минимум 2 символа')
		.max(15, 'Неверно указана фамилия. Максимум 15 символов'),
	email: yup
		.string()
		.required('Заполните email')
		.matches(
			/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/,
			'Неверно заполнен email.'
		)
		.min(5, 'Неверно заполнен email. Минимум 5 символа')
		.max(30, 'Неверно заполнен email. Максимум 30 символов'),
})

export const MyPage = () => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			firstName: '',
			lastName: '',
			email: '',
		},
		resolver: yupResolver(regFormSchema),
	})

	const [serverError, setServerError] = useState(null)
	const dispatch = useDispatch()
	const user = useSelector(selectUser)

	useResetForm(reset)

	const onSubmit = ({ firstName, lastName, email }) => {
		request('/me', 'PUT', { firstName, lastName, email }).then(
			({ error, user }) => {
				if (error) {
					setServerError(`Ошибка запроса: ${error}`)
					return
				}

				sessionStorage.removeItem('userData')
				dispatch(
					updateUserAsync(user.id, {
						firstName,
						lastName,
						email,
					})
				)
				sessionStorage.setItem('userData', JSON.stringify(user))
				toast(`Вы обновили свои данные`)
			}
		)
	}

	const formError =
		errors?.firstName?.message ||
		errors?.lastName?.message ||
		errors?.email?.message
	const errorMessage = formError || serverError

	// if (roleId !== ROLE.GUEST) {
	// 	return <Navigate to="/me" />
	// }

	return (
		<div className="w-[320px] flex flex-col px-5 py-2 mx-auto border border-gray-400 rounded-2xl shadow-lg shadow-gray-500">
			<form
				className="flex flex-col m-5 w-[260px]"
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className="flex justify-end">
					<Button
						className="m-auto"
						bgColor="bg-blue-400"
						type="submit"
						disabled={!!formError}
					>
						{!!formError ? (
							<i className="fa fa-check-circle-o fa-4x text-gray-400"></i>
						) : (
							<i
								className="fa fa-check-circle-o fa-4x text-green-800 hover:cursor-pointer"
								type="submit"
								// disabled={!!formError}
								// onClick={onSave}
							></i>
						)}
					</Button>
				</div>
				<i className="fa fa-smile-o text-[200px] text-center"></i>
				<label className="text-sm px-2" htmlFor="firstName">
					Имя
				</label>
				<input
					className="border rounded-md py-1 px-2 m-2 border-gray-400 bg-[#e0e9f8]"
					id="firstName"
					name="firstName"
					type="text"
					placeholder={user.firstName}
					{...register('firstName', {
						onChange: () => setServerError(null),
					})}
				/>
				<label className="text-sm px-2" htmlFor="lastName">
					Фамилия
				</label>
				<input
					className="border rounded-md py-1 px-2 m-2 border-gray-400 bg-[#e0e9f8]"
					id="lastName"
					name="lastName"
					type="text"
					placeholder={user.lastName}
					{...register('lastName', {
						onChange: () => setServerError(null),
					})}
				/>
				<label className="text-sm px-2" htmlFor="registerEmail">
					Электронная почта
				</label>
				<input
					className="border rounded-md py-1 px-2 m-2 border-gray-400 bg-[#e0e9f8]"
					id="registerEmail"
					name="registerEmail"
					type="email"
					placeholder={user.email}
					{...register('email', {
						onChange: () => setServerError(null),
					})}
				/>
				{errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
			</form>
		</div>
	)
}
