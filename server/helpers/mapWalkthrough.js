module.exports = function (walkthrough) {
	return {
		id: walkthrough.id,
		title: walkthrough?.title,
		author: walkthrough?.author?.firstName,
		numQuestions: walkthrough.numQuestions,
		numCorrectAnswers: walkthrough.numCorrectAnswers,
		publishedAt: walkthrough.createdAt,
	}
}
