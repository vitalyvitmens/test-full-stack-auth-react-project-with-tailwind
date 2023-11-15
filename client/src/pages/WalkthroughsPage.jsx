import { useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Loader } from '../components'
import {
	addWalkthroughAsync,
	loadWalkthroughsAsync,
	deleteWalkthroughAsync,
	selectWalkthroughs,
	selectUserId,
} from '../redux'
import Moment from 'react-moment'

export const WalkthroughsPage = ({ score, numQuestions, onRestart }) => {
	const [isLoading, setIsLoading] = useState(false)
	const dispatch = useDispatch()
	const userId = useSelector(selectUserId)
	const walkthroughs = useSelector(selectWalkthroughs)

	useLayoutEffect(() => {
		setIsLoading(true)

		// dispatch(loadWalkthroughsAsync())

		// const newWalkthrough = {
		// 	title: 'TITLE',
		// 	author: userId,
		// 	numQuestions,
		// 	numCorrectAnswers: score,
		// }

		// dispatch(addWalkthroughAsync(newWalkthrough)).then(() => {
		dispatch(loadWalkthroughsAsync()).then(() => {
			setIsLoading(false)
		})
		// })
	}, [dispatch, numQuestions, score, userId])

	if (!walkthroughs.length) {
		return <Loader />
	}

	return (
		<div className="h-full w-[80%]  mt-40">
			<div className="flex flex-col text-base">
				<div className="text-2xl py-1">Название теста 1</div>
				<div>Количество вопросов: 10</div>
				<div>Автор теста: Кузьминов Олег</div>
				<div>Дата создания: 05.02.2003</div>
			</div>
			<div className="py-5">
				<Button
					title="Запустить тест"
					bgColor="bg-blue-600"
					fontSize="text-xl"
				/>
			</div>

			<h2 className="text-3xl text-center text-blue-800">
				История прохождений
			</h2>
			{!isLoading &&
				walkthroughs.map(
					({
						_id,
						title,
						author,
						numQuestions,
						numCorrectAnswers,
						createdAt,
					}) => (
						<ul className="w-full flex flex-col items-center" key={_id}>
							<li className="flex flex-row p-1">
								<div className="flex flex-row border w-[700px]  border-black rounded-md px-4 py-2 justify-between">
									<div className="flex flex-col px-4 py-2 text-xl">
										{title}
										<div className="text-base">Автор теста: {author}</div>
										<Moment
											className="text-xs"
											date={createdAt}
											format="DD.MM.YYYYг. HH:mm"
										/>
									</div>
									{numCorrectAnswers / numQuestions <= 0.3 && (
										<div className="bg-bad bg-cover h-[80px] w-[80px] bg-center"></div>
									)}
									{numCorrectAnswers / numQuestions > 0.3 &&
										numCorrectAnswers / numQuestions < 0.7 && (
											<div className="bg-norm bg-cover h-[80px] w-[80px] bg-center"></div>
										)}
									{numCorrectAnswers / numQuestions >= 0.7 && (
										<div className="bg-good bg-cover h-[80px] w-[80px] bg-center"></div>
									)}
									<div className="flex flex-col justify-center text-xl">
										Верно: {numCorrectAnswers} из {numQuestions}
									</div>
								</div>
							</li>
						</ul>
					)
				)}
		</div>
	)
}
