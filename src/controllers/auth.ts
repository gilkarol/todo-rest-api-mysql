import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import errorHandler from '../models/error'
import User from '../models/user'
import db from '../util/database'

export const signup = async (req: any, res: any, next: any) => {
	const name: string = req.body.name
	const email: string = req.body.email
	const password: string = req.body.password

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

export const login = async (req: any, res: any, next: any) => {
	const email: string = req.body.email
	const password: string = req.body.password
	

	try {
		const user = await User.findByEmail(email)
		const isEqual = await bcrypt.compare(password, user[0].password)
		if (!isEqual) {
			const error: errorHandler = new Error('Passwords does not match!')
			error.status = 409
            throw error
		}
        const token = jwt.sign({email: email, userId: user[0].id }, process.env.JWT_TOKEN as string, {
			expiresIn: '1h'
		})
		res.status(200).json({
			message: 'Successfuly logged in!',
			token: token,
		})
	} catch (err) {
		next(err)
	}
}
