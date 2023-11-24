import { ACTION_TYPE } from '..'

export const addQuiz = (quizData) => ({
	type: ACTION_TYPE.ADD_QUIZ,
	payload: quizData,
})
