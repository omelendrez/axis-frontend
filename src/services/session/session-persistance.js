export class SP {
  save = function (key, value) {
    sessionStorage.setItem(key, JSON.stringify(value))
  }

  get = function (key) {
    try {
      return JSON.parse(sessionStorage.getItem(key))
    } catch (error) {
      console.log(error)
    }
  }

  delete = function (key) {
    sessionStorage.removeItem(key)
  }

  clear = function () {
    sessionStorage.clear()
  }
}

export const KEYS = {
  token: 'token',
  user: 'user',
  network: 'network',
  pagination: 'pagination',
  pending: 'pending'
}
