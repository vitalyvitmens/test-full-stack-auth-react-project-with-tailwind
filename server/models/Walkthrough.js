const mongoose = require('mongoose')

const WalkthroughSchema = mongoose.Schema({
	walkhroughs: {
		type: [
			{
				title: {
					type: String,
					required: true,
				},
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
			{ timestamps: true },
		],
		required: true,
	},
})

const Walkthrough = mongoose.model('Walkthrough', WalkthroughSchema)

module.exports = Walkthrough
