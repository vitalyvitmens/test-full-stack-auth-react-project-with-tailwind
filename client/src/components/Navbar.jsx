import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout, selectUserFirstName } from '../redux'
import { Button } from '../components'
import { toast } from 'react-toastify'

export const Navbar = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const firstName = useSelector(selectUserFirstName)

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
		<div className="w-full flex mb-20 py-2 justify-around items-center text-xl bg-[#4669a4]">
			<span className="flex justify-center items-center px-2 text-green-800 font-extrabold text-3xl">
				QUIZ 2.0
			</span>

			{firstName ? (
				<ul className="flex gap-8">
					<li>
						<NavLink
							to="/"
							className="text-xl text-gray-400 hover:text-white"
							style={({ isActive }) => (isActive ? activeStyles : undefined)}
						>
							Главная
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/quiz"
							className="text-xl text-gray-400 hover:text-white"
							style={({ isActive }) => (isActive ? activeStyles : undefined)}
						>
							Викторина
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/edit"
							className="text-xl text-gray-400 hover:text-white"
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
							className="text-xl text-gray-400 hover:text-white"
							style={({ isActive }) => (isActive ? activeStyles : undefined)}
						>
							Главная
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/register"
							className="text-xl text-gray-400 hover:text-white"
							style={({ isActive }) => (isActive ? activeStyles : undefined)}
						>
							Register
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/login"
							className="text-xl text-gray-400 hover:text-white"
							style={({ isActive }) => (isActive ? activeStyles : undefined)}
						>
							Login
						</NavLink>
					</li>
				</ul>
			)}
			<div className="flex text-xl">
				<i
					className="fa fa-backward fa-2x pt-1.5 pr-2 text-blue-900 hover:cursor-pointer hover:opacity-70"
					onClick={() => navigate(-1)}
				></i>
				{firstName ? (
					<div className="flex items-center">
						<h1 className="mr-2">{firstName}</h1>
						<Button onClick={logoutHandler}>Выйти</Button>
					</div>
				) : (
					<Button bgColor="bg-green-800">
						<Link to="/login">Войти</Link>
					</Button>
				)}
			</div>
		</div>
	)
}
