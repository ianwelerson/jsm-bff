import { UserDataSummary, UserListResponse } from '../types/'

const paginateResult = (userList: UserDataSummary[], pageSize: number, pageNumber: number): UserListResponse => {
  const totalPages = Math.ceil(userList.length / pageSize)

  const items = userList.slice((pageNumber - 1) * pageSize, pageNumber * pageSize)

  return {
    users: items,
    totalPages,
    totalUsers: userList.length,
    currentPage: pageNumber,
  }
}

export { paginateResult }