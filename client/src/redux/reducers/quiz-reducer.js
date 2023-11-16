import { ACTION_TYPE } from '../../redux'

const initialQuizState = {
	id: '',
	title: '',
  author: '',
	publishedAt: '',
	questions: [],
}

export const quizReducer = (state = initialQuizState, action) => {
	switch (action.type) {
		case ACTION_TYPE.ADD_QUESTIONS:
			return {
				...state,
				questions: [...state.questions, action.payload],
			}
		case ACTION_TYPE.REMOVE_QUESTIONS:
			return {
				...state,
				questions: state.questions.filter(
					(questions) => questions.id !== action.payload
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
