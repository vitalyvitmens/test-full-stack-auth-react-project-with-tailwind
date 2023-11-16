import { ACTION_TYPE } from '../../redux'

export const addQuestions = (questionsData) => ({
	type: ACTION_TYPE.ADD_QUESTIONS,
	payload: questionsData,
})
