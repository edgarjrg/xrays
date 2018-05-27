import * as Bluebird from 'bluebird'

export class Fetcher {

  async start<T>(
    fn: () => Bluebird<T>,
    continueFetching: (arg: T) => boolean,
    dataCallback: (arg: T) => void) {

    let response;

    do {
      response = await fn()
      dataCallback(response)
    } while (continueFetching(response))

  }
}