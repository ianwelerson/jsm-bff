import { UserDataResponse} from './user'

export interface DateFormat {
  date: string
  age: number
}

export interface SelectOption {
  name: string
  key: string
}

export interface IntegrationResponse {
  results: UserDataResponse[]
}
