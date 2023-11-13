const mongoose = require('mongoose')

const WalkthroughSchema = mongoose.Schema(
	{
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		numQuestions: {
			type: Number,
			default: 0,
		},
		numCorrectAnswers: {
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true }
)

const Walkthrough = mongoose.model('Walkthrough', WalkthroughSchema)

module.exports = Walkthrough
