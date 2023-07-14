/* eslint-disable no-restricted-globals */

let orientKey = 'orientation'
if ('mozOrientation' in screen) {
  orientKey = 'mozOrientation'
} else if ('msOrientation' in screen) {
  orientKey = 'msOrientation'
}

// browsers require full screen mode in order to obtain the orientation lock
const fullscreenElement = 'fullscreenElement'
let goFullScreen = null
let exitFullScreen = null
if ('requestFullscreen' in document.documentElement) {
  goFullScreen = 'requestFullscreen'
  exitFullScreen = 'exitFullscreen'
} else if ('mozRequestFullScreen' in document.documentElement) {
  goFullScreen = 'mozRequestFullScreen'
  exitFullScreen = 'mozCancelFullScreen'
} else if ('webkitRequestFullscreen' in document.documentElement) {
  goFullScreen = 'webkitRequestFullscreen'
  exitFullScreen = 'webkitExitFullscreen'
} else if ('msRequestFullscreen') {
  goFullScreen = 'msRequestFullscreen'
  exitFullScreen = 'msExitFullscreen'
}

export const lock = () => {
  document.documentElement[goFullScreen] &&
    document.documentElement[goFullScreen]()

  let promise = null
  if (screen[orientKey].lock) {
    promise = screen[orientKey].lock(screen[orientKey].type)
  } else {
    promise = screen.orientationLock(screen[orientKey])
  }

  promise
    .then(function () {})
    .catch(function (err) {
      document[exitFullScreen] && document[exitFullScreen]()
      console.error(err)
    })
}

export const unlock = () => {
  if (document[fullscreenElement]) {
    document[exitFullScreen] && document[exitFullScreen]()
  }

  if (screen[orientKey].unlock) {
    screen[orientKey].unlock()
  } else {
    screen.orientationUnlock()
  }
}

export const isDesktop = () => window.innerWidth > 768
