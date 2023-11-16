import { request } from '../../utils'
import { setQuizData } from '../../redux'

export const loadQuizAsync = (quizId) => (dispatch) =>
	request(`/quizzes/${quizId}`).then((quizData) => {
		if (quizData.data) {
			dispatch(setQuizData(quizData.data))
		}

		return quizData
	})
