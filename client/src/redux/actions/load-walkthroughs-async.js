import { setWalkthroughs } from '../../redux'

export const loadWalkthroughsAsync = () => {
	return async (dispatch) => {
		const response = await fetch(`/walkthroughs`, {
			method: 'GET',
		})
		const walkthroughs = await response.json()
		return dispatch(setWalkthroughs(walkthroughs))
	}
}
