import { request } from '../../utils'
import { removeWalkthrough } from '../../redux'

export const removeWalkthroughAsync = (quizId, id) => (dispatch) => {
	request(`/quizs/${quizId}/walkthroughs/${id}`, 'DELETE').then(() => {
		dispatch(removeWalkthrough(id))
	})
}
