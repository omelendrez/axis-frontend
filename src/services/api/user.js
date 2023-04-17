import { api } from "./apiClient"

export const login = (payload) => api.post('/user/login', payload)

export const createUser = (payload) => api.post('/user', payload)

export const getUsers = () => api.get('/user')

export const getUser = (id) => api.get(`/user/${id}`)

export const updateUser = (id, payload) => api.put(`/user/${id}`, payload)

export const changePassword = (id, payload) => api.put(`/user/${id}/chgpwd`, payload);

