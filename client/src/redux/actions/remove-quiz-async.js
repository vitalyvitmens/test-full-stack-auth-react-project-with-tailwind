import { request } from '../../utils'

export const removeQuizAsync = (id) => () => request(`/quizzes/${id}`, 'DELETE')
