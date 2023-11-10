import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Question } from '../components'
import { FinishPage } from '../pages'
import { selectQuestions } from '../redux'

export const QuizPage = () => {
	const [score, setScore] = useState(0)
	const [currentQuestion, setCurrentQuestion] = useState(0)
	const [finished, setFinished] = useState(false)
	const questions = useSelector(selectQuestions)

	const onNextClick = async (answer, last) => {
		if (answer.correct) {
			setScore((prev) => prev + 1)
		}

		if (last) {
			return setFinished(true)
		}

		setCurrentQuestion(currentQuestion + 1)
	}

	const onPrevClick = () => {
		if (currentQuestion !== 0) {
			setCurrentQuestion(currentQuestion - 1)
			if (score !== 0) {
				setScore(score - 1)
			}
		}
	}

	const onRestart = () => {
		setScore(0)
		setCurrentQuestion(0)
		setFinished(false)
	}

	if (!questions.length) {
		return (
			<div className="flex-col">
				<i className="fa fa-refresh fa-spin fa-3x fa-fw mr-2 text-3xl" />
				<span>Loading...</span>
			</div>
		)
	}

	return finished ? (
		<FinishPage
			score={score}
			numberOfQuestions={questions.length}
			onRestart={onRestart}
		/>
	) : (
		<Question
			first={currentQuestion === 0}
			last={questions.length - 1 === currentQuestion}
			title={questions[currentQuestion].title}
			answers={questions[currentQuestion].answers}
			onNextClick={onNextClick}
			onPrevClick={onPrevClick}
		/>
	)
}
