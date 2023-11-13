const mongoose = require('mongoose')
const mapWalkthrough = require('./mapWalkthrough')

module.exports = function (quiz) {
	return {
		id: quiz.id,
		title: quiz.title,
		walkthroughs: quiz.walkthroughs.map((walkthrough) =>
			mongoose.isObjectIdOrHexString(walkthrough)
				? walkthrough
				: mapWalkthrough(walkthrough)
		),
		publishedAt: quiz.createdAt,
	}
}
