import * as Bluebird from 'bluebird'

export async function DoWhileAsync<T>(
  fn: () => Bluebird<T>,
  continueFetching: (arg: T) => boolean,
  dataCallback: (arg: T) => Bluebird<any>) {

  let response;

  do {
    response = await fn()
    await dataCallback(response)
  } while (continueFetching(response))

}