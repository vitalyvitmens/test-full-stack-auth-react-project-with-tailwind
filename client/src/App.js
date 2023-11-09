import { useLayoutEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Error, Layout } from './components'
import { MainPage, AuthorizationPage, RegistrationPage } from './pages'
import { setUser } from './redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ERROR } from './constants'

export const App = () => {
	const dispatch = useDispatch()

	useLayoutEffect(() => {
		const currentUserDataJSON = sessionStorage.getItem('userData')

		if (!currentUserDataJSON) {
			return
		}

		const currentUserData = JSON.parse(currentUserDataJSON)

		dispatch(
			setUser({
				...currentUserData,
				roleId: Number(currentUserData.roleId),
			})
		)
	}, [dispatch])

	return (
		<Layout>
			<Routes>
				<Route path="/" element={<MainPage />} />
				<Route path="/login" element={<AuthorizationPage />} />
				<Route path="/register" element={<RegistrationPage />} />
				{/* <Route path="/users" element={<Users />} />
				<Route path="/post" element={<Post />} />
				<Route path="/post/:id" element={<Post />} />
				<Route path="/post/:id/edit" element={<Post />} /> */}
				<Route path="*" element={<Error error={ERROR.PAGE_NOT_EXIST} />} />
			</Routes>

			<ToastContainer position="bottom-right" />
		</Layout>
	)
}
