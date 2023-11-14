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
		toast(`Пользователь ${firstName} вышел из системы`)
	}

	return (
		<div className="fixed top-0 z-10 w-[80%] flex mb-20 py-2 px-4 justify-around items-center bg-[#4669a4] rounded-b-3xl">
			<span className="flex justify-center items-center px-2 text-blue-900 font-extrabold text-3xl">
				QUIZ 2.0
			</span>

			{firstName ? (
				<ul className="flex gap-8">
					<li>
						<NavLink
							to="/"
							className="text-lg text-gray-400 hover:text-white"
							style={({ isActive }) => (isActive ? activeStyles : undefined)}
						>
							Главная
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/quiz"
							className="text-lg text-gray-400 hover:text-white"
							style={({ isActive }) => (isActive ? activeStyles : undefined)}
						>
							Викторина
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/edit"
							className="text-lg text-gray-400 hover:text-white"
							style={({ isActive }) => (isActive ? activeStyles : undefined)}
						>
							Редактировать
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/walkthroughs"
							className="text-lg text-gray-400 hover:text-white"
							style={({ isActive }) => (isActive ? activeStyles : undefined)}
						>
							Walkthroughs
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
							Регистрация
						</NavLink>
					</li>
				</ul>
			)}
			<div className="flex text-xl">
				<i
					className="fa fa-backward fa-2x pt-2 pr-2 pl-2 text-green-800 hover:cursor-pointer hover:opacity-70"
					onClick={() => navigate(-1)}
				></i>
				{firstName ? (
					<div className="flex items-center">
						<div className="flex flex-col items-center px-2">
							<i
								className="fa fa-user-circle-o fa-2x text-blue-900 hover:cursor-pointer"
								onClick={() => navigate('/profile')}
							></i>
							<h1 className=" text-blue-900 mr-2">{firstName}</h1>
						</div>
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
