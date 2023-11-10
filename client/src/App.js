import { useLayoutEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Error, Layout } from './components'
import {
	MainPage,
	AuthorizationPage,
	RegistrationPage,
	QuizPage,
	EditPage,
} from './pages'
import { useDispatch } from 'react-redux'
import { loadQuestionsAsync, setUser } from './redux'
import { ERROR } from './constants'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const App = () => {
	const dispatch = useDispatch()

	useLayoutEffect(() => {
		dispatch(loadQuestionsAsync())

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
				<Route path="/quiz" element={<QuizPage />} />
				<Route path="/edit" element={<EditPage />} />
				<Route path="*" element={<Error error={ERROR.PAGE_NOT_EXIST} />} />
				{/* <Route path="/users" element={<Users />} /> */}
				{/* <Route path="/post" element={<Post />} /> */}
				{/* <Route path="/post/:id" element={<Post />} /> */}
				{/* <Route path="/post/:id/edit" element={<Post />} /> */}
			</Routes>

			<ToastContainer position="bottom-right" />
		</Layout>
	)
}
