import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout, selectUserLogin } from '../redux'
import { Button } from '../components'
import { toast } from 'react-toastify'

export const Navbar = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const login = useSelector(selectUserLogin)

	const activeStyles = {
		color: 'white',
	}

	const logoutHandler = () => {
		dispatch(logout())
		sessionStorage.removeItem('userData')
		navigate('/login')
		toast('Вы вышли из системы')
	}

	return (
		<div className="flex py-4 justify-between items-center">
			<span className="flex justify-center items-center px-2 text-green-800 font-extrabold text-3xl">
				QUIZ 1.0
			</span>

			{login ? (
				<ul className="flex gap-8">
					<li>
						<NavLink
							to="/"
							className="text-xs text-gray-400 hover:text-white"
							style={({ isActive }) => (isActive ? activeStyles : undefined)}
						>
							Главная
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/quiz"
							className="text-xs text-gray-400 hover:text-white"
							style={({ isActive }) => (isActive ? activeStyles : undefined)}
						>
							Викторина
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/edit"
							className="text-xs text-gray-400 hover:text-white"
							style={({ isActive }) => (isActive ? activeStyles : undefined)}
						>
							Редактировать
						</NavLink>
					</li>
				</ul>
			) : (
				<ul className="flex gap-8">
					<li>
						<NavLink
							to="/"
							className="text-xs text-gray-400 hover:text-white"
							style={({ isActive }) => (isActive ? activeStyles : undefined)}
						>
							Главная
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/register"
							className="text-xs text-gray-400 hover:text-white"
							style={({ isActive }) => (isActive ? activeStyles : undefined)}
						>
							Register
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/login"
							className="text-xs text-gray-400 hover:text-white"
							style={({ isActive }) => (isActive ? activeStyles : undefined)}
						>
							Login
						</NavLink>
					</li>
				</ul>
			)}
			<i
				className="fa fa-backward fa-2x text-green-900 hover:cursor-pointer hover:opacity-70"
				onClick={() => navigate(-1)}
			>
				{' '}
				назад
			</i>
			{login ? (
				<div className="flex items-center">
					<h1 className="mr-2">{login}</h1>
					<Button onClick={logoutHandler}>Выйти</Button>
				</div>
			) : (
				<Button bgColor="bg-green-800">
					<Link to="/login">Войти</Link>
				</Button>
			)}
		</div>
	)
}
