import { ACTION_TYPE } from '../../redux'

export const setWalkthroughs = (walkthrougs) => ({
	type: ACTION_TYPE.SET_WALKTHROUGHS,
	payload: walkthrougs,
})
