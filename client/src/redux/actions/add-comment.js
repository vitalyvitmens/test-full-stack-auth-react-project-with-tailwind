import { ACTION_TYPE } from '../../redux'

export const addComment = (comment) => ({
	type: ACTION_TYPE.ADD_COMMENT,
	payload: comment,
})
