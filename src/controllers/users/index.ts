import { Request, Response } from 'express'
import axios, { AxiosResponse } from 'axios'
import { idFromEmail } from '../../utils/idFromEmail'
import { paginateResult } from '../../utils/paginate'
import type { IntegrationResponse, UserDataSummary, UserDataResponse } from '../../types'

const MAX_USERS_PER_PAGE = 9


const getUserList = async (req: Request, res: Response) => {
  try {
    const result: AxiosResponse = await axios.get('https://jsm-challenges.s3.amazonaws.com/frontend-challenge.json')

    const apiData: IntegrationResponse = result.data

    // Filters and sort
    const stateFilter = req.query.state ? (req.query.state as string).split(',') : null
    const sortData = req.query.sort as keyof UserDataSummary

    let userList: UserDataSummary[] = apiData.results.map(user => {
      return {
        id: idFromEmail(user.email),
        picture: user.picture.medium,
        name: `${user.name.first} ${user.name.last}`,
        street: user.location.street,
        city: user.location.city,
        state: user.location.state,
        postcode: user.location.postcode
      }
    })

    if (stateFilter) {
      userList = userList.filter(user => stateFilter.includes(user.state.toLowerCase()))
    }

    if (sortData) {
      userList = userList.sort((a, b) => {
        if (a[sortData] < b[sortData]){
          return -1
        }

        if (a[sortData] > b[sortData]){
          return 1
        }

        return 0
      })
    }

    const paginatedResult = paginateResult(userList, MAX_USERS_PER_PAGE, Number(req.query.page) || 1)

    return res.status(200).json(paginatedResult)
  } catch (error) {
    return res.status(500).json(error)
  }
}

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

export default { getUserList, getUserData, getUserStates }