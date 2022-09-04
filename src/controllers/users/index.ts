import { Request, Response } from 'express'
import axios, { AxiosResponse } from 'axios'
import type { IntegrationResponse } from '../../types'

// Get all JSM challenge data
const getAllData = async (req: Request, res: Response) => {
  const result: AxiosResponse = await axios.get('https://jsm-challenges.s3.amazonaws.com/frontend-challenge.json')

  const data: IntegrationResponse = result.data

  return res.status(200).json({
    ...data
  })
}

const getUserStates = async (req: Request, res: Response) => {
  const result: AxiosResponse = await axios.get('https://jsm-challenges.s3.amazonaws.com/frontend-challenge.json')

  const apiData: IntegrationResponse = result.data

  const states = apiData.results.reduce((acc, user) => {
    acc.push(user.location.state)

    return acc
  }, [] as string[])

  return res.status(200).json([
    ...Array.from(new Set(states)).sort()
  ])
}

export default { getAllData, getUserStates }