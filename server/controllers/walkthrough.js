const Walkthrough = require('../models/Walkthrough')

// get
const getWalkthrough = async () => {
	const walkhroughs = await Walkthrough.find()
	return walkhroughs
}

// add
const addWalkthrough = async (walkthrough) => {
	await Walkthrough.create(walkthrough)
}

// edit
const editWalkthrough = async (id, updatedWalkthrough) => {
	await Walkthrough.updateOne({ _id: id }, updatedWalkthrough)
}

// delete
const deleteWalkthrough = async (id) => {
	await Walkthrough.deleteOne({ _id: id })
}

module.exports = {
	getWalkthrough,
	addWalkthrough,
	editWalkthrough,
	deleteWalkthrough,
}

// const Walkthrough = require('../models/Walkthrough')
// const Quiz = require('../models/Quiz')

// // get
// function getWalkthrough() {
// 	return Quiz.walkthroughs.find()
// }

// // add
// async function addWalkthrough(quizId, walkthrough) {
// 	const newWalkthrough = await Walkthrough.create(walkthrough)

// 	await Quiz.findByIdAndUpdate(quizId, {
// 		$push: { walkthroughs: newWalkthrough },
// 	})

// 	await newWalkthrough.populate('author')

// 	return newWalkthrough
// }

// // delete
// async function deleteWalkthrough(quizId, walkthroughId) {
// 	await Walkthrough.deleteOne({ _id: walkthroughId })
// 	await Quiz.findByIdAndUpdate(quizId, {
// 		$pull: { walkthroughs: walkthroughId },
// 	})
// }

// module.exports = {
// 	getWalkthrough,
// 	addWalkthrough,
// 	deleteWalkthrough,
// }
