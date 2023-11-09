module.exports = function (question) {
	return {
		id: question.id,
		title: question.title,
		answers: [
			{
				title: question.answers.title,
				correct: question.answers.correct,
			},
		],
		publishedAt: question.createdAt,
	}
}
