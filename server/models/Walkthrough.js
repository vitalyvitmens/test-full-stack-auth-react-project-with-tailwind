const mongoose = require('mongoose')

const WalkthroughSchema = mongoose.Schema(
	{
		title: { type: String, required: true },
		author: { type: String, required: true },
		numQuestions: { type: Number, default: 0 },
		numCorrectAnswers: { type: Number, default: 0 },
	},
	{ timestamps: true }
)

const Walkthrough = mongoose.model('Walkthrough', WalkthroughSchema)

module.exports = Walkthrough

// const mongoose = require('mongoose')

// const WalkthroughSchema = mongoose.Schema(
// 	{
// 		title: {
// 			type: String,
// 			required: true,
// 		},
// 		walkhroughs: {
// 			type: [
// 				{
// 					title: { type: String },
// 					author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
// 					numQuestions: { type: Number, default: 0 },
// 					numCorrectAnswers: { type: Number, default: 0 },
// 				},
// 				{ timestamps: true },
// 			],
// 			required: true,
// 		},
// 	},
// 	{ timestamps: true }
// )

// const Walkthrough = mongoose.model('Walkthrough', WalkthroughSchema)

// module.exports = Walkthrough
