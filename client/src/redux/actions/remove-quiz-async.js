import { request } from '../../utils'

export const removeQuizAsync = (id) => () => request(`/quizs/${id}`, 'DELETE')
