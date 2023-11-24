import { deleteQuiz } from '..'

export const deleteQuizAsync = (id) => {
	return async (dispatch) => {
		const response = await fetch(`/quizzes/${id}`, { method: 'DELETE' })
		const data = await response.json()
		return dispatch(deleteQuiz(data))
	}
}
