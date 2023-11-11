require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const {
	register,
	login,
	getUsers,
	getRoles,
	updateUser,
	deleteUser,
} = require('./controllers/user')
const {
	getPost,
	getPosts,
	addPost,
	editPost,
	deletePost,
} = require('./controllers/post')
const {
	getQuestions,
	addQuestion,
	deleteQuestion,
	editQuestion,
} = require('./controllers/question')
const mapUser = require('./helpers/mapUser')
const authenticated = require('./middlewares/authenticated')
const hasRole = require('./middlewares/hasRole')
const ROLES = require('./constants/roles')
const mapPost = require('./helpers/mapPost')
const { addComment, deleteComment } = require('./controllers/comment')
const mapComment = require('./helpers/mapComment')
const mapQuestion = require('./helpers/mapQuestion')

const PORT = process.env.PORT || 3001
const app = express()

app.use(express.static('../frontend/build'))

app.use(cookieParser())
app.use(express.json())

app.post('/register', async (req, res) => {
	try {
		const { user, token } = await register(req.body.firstName, req.body.lastName, req.body.email, req.body.password)

		res
			.cookie('token', token, { httpOnly: true })
			.send({ error: null, user: mapUser(user) })
	} catch (e) {
		res.send({ error: e.message || 'Unknown error' })
	}
})

app.post('/login', async (req, res) => {
	try {
		const { user, token } = await login(req.body.email, req.body.password)

		res
			.cookie('token', token, { httpOnly: true })
			.send({ error: null, user: mapUser(user) })
	} catch (e) {
		res.send({ error: e.message || 'Unknown error' })
	}
})

app.post('/logout', (req, res) => {
	try {
		res.cookie('token', '', { httpOnly: true }).send({})
	} catch (error) {
		res.send({ error: e.message || 'Unknown error' })
	}
})

app.get('/posts', async (req, res) => {
	const { posts, lastPage } = await getPosts(
		req.query.search,
		req.query.limit,
		req.query.page
	)

	res.send({ data: { lastPage, posts: posts.map(mapPost) } })
})

app.get('/posts/:id', async (req, res) => {
	const post = await getPost(req.params.id)

	res.send({ data: mapPost(post) })
})

app.use(authenticated)

app.post('/posts/:id/comments', async (req, res) => {
	try {
		const newComment = await addComment(req.params.id, {
			content: req.body.content,
			author: req.user.id,
		})

		res.send({ data: mapComment(newComment) })
	} catch (error) {
		console.error('Something went wrong!', error)
	}
})

app.delete(
	'/posts/:postId/comments/:commentId',
	hasRole([ROLES.ADMIN, ROLES.MODERATOR]),
	async (req, res) => {
		await deleteComment(req.params.postId, req.params.commentId)

		res.send({ error: null })
	}
)

app.post('/posts', hasRole([ROLES.ADMIN]), async (req, res) => {
	try {
		const newPost = await addPost({
			title: req.body.title,
			content: req.body.content,
			image: req.body.imageUrl,
		})

		res.send({ data: mapPost(newPost) })
	} catch (error) {
		console.error('Something went wrong!', error)
	}
})

app.patch('/posts/:id', hasRole([ROLES.ADMIN]), async (req, res) => {
	try {
		const updatedPost = await editPost(req.params.id, {
			title: req.body.title,
			content: req.body.content,
			image: req.body.imageUrl,
		})

		res.send({ data: mapPost(updatedPost) })
	} catch (error) {
		console.error('Something went wrong!', error)
	}
})

app.delete('/posts/:id', hasRole([ROLES.ADMIN]), async (req, res) => {
	await deletePost(req.params.id)

	res.send({ error: null })
})

app.get('/users', hasRole([ROLES.ADMIN]), async (req, res) => {
	const users = await getUsers()

	res.send({ data: users.map(mapUser) })
})

app.get('/users/roles', hasRole([ROLES.ADMIN]), async (req, res) => {
	const roles = getRoles()

	res.send({ data: roles })
})

app.patch('/users/:id', hasRole([ROLES.ADMIN]), async (req, res) => {
	try {
		const newUser = await updateUser(req.params.id, {
			role: req.body.roleId,
		})

		res.send({ data: mapUser(newUser) })
	} catch (error) {
		console.error('Something went wrong!', error)
	}
})

app.delete('/users/:id', hasRole([ROLES.ADMIN]), async (req, res) => {
	await deleteUser(req.params.id)

	res.send({ error: null })
})

app.get('/questions', async (req, res) => {
	const questions = await getQuestions()

	res.json(questions)
	// res.send({ data: mapQuestion(questions) })
})

app.post('/questions', async (req, res) => {
	try {
		const newQuestion = await addQuestion(req.body)

		res.send(newQuestion)
		// res.send({ data: mapQuestion(newQuestion) })
	} catch (error) {
		console.error('Something went wrong!', error)
	}
})

app.put('/questions/:id', async (req, res) => {
	try {
		// const updatedQuestion = await editQuestion(req.params.id, req.body)
		await editQuestion(req.params.id, req.body)

		res.json({
			_id: req.params.id,
			...req.body,
		})
		// res.send({ data: mapQuestion(updatedQuestion) })
	} catch (error) {
		console.error('Something went wrong!', error)
	}
})

app.delete('/questions/:id', async (req, res) => {
	await deleteQuestion(req.params.id)

	res.json(req.params.id)
	// res.send({ error: null })
})

mongoose.connect(process.env.DB_CONNECTION_STRING).then(() => {
	app.listen(PORT, () => {
		console.log(`http://localhost:${PORT}/`)
		console.log(`Server has been started on port ${PORT}...`)
	})
})
