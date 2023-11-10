import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateQuestionAsync } from '../redux'
import { Button, Answer } from '../components'

export const EditField = ({
	id,
	title,
	answers,
	onDelete,
	onChange,
	canDeleteQuestion,
	isLoading,
	setIsLoading,
}) => {
	const [titleValue, setTitleValue] = useState(title)
	const [answersValue, setAnswersValue] = useState(answers)
	const dispatch = useDispatch()

	const onSave = () => {
		setIsLoading(true)

		const question = {
			title: titleValue,
			answers: answersValue,
		}

		dispatch(updateQuestionAsync(id, question)).then(() => {
			setIsLoading(false)
		})
	}

	const onTitleChange = ({ target }) => {
		setTitleValue(target.value)
	}

	const onAnswersChange = (oldAnswer, changedAnswer) => {
		const newAnswers = answersValue.map((answer) => {
			if (answer._id === oldAnswer._id) {
				return changedAnswer
			}
			return answer
		})
		setAnswersValue(newAnswers)
	}

	const onAnswerAdd = () => {
		const newAnswers = [
			...answersValue,
			{ title: 'Вариант ответа', correct: false },
		]

		const question = {
			title: titleValue,
			answers: newAnswers,
		}

		dispatch(updateQuestionAsync(id, question)).then(() => {
			onChange()
		})
	}

	const onAnswerDelete = (answerToDelete) => {
		const newAnswers = answersValue.filter(
			(answer) => answer._id !== answerToDelete._id
		)

		const question = {
			title: titleValue,
			answers: newAnswers,
		}

		dispatch(updateQuestionAsync(id, question)).then(() => {
			onChange()
		})
	}

	return (
		<li className="flex flex-col w-full p-4 mb-6 border border-red-800 rounded-md">
			<input
				id={id}
				type="text"
				value={titleValue}
				onChange={onTitleChange}
				className="mb-1 pt-3 pb-2 px-4 border border-amber-950 rounded-md text-2xl focus:border-red-800 focus:outline-none bg-red-300 hover:bg-red-400 active:shadow-none"
			></input>
			<div
				className="w-full flex flex-col shadow-lg shadow-slate-600/100 border border-blue-800 rounded-md items-center bg-slate-300 hover:bg-slate-400 hover:cursor-pointer active:shadow-none"
				onClick={onAnswerAdd}
			>
				<i
					className="fa fa-plus-square fa-3x text-blue-800 hover:cursor-pointer"
					disabled={isLoading}
				></i>
			</div>

			<ul>
				{answersValue.map((answer) => (
					<Answer
						key={answer._id}
						answer={answer}
						onAnswerChange={onAnswersChange}
						onAnswerDelete={onAnswerDelete}
						canDeleteAnswer={answersValue.length > 1}
					/>
				))}
				<div className="flex flex-col">
					<Button title="Сохранить" onClick={onSave} disabled={isLoading} />
					<Button
						title="Удалить вопрос"
						onClick={() => onDelete(id)}
						disabled={isLoading || !canDeleteQuestion}
					/>
				</div>
			</ul>
		</li>
	)
}
