import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Button } from '../components'
// import { loginUserAsync } from '../redux/actions'
// import { selectCheckIsAuth, selectStatus } from '../redux/selectors'

export const LoginPage = () => {
	const [login, setLogin] = useState('')
	const [password, setPassword] = useState('')

	// const status = useSelector(selectStatus)
	// const isAuth = useSelector(selectCheckIsAuth)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	// useEffect(() => {
		// if (status) toast(status)
		// if (isAuth) navigate('/')
	// }, [isAuth, navigate, status])

	const handleSubmit = () => {
		try {
			// dispatch(loginUserAsync({ login, password }))
			setLogin('')
			setPassword('')
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<form
			onSubmit={(e) => e.preventDefault()}
			className="w-1/4 h-60 mx-auto mt-40"
		>
			<h1 className="text-lg text-white text-center">Авторизация</h1>
			<label className="text-xs text-gray-400">
				LOGIN
				<input
					id="text"
					type="text"
					value={login}
					onChange={(e) => setLogin(e.target.value)}
					placeholder="login"
					className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"
				></input>
			</label>

			<label className="text-xs text-gray-400">
				PASSWORD
				<input
					id="password"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="password"
					className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"
				></input>
			</label>

			<div className="flex gap-8 justify-center mt-4">
				<Button
					type="submit"
					disabled={!login || !password}
					onClick={handleSubmit}
					bgColor={login && password ? 'bg-green-700' : 'bg-gray-400'}
				>
					Войти
				</Button>
				<Link
					to="/register"
					className="flex justify-center items-center text-xs text-blue-800"
				>
					Нет аккаунта ?
				</Link>
			</div>
		</form>
	)
}
