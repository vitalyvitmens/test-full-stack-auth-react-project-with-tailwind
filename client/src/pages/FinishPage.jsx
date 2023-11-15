import { useNavigate } from 'react-router-dom'
import { Button } from '../components'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addWalkthroughAsync, selectUserId } from '../redux'
import { toast } from 'react-toastify'

export const FinishPage = ({ score, numQuestions, onRestart, title }) => {
	const navigate = useNavigate()
	const userId = useSelector(selectUserId)
	const dispatch = useDispatch()

	useEffect(() => {
		const newWalkthrough = {
			title: 'MY TEST',
			author: userId,
			numQuestions,
			numCorrectAnswers: score,
		}

		dispatch(addWalkthroughAsync(newWalkthrough))
		toast(`Вы обновили walkthroughs в moongoDB`)
	}, [dispatch, numQuestions, score, title, userId])

	return (
		<div className="flex flex-col mt-40 justify-center items-center">
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
