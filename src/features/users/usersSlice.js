import { createEntityAdapter, createSelector } from '@reduxjs/toolkit'
import { client } from '../../api/client'

import { apiSlice } from '../api/apiSlice'

const usersAdapter = createEntityAdapter()

const initialState = usersAdapter.getInitialState()

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => '/users',
      transformResponse: (responseData) => {
        return usersAdapter.setAll(initialState, responseData)
      },
    }),
  }),
})

export const { useGetUsersQuery } = extendedApiSlice

export const selectUsersResult = extendedApiSlice.endpoints.getUsers.select()

const selectUsersData = createSelector(
  selectUsersResult,
  (usersResult) => usersResult.data
)

export const { selectAll: selectAllUsers, selectById: selectUserById } =
  usersAdapter.getSelectors((state) => selectUsersData(state) ?? initialState)
// const emptyUsers = []

// export const selectAllUsers = createSelector(
//   selectUsersResult,
//   (usersResult) => usersResult?.data ?? emptyUsers
// )

// export const selectUserById = createSelector(
//   selectAllUsers,
//   (state, userId) => userId,
//   (users, userId) => users.find((user) => user.id === userId)
// )

// export const { selectAll: selectAllUsers, selectById: selectUserById } =
//   usersAdapter.getSelectors((state) => state.users)
