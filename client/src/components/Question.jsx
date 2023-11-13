import { useState } from 'react'
import { Button } from '../components'

export const Question = ({
	title,
	answers,
	onNextClick,
	onPrevClick,
	first,
	last,
}) => {
	const [selectedAnswer, setSelectedAnswer] = useState({})

	const onSelect = (answer) => {
		setSelectedAnswer(answer)
	}

	return (
		<div className="flex flex-col mt-40 my-4 p-4 border border-amber-950 rounded-md">
			<h1 className="mb-4 text-3xl text-red-600">{title}</h1>
			<ul>
				{answers.map((answer) => (
					<li
						key={answer._id}
						onClick={() => onSelect(answer)}
						className={`my-2 py-2 px-4 hover:cursor-pointer border border-amber-950 rounded-md hover:bg-green-700 ${
							selectedAnswer === answer && 'bg-green-700'
						}`}
					>
						{answer.title}
					</li>
				))}
			</ul>

			<div className="mt-4 flex justify-between items-center">
				<Button disabled={first} title="Назад" onClick={onPrevClick} />
				<Button
					title={`${last ? 'Завершить' : 'Далее'}`}
					onClick={() => onNextClick(selectedAnswer, last)}
					disabled={!selectedAnswer}
				/>
			</div>
		</div>
	)
}
