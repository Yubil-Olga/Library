// eslint-disable-next-line @typescript-eslint/no-explicit-any
type JsonFetchInit = Omit<RequestInit, 'body'> & { body?: any };

export const handleJsonFetchResponse = <T>(res: Response) =>
  res.ok
    ? (res.json() as Promise<T>)
    : res.json().then((body: T) => Promise.reject({ body, fetchError: true, status: res.status }));

export const jsonFetch = <T>(url: RequestInfo, init?: JsonFetchInit): Promise<T> =>
  fetch(url, {
    ...init,
    ...(init?.body ? { body: JSON.stringify(init.body) } : null),
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  }).then((res) => handleJsonFetchResponse<T>(res));
