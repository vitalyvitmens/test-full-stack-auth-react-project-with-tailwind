import { useNavigate } from 'react-router-dom'
import { Button } from '../components'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectUserId } from '../redux'

export const FinishPage = ({ score, numQuestions, onRestart }) => {
	const navigate = useNavigate()
	const userId = useSelector(selectUserId)

	useEffect(() => {
		const data = {
			date: new Date(),
			author: userId,
			numQuestions,
			numCorrectAnswers: score,
		}
		const walkthroughs = localStorage.getItem('walkthroughs')
			? JSON.parse(localStorage.getItem('walkthroughs'))
			: []

		walkthroughs.push(data)
		localStorage.setItem('walkthroughs', JSON.stringify(walkthroughs))
	}, [numQuestions, score, userId])

	return (
		<div className="flex flex-col justify-center items-center">
			<h1 className="mb-4 text-3xl">Тест завершён</h1>
			<p className="text-xl mb-8">
				Правильных ответов: <span className="text-red-700">{score}</span>
			</p>
			{score / numQuestions <= 0.3 && (
				<div className="bg-bad h-[200px] w-[200px] bg-center"></div>
			)}
			{score / numQuestions > 0.3 && score / numQuestions < 0.7 && (
				<div className="bg-norm h-[200px] w-[200px] bg-center"></div>
			)}
			{score / numQuestions >= 0.7 && (
				<div className="bg-good h-[200px] w-[200px] bg-center"></div>
			)}

			<div className="flex gap-20 mt-8">
				<Button title="На главную" onClick={() => navigate('/')} />
				<Button title="Пройти ещё раз" onClick={onRestart} />
			</div>
		</div>
	)
}
