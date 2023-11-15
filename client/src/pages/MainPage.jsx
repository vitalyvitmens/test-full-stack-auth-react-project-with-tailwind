import { useLayoutEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Loader } from '../components'
import { useDispatch, useSelector } from 'react-redux'
import Moment from 'react-moment'
import {
	deleteWalkthroughAsync,
	loadUsersAsync,
	loadWalkthroughsAsync,
	selectUsers,
	selectUserFirstName,
	selectWalkthroughs,
} from '../redux'

export const MainPage = () => {
	const [isLoading, setIsLoading] = useState(false)
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const walkthroughs = useSelector(selectWalkthroughs)
	const firstName = useSelector(selectUserFirstName)
	const user = useSelector(selectUsers)

	useLayoutEffect(() => {
		dispatch(loadWalkthroughsAsync())
		dispatch(loadUsersAsync())
		setIsLoading(false)
	}, [dispatch, isLoading])

	const onWalkthroughDelete = (id) => {
		dispatch(deleteWalkthroughAsync(id))
		setIsLoading(true)
	}

	if (!walkthroughs.length | !user.data) {
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
			<div className="grid grid-rows-2 grid-flow-col gap-3">
				{walkthroughs.map(({ _id, title, author, numQuestions, createdAt }) => (
					<ul key={_id}>
						<li className="flex flex-col p-2 justify-between border border-amber-950 rounded-md text-sm">
							<div className=" text-xl text-black">{title}</div>
							<div className="p-4 text-blue-800">{_id}</div>
							<div>Количество вопросов: {numQuestions}</div>
							<div className="flex flex-row">
								<div className="pr-1">Автор теста: </div>
								{user.data.map(({ id, lastName, firstName }) => (
									<div key={id}>
										{author === id && lastName} {author === id && firstName}
									</div>
								))}
							</div>
							<div className="flex flex-row text-xs pt-2 justify-between">
								Дата создания:
								<Moment date={createdAt} format="DD.MM.YYYYг. HH:mm" />
							</div>
							<div className="flex flex-col justify-center pt-5">
								<Button
									title="Открыть"
									bgColor="bg-green-800"
									fontSize="text-xl"
									onClick={() => navigate('/walkthroughs')}
								/>
								{firstName && (
									<>
										<Button
											title="Редактировать"
											bgColor="bg-blue-600"
											fontSize="text-xl"
											onClick={() => navigate('/edit')}
										/>
										<Button
											title="Удалить"
											fontSize="text-xl"
											onClick={() => onWalkthroughDelete(_id)}
										/>
									</>
								)}
							</div>
						</li>
					</ul>
				))}
			</div>
		</>
	)
}
