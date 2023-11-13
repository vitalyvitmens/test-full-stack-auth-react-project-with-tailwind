import { ACTION_TYPE } from '../../redux'

export const removeWalkthrough = (walkthroughId) => ({
	type: ACTION_TYPE.REMOVE_WALKTHROUGH,
	payload: walkthroughId,
})
