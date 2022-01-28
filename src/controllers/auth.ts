import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { validationResult } from 'express-validator'

import errorHandler from '../models/error'
import User from '../models/user'
import { NextFunction, Request, Response } from 'express'

export const signup = async (req: any, res: Response, next: NextFunction) => {
	const name: string = req.body.name
	const email: string = req.body.email
	const password: string = req.body.password

	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		const error: errorHandler = new Error('Email already exists!')
		error.status = 422
		throw error
	}

	try {
		const hashedPassword = await bcrypt.hash(password, 12)
		const user = new User(name, email, hashedPassword)
		await user.save()
		res.status(200).json({
			message: 'Created user successfully!',
		})
	} catch (err) {
		next(err)
	}
}

export const login = async (req: any, res: Response, next: NextFunction) => {
	const email: string = req.body.email
	const password: string = req.body.password

	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		const error: errorHandler = new Error('Email already exists!')
		error.status = 422
		throw error
	}

	try {
		const user = await User.findByEmail(email)
		const isEqual = await bcrypt.compare(password, user.password)
		if (!isEqual) {
			const error: errorHandler = new Error('Passwords does not match!')
			error.status = 409
			throw error
		}
		const token = jwt.sign(
			{ email: email, userId: user.id },
			process.env.JWT_TOKEN as string,
			{
				expiresIn: '1h',
			}
		)
		res.status(200).json({
			message: 'Successfuly logged in!',
			token: token,
		})
	} catch (err) {
		next(err)
	}
}
