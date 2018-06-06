import * as Bluebird from 'bluebird'

export async function DoWhileAsync<T>(
  fn: () => Bluebird<T>,
  continueFetching: (arg: T) => boolean,
  dataCallback: (arg: T) => void) {

  let response;

  do {
    response = await fn()
    dataCallback(response)
  } while (continueFetching(response))

}