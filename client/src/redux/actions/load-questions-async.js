import { setQuestions } from '../../redux'

export const loadQuestionsAsync = () => {
	return async (dispatch) => {
		const response = await fetch(`/questions`, {
			method: 'GET',
		})
		const questions = await response.json()
		return dispatch(setQuestions(questions))
	}
}
