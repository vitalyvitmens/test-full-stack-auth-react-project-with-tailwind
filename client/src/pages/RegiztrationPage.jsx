import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { AuthFormError, Button } from '../components'
import { useResetForm } from '../hooks'
import { request } from '../utils/request'
import { setUser, selectUserRole } from '../redux'
import { ROLE } from '../constants'
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
	password: yup
		.string()
		.required('Заполните пароль')
		.matches(
			/^[\w#%]+$/,
			'Неверно заполнен пароль. Допускаются буквы, цифры и знаки # %'
		)
		.min(6, 'Неверно заполнен пароль. Минимум 6 символов')
		.max(30, 'Неверно заполнен пароль. Максимум 30 символов'),
	passcheck: yup
		.string()
		.required('Заполните повтор пароля')
		.oneOf([yup.ref('password'), null], 'Повтор пароля не совпадает'),
})

export const RegistrationPage = () => {
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
			password: '',
			passcheck: '',
		},
		resolver: yupResolver(regFormSchema),
	})

	const [serverError, setServerError] = useState(null)
	const dispatch = useDispatch()
	const roleId = useSelector(selectUserRole)

	useResetForm(reset)

	const onSubmit = ({ firstName, lastName, email, password }) => {
		request('/register', 'POST', { firstName, lastName, email, password }).then(
			({ error, user }) => {
				if (error) {
					setServerError(`Ошибка запроса: ${error}`)
					return
				}

				dispatch(setUser(user))
				sessionStorage.setItem('userData', JSON.stringify(user))
				toast(`Пользователь ${firstName} зарегистрировался`)
			}
		)
	}

	const formError =
		errors?.firstName?.message ||
		errors?.lastName?.message ||
		errors?.email?.message ||
		errors?.password?.message ||
		errors?.passcheck?.message
	const errorMessage = formError || serverError

	if (roleId !== ROLE.GUEST) {
		return <Navigate to="/" />
	}

	return (
		<div className="w-[320px] flex flex-col mt-40 p-5 mx-auto items-center border border-gray-400 rounded-2xl shadow-lg shadow-gray-500">
			<h2 className="text-2xl font-semibold">Sign up</h2>
			<form
				className="flex flex-col m-5 w-[260px]"
				onSubmit={handleSubmit(onSubmit)}
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
					placeholder="Иван"
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
					placeholder="test@example.com"
					{...register('email', {
						onChange: () => setServerError(null),
					})}
				/>
				<label className="text-sm px-2" htmlFor="registerPassword">
					Пароль
				</label>
				<input
					className="border rounded-md py-1 px-2 m-2 border-gray-400 bg-[#e0e9f8]"
					id="registerPassword"
					name="registerPassword"
					type="password"
					placeholder="Пароль..."
					{...register('password', {
						onChange: () => setServerError(null),
					})}
				/>{' '}
				<label className="text-sm px-2" htmlFor="passcheck">
					Повторить пароль
				</label>
				<input
					className="border rounded-md py-1 px-2 m-2 border-gray-400 bg-[#e0e9f8]"
					id="passcheck"
					name="passcheck"
					type="password"
					placeholder="Повтор пароля..."
					{...register('passcheck', {
						onChange: () => setServerError(null),
					})}
				/>
				<div className="m-auto mt-4">
					<Button
						className="m-auto"
						bgColor="bg-green-800"
						type="submit"
						disabled={!!formError}
					>
						Регистрация
					</Button>
				</div>
				{errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
				<div className="text-xs m-auto mt-2">
					Есть аккаунт?{' '}
					<Link
						to="/login"
						className="text-blue-800 text-sm underline hover:opacity-80"
					>
						Войти
					</Link>
				</div>
			</form>
		</div>
	)
}
