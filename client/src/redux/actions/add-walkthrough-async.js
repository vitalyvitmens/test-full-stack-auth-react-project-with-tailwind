import { request } from '../../utils'
import { addWalkthrough } from '../../redux'

export const addWalkthroughAsync = (quizId, walkthrough) => (dispatch) => {
	request(`/quizs/${quizId}/walkthroughs`, 'POST', { walkthrough }).then(
		(walkthrough) => {
			dispatch(addWalkthrough(walkthrough.data))
		}
	)
}
