const mongoose = require('mongoose')
const validator = require('validator')

const QuizSchema = mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		walkthroughs: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Walkthrough',
			},
		],
	},
	{ timestamps: true }
)

const Quiz = mongoose.model('Quiz', QuizSchema)

module.exports = Quiz
