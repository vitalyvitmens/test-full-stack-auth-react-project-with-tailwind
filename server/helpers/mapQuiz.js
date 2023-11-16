const mongoose = require('mongoose')
const mapWalkthrough = require('./mapWalkthrough')
const mapQuestion = require('./mapQuestion')

module.exports = function (quiz) {
	return {
		id: quiz.id,
		title: quiz.title,
		questions: quiz.questions.map((question) =>
			mongoose.isObjectIdOrHexString(question)
				? question
				: mapQuestion(question)
		),
		publishedAt: quiz.createdAt,
	}
}
