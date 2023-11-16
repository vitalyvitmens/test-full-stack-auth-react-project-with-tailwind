import { request } from '../../utils'
import { setQuizData } from '../../redux'

export const saveQuizAsync = (id, newQuizData) => (dispatch) => {
	const saveRequest = id
		? request(`/quizzes/${id}`, 'PATCH', newQuizData)
		: request('/quizzes', 'POST', newQuizData)

	return saveRequest.then((updatedQuiz) => {
		dispatch(setQuizData(updatedQuiz.data))

		return updatedQuiz.data
	})
}
