module.exports = function (walkthrough) {
	return {
		id: walkthrough._id,
		author: walkthrough?.author?.firstName,
		numQuestions: walkthrough.numQuestions,
		numCorrectAnswers: walkthrough.numCorrectAnswers,
		publishedAt: walkthrough.createdAt,
	}
}
