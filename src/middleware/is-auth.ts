import { NextFunction,  Response } from 'express'
import jwt from 'jsonwebtoken'

import { Err, Req, Token } from '../util/interfaces'




export default (req: Req, res: Response, next: NextFunction) => {
	if (!req.get('Authorization')) {
		const error: Err = new Error('Token not found!')
		error.status = 401
		throw error
	}
	const token = req.get('Authorization')!.split(' ')[1]
	try {
		jwt.verify(token, process.env.JWT_TOKEN as string) as Token
	} catch (err) {
		const error: Err = new Error('Not authenticated!')
		error.status = 401
		next(error)
	}
	const unhashedToken = jwt.verify(
		token,
		process.env.JWT_TOKEN as string
	) as Token
    req.userId = +unhashedToken.userId 
	next()
}
