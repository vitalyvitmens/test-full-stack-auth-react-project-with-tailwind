const mongoose = require('mongoose')

QuestionSchema = mongoose.Schema(
	{
    title: {
      type: String,
			required: true,
		},
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
		answers: {
			type: [{ title: String, correct: Boolean }],
			required: true,
		},
	},
	{ timestamps: true }
)

const Question = mongoose.model('Question', QuestionSchema)

module.exports = Question
