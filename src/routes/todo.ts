import { Router } from 'express'

import { getTodos, getTodo, postTodo, patchTodo, deleteTodo } from '../controllers/todo'
import isAuth from '../middleware/is-auth'

const router = Router()

router.get('/', isAuth, getTodos)

router.get('/:todoId', isAuth, getTodo)

router.post('/', isAuth, postTodo)

router.patch('/:todoId', isAuth, patchTodo)

router.delete('/:todoId', isAuth, deleteTodo)


export default router