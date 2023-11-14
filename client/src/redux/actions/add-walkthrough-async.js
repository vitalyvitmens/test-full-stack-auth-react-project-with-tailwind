import { addWalkthrough } from '../../redux'

export const addWalkthroughAsync = (walkthrough) => {
	return async (dispatch) => {
		const response = await fetch(`/walkthroughs`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(walkthrough),
		})
		return dispatch(addWalkthrough(response))
	}
}
