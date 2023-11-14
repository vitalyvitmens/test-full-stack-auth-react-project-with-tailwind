import { ACTION_TYPE } from '../../redux'

const initialWalkthroughState = {
	walkthroughs: [],
}

export const walkthroughReducer = (state = initialWalkthroughState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_WALKTHROUGHS: {
			return { ...state, walkthroughs: action.payload }
		}

		case ACTION_TYPE.ADD_WALKTHROUGH: {
			const addWalkthrough = state.walkthroughs.concat([action.payload])

			return { ...state, walkthroughs: addWalkthrough }
		}

		case ACTION_TYPE.UPDATE_WALKTHROUGH: {
			const updateWalkthrough = state.walkthroughs.map((walkthrough) => {
				if (walkthrough._id === action.payload._id) {
					return action.payload
				}

				return walkthrough
			})

			return { ...state, walkthroughs: updateWalkthrough }
		}

		case ACTION_TYPE.DELETE_WALKTHROUGH: {
			const deleteWalkthrough = state.walkthroughs.filter(
				(walkthrough) => walkthrough._id !== action.payload
			)

			return { ...state, walkthroughs: deleteWalkthrough }
		}

		default: {
			return state
		}
	}
}
