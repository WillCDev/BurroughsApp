const fetchBase = (url: RequestInfo, init?: RequestInit): Promise<Response> => {
  return fetch(url, init).then(function (response) {
    if (!response.ok) {
      throw Error(response.statusText)
    }
    return response
  })
}

export const get = (
  url: RequestInfo,
  init?: Omit<RequestInit, 'method'>
): Promise<Response> => {
  return fetchBase(url, { method: 'GET', ...init })
}
