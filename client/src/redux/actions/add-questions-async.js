import { request } from '../../utils'
import { addQuestions } from '../../redux'

export const addQuestionsAsync = (questionsId, data) => (dispatch) => {
	request(`/quizzes/${questionsId}/questions`, 'POST', { data }).then(
		(comment) => {
			dispatch(addQuestions(comment.data))
		}
	)
}
