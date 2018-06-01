import { lensProp, lensPath, view, map } from 'ramda';

export class Fetcher {

}

export const valuesLens = lensProp('values')
export const linkLens = lensPath<any, string>(['links', 'self', 'href'])

export function getLinks(input): string[] {
  return map(view(linkLens), view(valuesLens, input))
}