const Walkthrough = require('../models/Walkthrough')
const Quiz = require('../models/Quiz')

// get
function getWalkthrough() {
	return Quiz.walkthroughs.find()
}

// add
async function addWalkthrough(quizId, walkthrough) {
	const newWalkthrough = await Walkthrough.create(walkthrough)

	await Quiz.findByIdAndUpdate(quizId, {
		$push: { walkthroughs: newWalkthrough },
	})

	await newWalkthrough.populate('author')

	return newWalkthrough
}

// delete
async function deleteWalkthrough(quizId, walkthroughId) {
	await Walkthrough.deleteOne({ _id: walkthroughId })
	await Quiz.findByIdAndUpdate(quizId, {
		$pull: { walkthroughs: walkthroughId },
	})
}

module.exports = {
	getWalkthrough,
	addWalkthrough,
	deleteWalkthrough,
}
