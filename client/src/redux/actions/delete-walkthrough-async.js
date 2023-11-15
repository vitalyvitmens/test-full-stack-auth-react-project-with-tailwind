// import { deleteWalkthrough } from '../../redux'

// export const deleteWalkthroughAsync = (id) => {
// 	return async (dispatch) => {
// 		const response = await fetch(`/walkthroughs/${id}`, { method: 'DELETE' })
// 		const data = await response.json()
// 		return dispatch(deleteWalkthrough(data))
// 	}
// }

import { request } from '../../utils'

export const deleteWalkthroughAsync = (id) => () => request(`/walkthroughs/${id}`, 'DELETE')
