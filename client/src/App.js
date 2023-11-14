import { useLayoutEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Error, Layout } from './components'
import {
	MainPage,
	AuthorizationPage,
	RegistrationPage,
	QuizPage,
	EditPage,
	ProfilePage,
} from './pages'
import { useDispatch } from 'react-redux'
import { loadQuestionsAsync, setUser } from './redux'
import { ERROR } from './constants'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { WalkthroughsPage } from './pages/WalkthroughsPage'

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
				<Route path="/walkthroughs" element={<WalkthroughsPage />} />
				<Route path="/profile" element={<ProfilePage />} />
				<Route path="*" element={<Error error={ERROR.PAGE_NOT_EXIST} />} />
			</Routes>

			<ToastContainer position="bottom-right" />
		</Layout>
	)
}
