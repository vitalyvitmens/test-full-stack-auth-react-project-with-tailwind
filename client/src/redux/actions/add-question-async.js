import { addQuestion } from '../../redux'

export const addQuestionAsync = (question) => {
	return async (dispatch) => {
		const response = await fetch(`/questions`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(question),
		})
    console.log('addQuestionAsync:', response)
		// const data = await response.json()
		return dispatch(addQuestion(response))
	}
}
