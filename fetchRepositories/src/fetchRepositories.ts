import { lensProp, lensPath, transduce, view, compose, map } from "ramda";

export class Fetcher {

}

export const valuesLens = lensProp('values')
export const linkLens = lensPath(['links', 'self', 'href'])

export function getLinks(input) {
  return map(view(linkLens), view(valuesLens, input))
}