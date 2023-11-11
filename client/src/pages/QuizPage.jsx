import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Loader, Question } from '../components'
import { FinishPage } from '../pages'
import { loadQuestionsAsync, selectQuestions } from '../redux'
import { useLayoutEffect } from 'react'

export const QuizPage = () => {
	const [score, setScore] = useState(0)
	const [currentQuestion, setCurrentQuestion] = useState(0)
	const [finished, setFinished] = useState(false)
	const questions = useSelector(selectQuestions)
	const dispatch = useDispatch()

	useLayoutEffect(() => {
		dispatch(loadQuestionsAsync())
	}, [dispatch])

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
		return <Loader />
	}

	return finished ? (
		<FinishPage
			score={score}
			numQuestions={questions.length}
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
