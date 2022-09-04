import { Request, Response } from 'express'
import axios, { AxiosResponse } from 'axios'

// Get all JSM challenge data
const getAllData = async (req: Request, res: Response) => {
  const result: AxiosResponse = await axios.get('https://jsm-challenges.s3.amazonaws.com/frontend-challenge.json')

  const data: any = result.data

  return res.status(200).json({
    ...data
  })
}

export default { getAllData }