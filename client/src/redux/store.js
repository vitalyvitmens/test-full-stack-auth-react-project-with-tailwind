import {
	legacy_createStore as createStore,
	combineReducers,
	applyMiddleware,
	compose,
} from 'redux'
import thunk from 'redux-thunk'
import {
	appReducer,
	userReducer,
	usersReducer,
	postReducer,
	postsReducer,
	questionReducer,
	walkthroughReducer,
	quizReducer,
	quizsReducer,
} from './'

const reducer = combineReducers({
	app: appReducer,
	user: userReducer,
	users: usersReducer,
	post: postReducer,
	posts: postsReducer,
	question: questionReducer,
	walkthrough: walkthroughReducer,
	quiz: quizReducer,
	quizs: quizsReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(
	reducer,
	composeEnhancers(applyMiddleware(thunk))
)
