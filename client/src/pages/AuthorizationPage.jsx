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
	login: yup
		.string()
		.required('Заполните логин')
		.matches(
			/^\w+$/,
			'Неверно заполнен логин. Допускаются только буквы и цифры'
		)
		.min(3, 'Неверно заполнен логин. Минимум 3 символа')
		.max(15, 'Неверно заполнен логин. Максимум 15 символов'),
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
			login: '',
			password: '',
		},
		resolver: yupResolver(authFormSchema),
	})

	const [serverError, setServerError] = useState(null)
	const dispatch = useDispatch()
	const roleId = useSelector(selectUserRole)

	useResetForm(reset)

	const onSubmit = ({ login, password }) => {
		request('/login', 'POST', { login, password }).then(({ error, user }) => {
			if (error) {
				setServerError(`Ошибка запроса: ${error}`)
				return
			}

			dispatch(setUser(user))
			sessionStorage.setItem('userData', JSON.stringify(user))
			toast(`${login} авторизовался`)
		})
	}

	const formError = errors?.login?.message || errors?.password?.message
	const errorMessage = formError || serverError

	if (roleId !== ROLE.GUEST) {
		return <Navigate to="/" />
	}

	return (
		<div className="w-[320px] flex flex-col p-5 mx-auto items-center border border-gray-400 rounded-md shadow-lg shadow-gray-500">
			<h2 className="text-2xl font-semibold">Login</h2>
			<form
				className="flex flex-col m-5 w-[260px]"
				onSubmit={handleSubmit(onSubmit)}
			>
				<label className="text-sm px-2" htmlFor="authLogin">
					Электронная почта
				</label>
				<input
					className="border rounded-md py-1 px-2 m-2 border-gray-400 bg-[#6aadfa]"
					id="authLogin"
					name="authLogin"
					type="text"
					placeholder="Логин..."
					{...register('login', {
						onChange: () => setServerError(null),
					})}
				/>
				<label className="text-sm px-2" htmlFor="authPassword">
					Пароль
				</label>
				<input
					className="border rounded-md py-1 px-2 m-2 border-gray-400 bg-[#6aadfa]"
					id="authPassword"
					name="authPassword"
					type="password"
					placeholder="Пароль..."
					{...register('password', {
						onChange: () => setServerError(null),
					})}
				/>
				<div className="m-auto">
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
				<div className="text-xs">
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
