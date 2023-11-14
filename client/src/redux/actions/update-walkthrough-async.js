import { updateWalkthrough } from '../../redux'

export const updateWalkthroughAsync = (id, walkthrough) => {
	return async (dispatch) => {
		const response = await fetch(`/walkthroughs/${id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(walkthrough),
		})
		const data = await response.json()
		return dispatch(updateWalkthrough(data))
	}
}
