import type { DateFormat } from './general'

export interface UserPictures {
  large: string
  medium: string
  thumbnail: string
}

export interface UserLocation {
  street: string
  city: string
  state: string
  postcode: number
  coordinates: {
    latitude: string
    longitude: string
  }
  timezone: {
    offset: string
    description: string
  }
}

export interface UserName {
  title: string
  first: string
  last: string
}

export interface UserData {
  id: string
  name: UserName
  gender: string
  picture: UserPictures
  location: UserLocation
  email: string
  dob: DateFormat
  registered: DateFormat
  phone: string
  cell: string
}

export interface UserDataSummary {
  id: string
  picture: string
  name: string
  street: string
  city: string
  state: string
  postcode: number
}

// Response Related
export interface UserDataResponse extends UserData {
  id: string
  name: UserName
  gender: string
  picture: UserPictures
  location: UserLocation
  email: string
  dob: DateFormat
  registered: DateFormat
  phone: string
  cell: string
}

export interface UserListResponse {
  users: UserDataSummary[]
  totalPages: number
  totalUsers: number
  currentPage: number
}
