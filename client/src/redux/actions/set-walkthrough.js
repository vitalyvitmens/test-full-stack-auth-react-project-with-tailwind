import { ACTION_TYPE } from '../../redux'

export const setWalkthrough = (walkthroughData) => ({
	type: ACTION_TYPE.SET_WALKTHROUGH_DATA,
	payload: walkthroughData,
})
