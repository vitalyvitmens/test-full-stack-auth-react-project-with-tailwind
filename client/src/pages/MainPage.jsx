import { useState, useLayoutEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components'
import { useDispatch } from 'react-redux'
import Moment from 'react-moment'
import { loadQuestionsAsync } from '../redux'

export const MainPage = () => {
	const [walkthroughs, setwalkthroughs] = useState([])
	const navigate = useNavigate()
	const dispatch = useDispatch()

	useLayoutEffect(() => {
		dispatch(loadQuestionsAsync())
		setwalkthroughs(
			localStorage.getItem('walkthroughs')
				? JSON.parse(localStorage.getItem('walkthroughs'))
				: []
		)
	}, [dispatch])

	return (
		<>
			<div className="flex mt-40 justify-center gap-20">
				<Button title="Запустить тест" onClick={() => navigate('/quiz')} />
				<Button title="Редактировать тест" onClick={() => navigate('/edit')} />
			</div>
			<h2 className="mt-2 mb-4 text-3xl text-center text-blue-800">
				История прохождений
			</h2>
			<div className="p-10 flex flex-col justify-between border border-amber-950 rounded-md">
				<div className="w-full flex flex-col items-center">
					<ul className="w-[70%]">
						{walkthroughs.map((walkthrough) => (
							<li
								key={walkthrough.date.toString()}
								className="my-2 py-2 px-4 flex justify-between border border-amber-950 rounded-md"
							>
								<div className="text-blue-800">
									<Moment date={walkthrough.date} format="DD.MM.YYYYг. HH:mm" />
								</div>
								<div className="h-9 w-9">
									{walkthrough.numCorrectAnswers / walkthrough.numQuestions <=
										0.3 && (
										<div className="bg-bad bg-cover h-[40px] w-[40px] bg-center"></div>
									)}
									{walkthrough.numCorrectAnswers / walkthrough.numQuestions >
										0.3 &&
										walkthrough.numCorrectAnswers / walkthrough.numQuestions <
											0.7 && (
											<div className="bg-norm bg-cover h-[40px] w-[40px] bg-center"></div>
										)}
									{walkthrough.numCorrectAnswers / walkthrough.numQuestions >=
										0.7 && (
										<div className="bg-good bg-cover h-[40px] w-[40px] bg-center"></div>
									)}
								</div>
								<p className="text-blue-800">
									Верно {walkthrough.numCorrectAnswers} из{' '}
									{walkthrough.numQuestions}
								</p>
							</li>
						))}
					</ul>
				</div>
			</div>
		</>
	)
}
