import { ACTION_TYPE } from '..'

export const deleteQuiz = (id) => ({
	type: ACTION_TYPE.DELETE_QUIZ,
	payload: id,
})
