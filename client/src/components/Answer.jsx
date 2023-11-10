import { useState } from 'react'

export const Answer = ({ answer, onAnswerChange, onAnswerDelete }) => {
	const [answerValue, setAnswerValue] = useState(answer)
	const [correct, setCorrect] = useState(answer.correct)

	const onChange = ({ target }) => {
		const newAnswer = { ...answerValue, title: target.value }
		onAnswerChange(answer, newAnswer)
		setAnswerValue(newAnswer)
	}

	const onCorrectChange = () => {
		const newAnswer = { ...answerValue, correct: !correct }
		onAnswerChange(answer, newAnswer)
		setCorrect((prev) => !prev)
	}

	return (
		<div className="pt-1 flex justify-between">
			<li className="px-4 pt-6 flex-auto border border-amber-950 rounded-md bg-green-200 hover:bg-green-300">
				<input
					id={answerValue._id}
					type="text"
					value={answerValue.title}
					onChange={onChange}
					className="focus:outline-none  bg-inherit"
				></input>
			</li>
			<div className="px-2">
				<div>
					{correct ? (
						<i
							className="fa fa-check-circle-o fa-2x text-green-800 hover:cursor-pointer"
							onClick={() => onCorrectChange()}
						></i>
					) : (
						<i
							className="fa fa-circle-o fa-2x text-green-800 hover:cursor-pointer"
							onClick={() => onCorrectChange()}
						></i>
					)}
				</div>
				<div>
					<i
						className="fa fa-trash-o fa-2x text-red-600 hover:cursor-pointer"
						onClick={() => onAnswerDelete(answer)}
					></i>
				</div>
			</div>
		</div>
	)
}
