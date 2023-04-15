import { api } from "./apiClient"

export const getProfiles = () =>
  api.get('/profile');

