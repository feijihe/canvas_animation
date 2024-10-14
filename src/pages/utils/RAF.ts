export const RAF = window?.requestAnimationFrame || function (callback) {
  window.setTimeout(callback, 1000 / 60)
}
