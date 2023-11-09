import { ACTION_TYPE } from '../../redux'

export const deleteQuestion = (id) => ({
	type: ACTION_TYPE.DELETE_QUESTION,
	payload: id,
})
