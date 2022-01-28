import { NextFunction, Response } from 'express'
import errorHandler from '../models/error'
import Todo from '../models/todo'

export const getTodos = async (req: any, res: Response, next: NextFunction) => {
	try {
		const todos = await Todo.fetchAll()
		res
			.status(200)
			.json({ message: 'Todos found successfully!', todos: todos[0] })
	} catch (err) {
		next(err)
	}
}

export const getTodo = async (req: any, res: Response, next: NextFunction) => {
	const todoId = req.params.todoId
	try {
		const todo = await Todo.findById(todoId)
		if (!todo) {
			const error: errorHandler = new Error('Todo has not been found!')
			error.status = 404
			throw error
		}
		res
			.status(200)
			.json({ message: 'Todo has been found successfully!', todo: todo })
	} catch (err) {
		next(err)
	}
}

export const postTodo = async (req: any, res: Response, next: NextFunction) => {
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

export const patchTodo = async (req: any, res: Response, next: NextFunction) => {
	const todoId = req.params.todoId
	const userId = req.userId
	const todoText = req.body.text

	try {
		const todo = await Todo.findById(todoId)
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
export const deleteTodo = async (req: any, res: Response, next: NextFunction) => {
	const todoId = req.params.todoId
	const userId = req.userId
	try {
		const todo = await Todo.findById(todoId)
		if (!todo) {
			const error: errorHandler = new Error('Todo has not been found!')
			error.status = 404
			throw error
		}
		if (todo.creatorId != userId) {
			const error: errorHandler = new Error('User is not the creator of todo!')
			error.status = 404
			throw error
		}
		await Todo.deleteTodoById(todoId)
		res.status(200).json({
			message: 'Todo has been deleted successfully!',
		})
	} catch (err) {
		next(err)
	}
}
