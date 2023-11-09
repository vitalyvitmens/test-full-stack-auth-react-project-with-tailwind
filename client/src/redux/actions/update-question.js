import { ACTION_TYPE } from '../../redux'

export const updateQuestion = (questionData) => ({
	type: ACTION_TYPE.UPDATE_QUESTION,
	payload: questionData,
})
