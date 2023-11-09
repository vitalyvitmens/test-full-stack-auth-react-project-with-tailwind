import { ACTION_TYPE } from '../../redux'

const initialQuestionState = {
	questions: [],
}

export const questionReducer = (state = initialQuestionState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_QUESTIONS: {
			return { ...state, questions: action.payload }
		}

		case ACTION_TYPE.ADD_QUESTION: {
			const addQuestion = state.questions.concat([action.payload])

			return { ...state, questions: addQuestion }
		}

		case ACTION_TYPE.UPDATE_QUESTION: {
			const updateQuestion = state.questions.map((question) => {
				if (question._id === action.payload._id) {
					return action.payload
				}

				return question
			})

			return { ...state, questions: updateQuestion }
		}

		case ACTION_TYPE.DELETE_QUESTION: {
			const deleteQuestion = state.questions.filter(
				(question) => question._id !== action.payload
			)

			return { ...state, questions: deleteQuestion }
		}

		default: {
			return state
		}
	}
}
