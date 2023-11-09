import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Moment from 'react-moment'
import { Button } from '../components'

export const MainPage = () => {
	const [walkthroughs, setwalkthroughs] = useState([])
	const navigate = useNavigate()

	useEffect(() => {
		setwalkthroughs(
			localStorage.getItem('walkthroughs')
				? JSON.parse(localStorage.getItem('walkthroughs'))
				: []
		)
	}, [])

	return (
		<>
			<div className="w-full flex justify-center gap-20">
				<Button title="Запустить тест" onClick={() => navigate('/quiz')} />
				<Button title="Редактировать тест" onClick={() => navigate('/edit')} />
			</div>
			<h2 className="mt-8 mb-4 text-3xl text-blue-800">История прохождений</h2>
			<div className="p-10 w-full flex flex-col justify-center items-center  border border-amber-950 rounded-md">
				<div className="w-full flex flex-col items-center">
					<ul className="w-[70%]">
						{walkthroughs.map((walkthrough) => (
							<li
								key={walkthrough.date.toString()}
								className="my-2 py-2 px-4 flex justify-between border border-amber-950 rounded-md"
							>
								<div className="text-blue-800">
									<Moment date={walkthrough.date} format="DD-MM-YYYY HH:mm" />
								</div>
								<div className="h-9 w-9">
									{walkthrough.numberOfCorrectAnswers <= 3 && (
										<img
											className="bad rounded-md border border-amber-950"
											src="https://github.com/vitalyvitmens/matyga_quiz/blob/main/assets/images/bad.png?raw=true"
											alt="bad.png"
										/>
									)}
									{walkthrough.numberOfCorrectAnswers > 3 &&
										walkthrough.numberOfCorrectAnswers < 7 && (
											<img
												className="norm rounded-md border border-amber-950"
												src="https://github.com/vitalyvitmens/matyga_quiz/blob/main/assets/images/norm.png?raw=true"
												alt="norm.png"
											/>
										)}
									{walkthrough.numberOfCorrectAnswers >= 7 && (
										<img
											className="good rounded-md border border-amber-950"
											src="https://github.com/vitalyvitmens/matyga_quiz/blob/main/assets/images/good.png?raw=true"
											alt="good.png"
										/>
									)}
								</div>
								<p className="text-blue-800">
									Верно {walkthrough.numberOfCorrectAnswers} из{' '}
									{walkthrough.numberOfQuestions}
								</p>
							</li>
						))}
					</ul>
				</div>
			</div>
		</>
	)
}
