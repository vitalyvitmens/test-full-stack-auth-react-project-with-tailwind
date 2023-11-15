import { useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Error, Loader } from '../components'
import {
	selectWalkthrough,
	selectUserFirstName,
	loadWalkthroughAsync,
} from '../redux'
import Moment from 'react-moment'
import { useMatch, useNavigate, useParams } from 'react-router-dom'

export const WalkthroughPage = ({ score, numQuestions, onRestart }) => {
	const [error, setError] = useState(null)
	const dispatch = useDispatch()
	const params = useParams()
	const [isLoading, setIsLoading] = useState(false)
	const isCreating = !!useMatch('/walkthroughs')
	const isEditing = !!useMatch('/walkthroughs/:id/edit')
	const walkthrough = useSelector(selectWalkthrough)

	const [titleValue, setTitleValue] = useState('Название теста 1')
	const navigate = useNavigate()
	const firstName = useSelector(selectUserFirstName)

	useLayoutEffect(() => {
		setIsLoading(true)

		dispatch(loadWalkthroughAsync(params.id)).then((walkthroughData) => {
			setError(walkthroughData.error)
			setIsLoading(false)
		})
	}, [dispatch, isLoading, params.id, isCreating])

	if (!walkthrough.length) {
		return <Loader />
	}

	const onTitleChange = ({ target }) => {
		setTitleValue(target.value)
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
				<div>Автор теста: Кузьминов Олег</div>
				<div>Дата создания: 05.02.2003</div>
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
			{!isLoading &&
				walkthrough.map(
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
			{error && <Error error={error} />}
		</div>
	)
}
