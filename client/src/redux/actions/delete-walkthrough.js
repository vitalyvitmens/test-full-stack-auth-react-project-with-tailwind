import { ACTION_TYPE } from '../../redux'

export const deleteWalkthrough = (id) => ({
	type: ACTION_TYPE.DELETE_WALKTHROUGH,
	payload: id,
})
