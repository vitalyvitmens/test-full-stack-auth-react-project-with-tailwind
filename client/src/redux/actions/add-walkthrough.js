import { ACTION_TYPE } from '../../redux'

export const addWalkthrough = (walkthroughData) => ({
	type: ACTION_TYPE.ADD_WALKTHROUGH,
	payload: walkthroughData,
})
