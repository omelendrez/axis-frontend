export class SP {
  save = function (key, value) {
    sessionStorage.setItem(key, JSON.stringify(value));
  };
  get = function (key) {
    return JSON.parse(sessionStorage.getItem(key));
  };

  clear = function () {
    sessionStorage.clear();
  };
}

export const KEYS = {
  token: 'token',
  user: 'user'
};
