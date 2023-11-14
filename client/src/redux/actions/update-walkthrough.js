import { ACTION_TYPE } from '../../redux'

export const updateWalkthrough = (walkthroughData) => ({
	type: ACTION_TYPE.UPDATE_WALKTHROUGH,
	payload: walkthroughData,
})
