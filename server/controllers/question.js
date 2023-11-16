const Question = require('../models/Question')

const getQuestions = async () => {
	const questions = await Question.find()
	return questions
}

const addQuestion = async (question) => {
	const newQuestion = await Question.create(question)
	await newQuestion.populate('author')

  return newQuestion
}

const editQuestion = async (id, updatedQuestion) => {
	await Question.updateOne({ _id: id }, updatedQuestion)
}

const deleteQuestion = async (id) => {
	await Question.deleteOne({ _id: id })
}

module.exports = {
	getQuestions,
	addQuestion,
	deleteQuestion,
	editQuestion,
}
