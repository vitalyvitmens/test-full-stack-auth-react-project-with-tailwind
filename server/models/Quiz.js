const mongoose = require('mongoose')
const validator = require('validator')

const QuizSchema = mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		questions: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Question',
			},
		],
	},
	{ timestamps: true }
)

const Quiz = mongoose.model('Quiz', QuizSchema)

module.exports = Quiz
