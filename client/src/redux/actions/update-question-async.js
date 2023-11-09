import { updateQuestion } from '../../redux'

export const updateQuestionAsync = (id, question) => {
	return async (dispatch) => {
		const response = await fetch(`/questions/${id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(question),
		})
		const data = await response.json()
		return dispatch(updateQuestion(data))
	}
}
