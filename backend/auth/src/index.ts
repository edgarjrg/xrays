import fetch from 'node-fetch'
import * as FormData from 'form-data'
import * as  Bluebird from 'bluebird'
import { KEY, SECRET } from '../../creds'
import * as moment from 'moment'
import { IResponse } from "./interfaces";

function postData<T>(url) {
  const form = new FormData()
  form.append('grant_type', 'client_credentials')
  return Bluebird.resolve(fetch(url, {
    body: form,
    headers: {
      Authorization: 'Basic ' + Buffer.from(`${KEY}:${SECRET}`, 'ascii').toString('base64')
    },
    method: 'POST',
  }))
    .then(response => response.json() as Promise<T>)
}


export class Auth {
  response?: IResponse
  ttl?: moment.Moment

  constructor() {
  }

  _logIn(): Bluebird<IResponse> {
    return postData<IResponse>('https://bitbucket.org/site/oauth2/access_token')
      .tap(response => {
        this.response = response
        this.ttl = moment.utc().add(response['expires_in'], 's')
      })
  }

  logIn(): Bluebird<IResponse> {
    if (this.response && moment.utc().isBefore(this.ttl)) {
      return Bluebird.resolve(this.response)
    } else {
      return this._logIn()
    }
  }
}
