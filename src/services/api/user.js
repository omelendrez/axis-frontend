import { api } from "./apiClient"

export const login = (payload) =>
  api.post('/user/login', payload)

export const getUsers = () =>
  api.get('/user')


export const changePassword = (id, payload) =>
  api.put(`/user/${id}/chgpwd`, payload);

