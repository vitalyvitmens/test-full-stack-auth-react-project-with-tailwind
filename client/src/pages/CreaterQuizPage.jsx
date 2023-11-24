import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, EditQuizField, Loader } from '../components'
import {
	addQuizAsync,
	deleteQuizAsync,
	loadQuestionsAsync,
	saveQuizAsync,
} from '../redux'

export const CreaterQuizPage = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [isLoading, setIsLoading] = useState(false)
	const quiz = useSelector((state) => state.quiz)
	const questions = useSelector((state) => state.quiz.questions)

	const onQuizAdd = () => {
		setIsLoading(true)

		const newQuiz = {
			title: 'Название нового теста',
			questions: [
				{
					title: 'Новый вопрос',
					answers: [
						{ title: 'Ответ 1', correct: true },
						{ title: 'Ответ 2', correct: false },
						{ title: 'Ответ 3', correct: false },
						{ title: 'Ответ 4', correct: false },
					],
				},
			],
		}

		dispatch(addQuizAsync(newQuiz)).then(() => {
			dispatch(loadQuestionsAsync()).then(() => {
				setIsLoading(false)
			})
		})
	}

	const onQuizChange = () => {
		setIsLoading(true)
		dispatch(loadQuestionsAsync()).then(() => {
			setIsLoading(false)
		})
	}

	const onQuizDelete = (id) => {
		dispatch(deleteQuizAsync(id))
	}

	const onSave = () => {
		setIsLoading(true)

		// const question = {
		// 	title: titleValue,
		// 	answers: answersValue,
		// }
		// const newQuiz = {
		// 	title: titleValue,
		// 	answers: answersValue,
		// }

		// dispatch(saveQuizAsync(id, newQuiz))
		dispatch(saveQuizAsync())
		setIsLoading(false)
	}

	if (!questions.length) {
		return <Loader />
	}

	return (
		<div className="h-full w-[80%]  mt-40">
			<div className="flex justify-between pb-5">
				<Button
					title="Добавить новый тест"
					onClick={onQuizAdd}
					disabled={isLoading}
				/>
				{/* <Button
					title="Сохранить QUIZ"
					// onClick={onSave}
					disabled={isLoading}
				/>
				<Button title="Назад" onClick={() => navigate('/')} /> */}
			</div>
			<ul className="w-full flex flex-col items-center">
				{!isLoading &&
					quiz.questions.map((question) => (
						<EditQuizField
							key={quiz._id}
							id={quiz._id}
							title={quiz.title}
							questions={quiz.questions}
							onDelete={onQuizDelete}
							onChange={onQuizChange}
							canDeleteQuiz={questions.length > 1}
							isLoading={isLoading}
							setIsLoading={setIsLoading}
						/>
					))}
			</ul>
			<div className="flex justify-between">
				<Button
					title="Добавить новый тест"
					onClick={onQuizAdd}
					disabled={isLoading}
				/>
				<Button title="Сохранить QUIZ" onClick={onSave} disabled={isLoading} />
				<Button title="Назад" onClick={() => navigate('/')} />
			</div>
		</div>
	)
}
