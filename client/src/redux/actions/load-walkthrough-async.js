import { request } from '../../utils'
import { setWalkthrough } from '../../redux'

export const loadWalkthroughAsync = (walkthroughId) => (dispatch) =>
	request(`/walkthroughs/${walkthroughId}`).then((walkthroughData) => {
		if (walkthroughData.data) {
			dispatch(setWalkthrough(walkthroughData.data))
		}

		return walkthroughData
	})
