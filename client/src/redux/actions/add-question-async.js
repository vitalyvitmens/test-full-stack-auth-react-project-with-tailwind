import { request } from '../../utils/request'
import { addQuestion } from '../../redux'

// export const addQuestionAsync = (question) => (dispatch) => {
// 	request(`/questions`, 'POST', { question }).then((ques) => {
//     console.log('addQuestionAsync:', dispatch(addQuestion(ques.data)))
// 		return dispatch(addQuestion(ques.data))
// 	})
// }

// export const addQuestionAsync = (question) => (dispatch) => {
// 	const questionData = request(`/questions`, 'POST', { question }).then(
// 		(a) => a
// 	)
// 	console.log('addQuestionAsync:', questionData)

// 	return dispatch(addQuestion(questionData))
// }

// export const addQuestionAsync = (question) => {
// 	return async (dispatch) => {
// 		const response = await request(`/questions`, 'POST', {question})
// 		console.log('addQuestionAsync:', response)
// 		// const data = await response.json()
//     return dispatch(addQuestion(response))
// 	}
// }
export const addQuestionAsync = (question) => {
	return async (dispatch) => {
		const response = await fetch(`/questions`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(question),
		})
    console.log('addQuestionAsync:', response)
		// const data = await response.json()
		return dispatch(addQuestion(response))
	}
}
