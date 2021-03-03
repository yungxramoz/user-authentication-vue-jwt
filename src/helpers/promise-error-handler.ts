export function promiseErrorHandler(error: any, callback: Function): Promise<any> {
  callback()
  console.log(error.response)
  const message = (error.response && error.response.data) || error.response.data || error.toString()
  return Promise.reject(message)
}
