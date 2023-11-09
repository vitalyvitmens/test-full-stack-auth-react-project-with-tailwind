import { ACTION_TYPE } from '../../redux'

export const removeComment = (commentId) => ({
	type: ACTION_TYPE.REMOVE_COMMENT,
	payload: commentId,
})
