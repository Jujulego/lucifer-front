import axios, { AxiosRequestConfig, AxiosResponse, CancelTokenSource } from 'axios';
import { useCallback, useEffect, useState } from 'react';

// Types
export type APIRequestConfig = { load: boolean, config?: Omit<AxiosRequestConfig, 'cancelToken'> };
export type APIDataRequestConfig = { config?: Omit<AxiosRequestConfig, 'cancelToken'> };

export type APIRequestGenerator<T> = (source: CancelTokenSource) => Promise<AxiosResponse<T>>;
export type APIDataRequestGenerator<T> = (data: any, source: CancelTokenSource) => Promise<AxiosResponse<T>>;

export type APIState<T> = { data?: T, loading: boolean };
export type APIReturn<T> = APIState<T> & {
  reload: () => void,
}

export type APIDataReturn<T, D> = APIState<T> & {
  send: (data: D) => Promise<T>,
}

// Hooks
function useRequest<T = any>(generator: APIRequestGenerator<T>, load: boolean = true): APIReturn<T> {
  // State
  const [reload, setReload] = useState(load ? 1 : 0);
  const [state, setState] = useState<APIState<T>>({ loading: true });

  // Effect
  useEffect(() => {
    if (reload === 0) return;
    setState(old => ({ ...old, loading: true }));

    // Create cancel token
    const source = axios.CancelToken.source();

    // Make request
    generator(source)
      .then((res) => {
        setState({ data: res.data, loading: false });
      });

    // Cancel
    return () => { source.cancel(); };
  }, [generator, reload]);

  return {
    ...state,
    reload: useCallback(() => setReload(old => old + 1), [setReload])
  };
}

function useDataRequest<D = any, T = any>(generator: APIDataRequestGenerator<T>): APIDataReturn<T, D> {
  // State
  const [state, setState] = useState<APIState<T>>({ loading: false });

  // Callback
  const send = useCallback((data: D) => {
    setState(old => ({ ...old, loading: true }));

    // Create cancel token
    const source = axios.CancelToken.source();

    // Make request
    return generator(data, source)
      .then((res) => {
        setState({ data: res.data, loading: false });
        return res.data;
      });
  }, [generator]);

  return {
    ...state, send
  };
}

export function useAPIRequest<T> (config: APIRequestConfig): APIReturn<T> {
  // Callbacks
  const generator = useCallback((source: CancelTokenSource) =>
    axios.request<T>({ ...config.config, cancelToken: source.token }),
    [config.config]
  );

  return useRequest(generator, config.load);
}

export function useAPIGet<T> (url: string, config?: APIRequestConfig): APIReturn<T> {
  const rconfig = config?.config;

  // Callbacks
  const generator = useCallback((source: CancelTokenSource) =>
    axios.get<T>(url, { ...rconfig, cancelToken: source.token }),
    [url, rconfig]
  );

  return useRequest(generator, config?.load);
}

export function useAPIDelete<T> (url: string, config?: APIRequestConfig): APIReturn<T> {
  const rconfig = config?.config;

  // Callbacks
  const generator = useCallback((source: CancelTokenSource) =>
    axios.delete<T>(url, { ...rconfig, cancelToken: source.token }),
    [url, rconfig]
  );

  return useRequest(generator, config?.load);
}

export function useAPIHead<T> (url: string, config?: APIRequestConfig): APIReturn<T> {
  const rconfig = config?.config;

  // Callbacks
  const generator = useCallback((source: CancelTokenSource) =>
    axios.head<T>(url, { ...rconfig, cancelToken: source.token }),
    [url, rconfig]
  );

  return useRequest(generator, config?.load);
}

export function useAPIOptions<T> (url: string, config?: APIRequestConfig): APIReturn<T> {
  const rconfig = config?.config;

  // Callbacks
  const generator = useCallback((source: CancelTokenSource) =>
    axios.options<T>(url, { ...rconfig, cancelToken: source.token }),
    [url, rconfig]
  );

  return useRequest(generator, config?.load);
}

export function useAPIPost<D, T> (url: string, config?: APIDataRequestConfig): APIDataReturn<T, D> {
  const rconfig = config?.config;

  // Callbacks
  const generator = useCallback((data: any, source: CancelTokenSource) =>
    axios.post<T>(url, data, { ...rconfig, cancelToken: source.token }),
    [url, rconfig]
  );

  return useDataRequest(generator);
}

export function useAPIPut<D, T> (url: string, config?: APIDataRequestConfig): APIDataReturn<T, D> {
  const rconfig = config?.config;

  // Callbacks
  const generator = useCallback((data: any, source: CancelTokenSource) =>
    axios.put<T>(url, data, { ...rconfig, cancelToken: source.token }),
    [url, rconfig]
  );

  return useDataRequest(generator);
}

export function useAPIPatch<D, T> (url: string, config?: APIDataRequestConfig): APIDataReturn<T, D> {
  const rconfig = config?.config;

  // Callbacks
  const generator = useCallback((data: any, source: CancelTokenSource) =>
    axios.patch<T>(url, data, { ...rconfig, cancelToken: source.token }),
    [url, rconfig]
  );

  return useDataRequest(generator);
}

// Namespaces
const useAPI = {
  request: useAPIRequest,
  get:     useAPIGet,
  delete:  useAPIDelete,
  head:    useAPIHead,
  options: useAPIOptions,
  post:    useAPIPost,
  put:     useAPIPut,
  patch:   useAPIPatch
};

export default useAPI;