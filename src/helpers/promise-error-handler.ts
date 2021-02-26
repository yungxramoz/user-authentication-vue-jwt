export function promiseErrorHandler(error: any, callback: Function) {
  callback()
  const message =
    (error.response && error.response.data && error.response.data.message) ||
    error.message ||
    error.toString()
  return Promise.reject(message)
}