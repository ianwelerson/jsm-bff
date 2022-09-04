import { Request, Response } from 'express'
import axios, { AxiosResponse } from 'axios'
import { idFromEmail } from '../../utils/idFromEmail'
import type { IntegrationResponse, UserDataResponse } from '../../types'

// Get all JSM challenge data
const getUserData = async (req: Request, res: Response) => {
  try {
    const result: AxiosResponse = await axios.get('https://jsm-challenges.s3.amazonaws.com/frontend-challenge.json')

    const apiData: IntegrationResponse = result.data

    const userData = apiData.results.find(user => idFromEmail(user.email) === req.params.userId)

    if (!userData) {
      return res.status(404).json({
        message: 'Usuário não encontrado'
      })
    }

    const responseData: UserDataResponse = {
      id: idFromEmail(userData.email),
      ...userData,
    }

    return res.status(200).json({...responseData})
  } catch (error) {
    return res.status(500).json(error)
  }
}

const getUserStates = async (req: Request, res: Response) => {
  try {
    const result: AxiosResponse = await axios.get('https://jsm-challenges.s3.amazonaws.com/frontend-challenge.json')

    const apiData: IntegrationResponse = result.data

    const states = apiData.results.reduce((acc, user) => {
      acc.push(user.location.state)

      return acc
    }, [] as string[])

    return res.status(200).json([
      ...Array.from(new Set(states)).sort()
    ])
  } catch (error) {
    return res.status(500).json(error)
  }
}

export default { getUserData, getUserStates }