import { deleteQuestion } from '../../redux'

export const deleteQuestionAsync = (id) => {
	return async (dispatch) => {
		const response = await fetch(`/questions/${id}`, { method: 'DELETE' })
		const data = await response.json()
		return dispatch(deleteQuestion(data))
	}
}
