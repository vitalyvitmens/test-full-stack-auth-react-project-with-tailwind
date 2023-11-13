import { ACTION_TYPE } from '../../redux'

export const addWalkthrough = (walkthrough) => ({
	type: ACTION_TYPE.ADD_WALKTHROUGH,
	payload: walkthrough,
})
