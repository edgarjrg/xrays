import fetch from 'node-fetch'
import * as FormData from 'form-data'
import * as Promise from 'bluebird'
import { KEY, SECRET } from '../../creds'
import * as moment from 'moment'
import { IResponse } from "./interfaces";

function postData(url) {
  const form = new FormData()
  form.append('grant_type', 'client_credentials')
  return Promise.resolve(fetch(url, {
    body: form,
    headers: {
      Authorization: 'Basic ' + Buffer.from(`${KEY}:${SECRET}`, 'ascii').toString('base64')
    },
    method: 'POST',
  }))
    .then(response => response.json())
}


export class Auth {
  response?: IResponse
  ttl?: moment.Moment

  constructor() {
  }

  _logIn(): Promise<IResponse> {
    return postData('https://bitbucket.org/site/oauth2/access_token')
      .tap(response => {
        this.response = response
        this.ttl = moment.utc().add(response['expires_in'], 's')
      })
  }

  logIn(): Promise<IResponse> {
    if (this.response && moment.utc().isBefore(this.ttl)) {
      return Promise.resolve(this.response)
    } else {
      return this._logIn()
    }
  }
}

// // manual test
// let a = new Auth()
// a.logIn()
//   .tap(console.log)
//   .then(() => a.logIn())
//   .tap(console.log)
//   .then(() => a.logIn())
//   .tap(console.log)
