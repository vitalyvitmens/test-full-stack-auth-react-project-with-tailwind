import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, EditField, Loader } from '../components'
import {
	addQuestionAsync,
	loadQuestionsAsync,
	deleteQuestionAsync,
	selectQuestions,
} from '../redux'

export const EditPage = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [isLoading, setIsLoading] = useState(false)
	const questions = useSelector(selectQuestions)

	const onQuestionAdd = () => {
		setIsLoading(true)

		const newQuestion = {
			title: 'Новый вопрос',
			answers: [
				{ title: 'Ответ 1', correct: true },
				{ title: 'Ответ 2', correct: false },
				{ title: 'Ответ 3', correct: false },
				{ title: 'Ответ 4', correct: false },
			],
		}

		dispatch(addQuestionAsync(newQuestion)).then(() => {
			dispatch(loadQuestionsAsync()).then(() => {
				setIsLoading(false)
			})
		})
	}

	const onQuestionChange = () => {
		setIsLoading(true)
		dispatch(loadQuestionsAsync()).then(() => {
			setIsLoading(false)
		})
	}

	const onQuestionDelete = (id) => {
		dispatch(deleteQuestionAsync(id))
	}

	if (!questions.length) {
		return <Loader />
	}

	return (
		<div className="h-full w-[80%]  mt-40">
			<div className="flex justify-between pb-5">
				<Button
					title="Добавить вопрос"
					onClick={onQuestionAdd}
					disabled={isLoading}
				/>
				<Button title="Назад" onClick={() => navigate('/')} />
			</div>
			<ul className="w-full flex flex-col items-center">
				{!isLoading &&
					questions.map((question) => (
						<EditField
							key={question._id}
							id={question._id}
							title={question.title}
							answers={question.answers}
							onDelete={onQuestionDelete}
							onChange={onQuestionChange}
							canDeleteQuestion={questions.length > 1}
							isLoading={isLoading}
							setIsLoading={setIsLoading}
						/>
					))}
			</ul>
			<div className="flex justify-between">
				<Button
					title="Добавить вопрос"
					onClick={onQuestionAdd}
					disabled={isLoading}
				/>
				<Button title="Назад" onClick={() => navigate('/')} />
			</div>
		</div>
	)
}
