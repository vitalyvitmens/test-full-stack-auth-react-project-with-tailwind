import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { AuthFormError, Button } from '../components'
import { useResetForm } from '../hooks'
import { setUser, selectUserRole } from '../redux'
import { ROLE } from '../constants'
import { request } from '../utils/request'
import { toast } from 'react-toastify'

const authFormSchema = yup.object().shape({
  	// firstName: yup
	// 	.string()
	// 	.required('Укажите своё имя')
	// 	.matches(/^\w$/, 'Неверно указано имя. Допускаются только буквы')
	// 	.min(2, 'Неверно указано имя. Минимум 2 символа')
	// 	.max(15, 'Неверно указано имя. Максимум 15 символов'),
	// lastName: yup
	// 	.string()
	// 	.required('Укажите свою фамилию')
	// 	.matches(/^\w$/, 'Неверно указана фамилия. Допускаются только буквы')
	// 	.min(2, 'Неверно указана фамилия. Минимум 2 символа')
	// 	.max(15, 'Неверно указана фамилия. Максимум 15 символов'),
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
})

export const AuthorizationPage = () => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
		resolver: yupResolver(authFormSchema),
	})

	const [serverError, setServerError] = useState(null)
	const dispatch = useDispatch()
	const roleId = useSelector(selectUserRole)

	useResetForm(reset)

	const onSubmit = ({ email, password }) => {
		request('/login', 'POST', { email, password }).then(({ error, user }) => {
			if (error) {
				setServerError(`Ошибка запроса: ${error}`)
				return
			}

			dispatch(setUser(user))
			sessionStorage.setItem('userData', JSON.stringify(user))
			toast(`${email} авторизовался`)
		})
	}

	const formError = errors?.email?.message || errors?.password?.message
	const errorMessage = formError || serverError

	if (roleId !== ROLE.GUEST) {
		return <Navigate to="/" />
	}

	return (
		<div className="w-[320px] flex flex-col p-5 mx-auto items-center border border-gray-400 rounded-2xl shadow-lg shadow-gray-500">
			<h2 className="text-2xl font-semibold">Login</h2>
			<form
				className="flex flex-col m-5 w-[260px]"
				onSubmit={handleSubmit(onSubmit)}
			>
				<label className="text-sm px-2" htmlFor="authEmail">
					Электронная почта
				</label>
				<input
					className="border rounded-md py-1 px-2 m-2 border-gray-400 bg-[#e0e9f8]"
					id="authEmail"
					name="authEmail"
					type="email"
					placeholder="test@example.com"
					{...register('email', {
						onChange: () => setServerError(null),
					})}
				/>
				<label className="text-sm px-2" htmlFor="authPassword">
					Пароль
				</label>
				<input
					className="border rounded-md py-1 px-2 m-2 border-gray-400 bg-[#e0e9f8]"
					id="authPassword"
					name="authPassword"
					type="password"
					placeholder="Пароль..."
					{...register('password', {
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
						Войти
					</Button>
				</div>
				{errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
				<div className="text-xs m-auto mt-2">
					Нет аккаунта?{' '}
					<Link
						to="/register"
						className="text-blue-800 text-sm underline hover:opacity-80"
					>
						Зарегистрироваться
					</Link>
				</div>
			</form>
		</div>
	)
}
