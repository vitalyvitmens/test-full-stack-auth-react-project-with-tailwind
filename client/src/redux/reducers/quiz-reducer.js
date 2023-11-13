import { ACTION_TYPE } from '../../redux'

const initialQuizState = {
	id: '',
	title: '',
	publishedAt: '',
	walkthroughs: [],
}

export const quizReducer = (state = initialQuizState, action) => {
	switch (action.type) {
		case ACTION_TYPE.ADD_WALKTHROUGH:
			return {
				...state,
				walkthroughs: [...state.walkthroughs, action.payload],
			}
		case ACTION_TYPE.REMOVE_WALKTHROUGH:
			return {
				...state,
				walkthroughs: state.walkthroughs.filter(
					(walkthrough) => walkthrough.id !== action.payload
				),
			}
		case ACTION_TYPE.SET_QUIZ_DATA:
			return {
				...state,
				...action.payload,
			}
		case ACTION_TYPE.RESET_QUIZ_DATA:
			return initialQuizState
		default:
			return state
	}
}
