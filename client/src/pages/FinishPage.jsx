import { useNavigate } from 'react-router-dom'
import { Button } from '../components'
import { useEffect } from 'react'

export const FinishPage = ({ score, numberOfQuestions, onRestart }) => {
	const navigate = useNavigate()

	useEffect(() => {
		const data = {
			date: new Date(),
			numberOfQuestions,
			numberOfCorrectAnswers: score,
		}
		const walkthroughs = localStorage.getItem('walkthroughs')
			? JSON.parse(localStorage.getItem('walkthroughs'))
			: []

		walkthroughs.push(data)
		localStorage.setItem('walkthroughs', JSON.stringify(walkthroughs))
	}, [numberOfQuestions, score])

	return (
		<div className="flex flex-col justify-center items-center">
			<h1 className="mb-4 text-3xl">Тест завершён</h1>
			<p className="text-xl mb-8">
				Правильных ответов: <span className="text-red-700">{score}</span>
			</p>
			{score / numberOfQuestions <= 0.3 && (
				<img
					className="bad pb-10"
					src="https://github.com/vitalyvitmens/matyga_quiz/blob/main/assets/images/bad.png?raw=true"
					alt="bad.png"
				/>
			)}
			{score / numberOfQuestions > 0.3 && score / numberOfQuestions < 0.7 && (
				<img
					className="norm pb-10"
					src="https://github.com/vitalyvitmens/matyga_quiz/blob/main/assets/images/norm.png?raw=true"
					alt="norm.png"
				/>
			)}
			{score / numberOfQuestions >= 0.7 && (
				<img
					className="good pb-10"
					src="https://github.com/vitalyvitmens/matyga_quiz/blob/main/assets/images/good.png?raw=true"
					alt="good.png"
				/>
			)}

			<div className="flex gap-20">
				<Button title="На главную" onClick={() => navigate('/')} />
				<Button title="Пройти ещё раз" onClick={onRestart} />
			</div>
		</div>
	)
}
