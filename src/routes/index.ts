import express from 'express'
import usersController from '../controllers/users'

const router = express.Router()

// Users
router.get('/users/', usersController.getUserList)
router.get('/users/states', usersController.getUserStates)
router.get('/users/:userId', usersController.getUserData)

export = router