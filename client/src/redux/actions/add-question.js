import { ACTION_TYPE } from '../../redux'

export const addQuestion = (questionData) => ({
	type: ACTION_TYPE.ADD_QUESTION,
	payload: questionData,
})
