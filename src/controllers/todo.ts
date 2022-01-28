import errorHandler from '../models/error'
import Todo from '../models/todo'
import User from '../models/user'

export const getTodos = async (req: any, res: any, next: any) => {
	try {
		const todos = await Todo.fetchAll()
		res
			.status(200)
			.json({ message: 'Todos found successfully!', todos: todos[0] })
	} catch (err) {
		next(err)
	}
}

export const postTodo = async (req: any, res: any, next: any) => {
	const todoText: string = req.body.text
	const userId: number = req.userId
	try {
		const todo = new Todo(todoText, userId)
		await todo.save()
		res.status(200).json({ message: 'Todo created successfully!' })
	} catch (err) {
		next(err)
	}
}

export const patchTodo = async (req: any, res: any, next: any) => {
	const todoId = req.params.todoId
	const userId = req.userId
	const todoText = req.body.text

	try {
		const result = await Todo.findById(todoId)
		const todo = result[0]
		if (!todo) {
			const error: errorHandler = new Error('Todo has not been found!')
			error.status = 404
			throw error
		}
		if (todo.creatorId != userId) {
			const error: errorHandler = new Error(
				'This user is not the creator of todo!'
			)
			error.status = 409
			throw error
		}
		await Todo.updateTodoById(todoText, todoId)
		res.status(200).json({ message: 'Todo updated successfully!' })
	} catch (err) {
		next(err)
	}
}
