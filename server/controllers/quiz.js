const Quiz = require('../models/Quiz')

// get item
async function getQuiz(id) {
	const quiz = await Quiz.findById(id).populate({
		path: 'questions',
		populate: 'author',
	})

	return quiz
}

// add
async function addQuiz(quiz) {
	const newQuiz = await Quiz.create(quiz)

	await newQuiz.populate({
		path: 'questions',
		populate: 'author',
	})

	return newQuiz
}

// edit
async function editQuiz(id, quiz) {
	const newQuiz = await Quiz.findByIdAndUpdate(id, quiz, {
		returnDocument: 'after',
	})

	await newQuiz.populate({
		path: 'questions',
		populate: 'author',
	})

	return newQuiz
}

// delete
function deleteQuiz(id) {
	return Quiz.deleteOne({ _id: id })
}

// get list with search and pagination
// async function getQuizs(search = '', limit = 9, page = 1) {
// 	const [quizs, count] = await Promise.all([
// 		Quiz.find({ title: { $regex: search, $options: 'i' } })
// 			.limit(limit)
// 			.skip((page - 1) * limit)
// 			.sort({ createdAt: -1 }),
// 			// .sort({ views: -1 }),
// 		Quiz.countDocuments({ title: { $regex: search, $options: 'i' } }),
// 	])

// 	return {
// 		quizs,
// 		lastPage: Math.ceil(count / limit),
// 	}
// }

module.exports = {
	addQuiz,
	editQuiz,
	deleteQuiz,
	// getQuizs,
	getQuiz,
}
