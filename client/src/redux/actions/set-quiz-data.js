import { ACTION_TYPE } from '../../redux'

export const setQuizData = (quizData) => ({
	type: ACTION_TYPE.SET_QUIZ_DATA,
	payload: quizData,
})
