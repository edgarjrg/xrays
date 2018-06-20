import { Auth } from "./index";
import * as moment from 'moment'

test('auth response', async () => {
  let a = new Auth()

  const response = await a.logIn()

  expect(response).toHaveProperty("access_token")
  expect(response).toHaveProperty("scopes")
  expect(response).toHaveProperty("expires_in")
  expect(response).toHaveProperty("refresh_token")
  expect(response).toHaveProperty("token_type")

});

test('auth response caches', async () => {
  let auth = new Auth()

  const firstResponse = await auth.logIn()
  const secondResponse = await auth.logIn()


  expect(secondResponse).toEqual(firstResponse)

});

test('auth response caches until time to live', async () => {
  let auth = new Auth()

  const firstResponse = await auth.logIn()
  auth.ttl = moment();
  const secondResponse = await auth.logIn()


  expect(secondResponse).not.toEqual(firstResponse)

});