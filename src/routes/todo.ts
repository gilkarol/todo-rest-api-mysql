import { Router } from 'express'

import { getTodos, postTodo } from '../controllers/todo'
import isAuth from '../middleware/is-auth'

const router = Router()

router.get('/', isAuth, getTodos)


router.post('/', isAuth, postTodo)


export default router