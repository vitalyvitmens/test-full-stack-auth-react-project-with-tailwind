import { ACTION_TYPE } from '../../redux'

export const setQuestions = (questions) => ({
	type: ACTION_TYPE.SET_QUESTIONS,
	payload: questions,
})
