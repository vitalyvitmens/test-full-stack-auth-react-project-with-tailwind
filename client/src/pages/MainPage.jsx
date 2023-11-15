import { useLayoutEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Loader } from '../components'
import { useDispatch, useSelector } from 'react-redux'
import Moment from 'react-moment'
import { loadWalkthroughsAsync, selectWalkthroughs } from '../redux'

export const MainPage = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const walkthroughs = useSelector(selectWalkthroughs)

	useLayoutEffect(() => {
		dispatch(loadWalkthroughsAsync())
	}, [dispatch])

	if (!walkthroughs.length) {
		return <Loader />
	}

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
					{walkthroughs.map(
						({
							_id,
							title,
							author,
							numQuestions,
							numCorrectAnswers,
							createdAt,
						}) => (
							<ul className="w-[70%]" key={_id}>
								<li className="my-2 py-2 px-4 flex justify-between border border-amber-950 rounded-md">
									<div className="text-blue-800">
										<Moment date={createdAt} format="DD.MM.YYYYг. HH:mm" />
									</div>
									<div className="h-9 w-9">
										{numCorrectAnswers / numQuestions <= 0.3 && (
											<div className="bg-bad bg-cover h-[40px] w-[40px] bg-center"></div>
										)}
										{numCorrectAnswers / numQuestions > 0.3 &&
											numCorrectAnswers / numQuestions < 0.7 && (
												<div className="bg-norm bg-cover h-[40px] w-[40px] bg-center"></div>
											)}
										{numCorrectAnswers / numQuestions >= 0.7 && (
											<div className="bg-good bg-cover h-[40px] w-[40px] bg-center"></div>
										)}
									</div>
									<p className="text-blue-800">
										Верно {numCorrectAnswers} из {numQuestions}
									</p>
								</li>
							</ul>
						)
					)}
				</div>
			</div>
		</>
	)
}
