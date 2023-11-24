import { addQuiz } from '..'

export const addQuizAsync = (quiz) => {
	return async (dispatch) => {
		const response = await fetch(`/quizzes`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(quiz),
		})
		return dispatch(addQuiz(response))
	}
}
