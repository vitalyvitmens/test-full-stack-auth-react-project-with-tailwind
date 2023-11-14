import { useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Loader } from '../components'
import {
	addWalkthroughAsync,
	loadWalkthroughsAsync,
	deleteWalkthroughAsync,
	selectWalkthroughs,
	selectUserId,
} from '../redux'

export const WalkthroughsPage = ({ score, numQuestions, onRestart }) => {
	const [isLoading, setIsLoading] = useState(false)
	const dispatch = useDispatch()
	const userId = useSelector(selectUserId)
	const walkthroughs = useSelector(selectWalkthroughs)

	useLayoutEffect(() => {
		setIsLoading(true)

		dispatch(loadWalkthroughsAsync())

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
			<ul className="w-full flex flex-col items-center">
				{!isLoading &&
					walkthroughs.map(
						({ _id, title, author, numQuestions, numCorrectAnswers }) => (
							<li key={_id}>
								{_id}
								{' - '}
								{title}
								{' - '}
								{author}
								{' - '}
								{numQuestions}
								{' - '}
								{numCorrectAnswers}
							</li>
						)
					)}
			</ul>
		</div>
	)
}
