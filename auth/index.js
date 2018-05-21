const fetch = require('node-fetch')
const FormData = require('form-data')
const Promise = require('bluebird')
const {KEY, SECRET, PASS} = require('../creds')
const moment = require('moment')

function postData (url) {
  const form = new FormData()
  form.append('grant_type', 'client_credentials')
  return Promise.resolve(fetch(url, {
    body: form,
    headers: {
      ...form.getHeaders(),
      Authorization: 'Basic ' + Buffer.from(`${KEY}:${SECRET}`, 'ascii').toString('base64')
    },
    method: 'POST',
    credentials: {
      user: KEY,
      pass: PASS
    }
  }))
    .then(response => response.json())
}

class Auth {
  constructor () {
    this.response = undefined
    this.ttl = undefined
  }

  _logIn () {
    return postData('https://bitbucket.org/site/oauth2/access_token')
      .tap(response => {
        this.response = response
        this.ttl = moment.utc().add(response['expires_in'], 's')
      })
      .catch(console.error)
  }

  logIn () {
    if (this.response && moment.utc().isBefore(this.ttl)) {
      return Promise.resolve(this.response)
    } else {
      return this._logIn()
    }
  }
}

module.exports = {
  Auth: Auth
}

// manual test
// let a = new Auth()
// a.logIn()
//   .tap(console.log)
//   .then(() => a.logIn())
//   .tap(console.log)
//   .then(() => a.logIn())
//   .tap(console.log)
