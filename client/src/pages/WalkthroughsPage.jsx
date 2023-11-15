import { useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Loader } from '../components'
import {
	loadWalkthroughsAsync,
	selectWalkthroughs,
	selectUserFirstName,
	selectUserLastName,
	selectUsers,
	loadUsersAsync,
} from '../redux'
import Moment from 'react-moment'
import { useNavigate } from 'react-router-dom'

export const WalkthroughsPage = ({ score, numQuestions, onRestart }) => {
	const [isLoading, setIsLoading] = useState(false)
	const [titleValue, setTitleValue] = useState('Название теста 1')
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const firstName = useSelector(selectUserFirstName)
	const lastName = useSelector(selectUserLastName)
	const walkthroughs = useSelector(selectWalkthroughs)
	const user = useSelector(selectUsers)

	useLayoutEffect(() => {
		setIsLoading(true)

		dispatch(loadWalkthroughsAsync())
		dispatch(loadUsersAsync())
		setIsLoading(false)
	}, [dispatch, numQuestions, score])

	if (!walkthroughs.length) {
		return <Loader />
	}

	const onTitleChange = ({ target }) => {
		setTitleValue(target.value)
	}

	if (!walkthroughs.length | !user.data) {
		return <Loader />
	}

	return (
		<div className="h-full w-[80%]  mt-40">
			<div className="flex flex-col text-base">
				<div className="text-2xl py-1">
					{' '}
					<input
						type="text"
						value={titleValue}
						onChange={onTitleChange}
						className="mb-1 pt-3 pb-2 px-4 border border-amber-950 rounded-md text-2xl focus:border-red-800 focus:outline-none bg-red-300 hover:bg-red-400 active:shadow-none"
					></input>
				</div>
				<div>Количество вопросов: 10</div>
				<div>
					Автор теста: {lastName} {firstName}
				</div>
				<div>
					Дата создания:{' '}
					<Moment date={Date.now()} format="DD.MM.YYYYг. HH:mm" />
				</div>
			</div>
			<div className="py-5">
				<Button
					title="Запустить тест"
					bgColor="bg-blue-600"
					fontSize="text-xl"
					disabled={!firstName}
					onClick={() => navigate('/quiz')}
				/>
			</div>

			<h2 className="text-3xl text-center text-blue-800">
				История прохождений
			</h2>
			{walkthroughs.map(
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
									<div className="pr-1 text-lg">Автор теста: </div>
									{user.data.map(({ id, lastName, firstName }) => (
										<div key={id} className="flex flex-row text-lg">
											{author === id && lastName} {author === id && firstName}
										</div>
									))}
									<Moment
										className="text-xs"
										date={createdAt}
										format="DD.MM.YYYYг. HH:mm"
									/>
								</div>
								{numCorrectAnswers / numQuestions <= 0.3 && (
									<div className="bg-bad bg-cover h-[120px] w-[120px] bg-center"></div>
								)}
								{numCorrectAnswers / numQuestions > 0.3 &&
									numCorrectAnswers / numQuestions < 0.7 && (
										<div className="bg-norm bg-cover h-[120px] w-[120px] bg-center"></div>
									)}
								{numCorrectAnswers / numQuestions >= 0.7 && (
									<div className="bg-good bg-cover h-[120px] w-[120px] bg-center"></div>
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
