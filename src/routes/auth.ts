import { Router } from 'express'
import { body } from 'express-validator'

import { signup, login } from '../controllers/auth'

const router = Router()

router.post(
	'/signup',
	[
		body('email').trim().isEmail().not().isEmpty(),
		body('password').trim().isLength({ min: 5 }),
		body('name').trim().isLength({ min: 5 }),
	],
	signup
)

router.post(
	'/login',
	[
		body('email').trim().isEmail().not().isEmpty(),
		body('password').trim().isLength({ min: 5 }),
	],
	login
)

export default router
