import express from 'express'
import usersController from '../controllers/users'

const router = express.Router()

// Users
router.get('/users/data', usersController.getAllData)
router.get('/users/states', usersController.getUserStates)

export = router