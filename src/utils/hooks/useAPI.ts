import axios, { AxiosRequestConfig, AxiosResponse, CancelTokenSource } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { AppDispatch } from 'store';
import { httpError } from 'store/errors/utils';

import useChanged from './useChanged';

// Types
type Updator<R> = (data?: R) => R;
export type APIState<R> = { data?: R, loading: boolean };
export type APIPromise<R> = Promise<R | undefined> & { cancel: () => void };

export type APIGetRequestConfig = Omit<AxiosRequestConfig, 'cancelToken'> & { load?: boolean };
export type APIGetRequestGenerator<P extends object, R> = (source: CancelTokenSource) => Promise<AxiosResponse<R>>;
export type APIGetReturn<R> = APIState<R> & {
  update: (data: R | Updator<R>) => void;
  reload: () => void;
}

export type APIDeleteRequestGenerator<P extends object, R> = (source: CancelTokenSource, url?: string, params?: P) => Promise<AxiosResponse<R>>;
export type APIDeleteReturn<P extends object, R> = APIState<R> & {
  send: (arg1?: string | P, arg2?: P) => APIPromise<R>,
}

export type APIPostRequestConfig = Omit<AxiosRequestConfig, 'cancelToken'>;
export type APIPostRequestGenerator<D, P extends object, R> = (data: D, source: CancelTokenSource, url?: string, params?: P) => Promise<AxiosResponse<R>>;
export type APIPostReturn<D, P extends object, R> = APIState<R> & {
  send: (data: D, params?: P) => APIPromise<R>,
}

// Base hooks
function useGetRequest<R, P extends object = object>(generator: APIGetRequestGenerator<P, R>, load: boolean = true): APIGetReturn<R> {
  // Redux
  const dispatch = useDispatch<AppDispatch>();

  // State
  const [reload, setReload] = useState(load ? 1 : 0);
  const [state, setState] = useState<APIState<R>>({ loading: true });

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
      })
      .catch((error) => {
        if (axios.isCancel(error)) return;
        if (httpError(error, dispatch)) return;
        throw error;
      });

    // Cancel
    return () => { source.cancel(); };
  }, [dispatch, generator, reload]);

  return {
    ...state,
    update: useCallback((data: R | Updator<R>) => {
      const updator: Updator<R> = (typeof data === "function") ? data as Updator<R> : (() => data);

      setState(old => ({ ...old, data: updator(old.data) }))
    }, [setState]),
    reload: useCallback(() => setReload(old => old + 1), [setReload])
  };
}

function useDeleteRequest<R = any, P extends object = object>(generator: APIDeleteRequestGenerator<P, R>): APIDeleteReturn<P, R> {
  // Redux
  const dispatch = useDispatch<AppDispatch>();

  // State
  const [state, setState] = useState<APIState<R>>({ loading: false });

  // Callback
  const send = useCallback((arg1?: string | P, arg2?: P) => {
    setState(old => ({ ...old, loading: true }));

    // Arguments
    let url: string | undefined;
    let params: P | undefined;

    if (typeof arg1 === "string") {
      url = arg1;
      params = arg2;
    } else {
      url = undefined;
      params = arg1;
    }

    // Create cancel token
    const source = axios.CancelToken.source();

    // Make request
    const promise: any = generator(source, url, params)
      .then((res): R => {
        setState({ data: res.data, loading: false });
        return res.data;
      })
      .catch((error): undefined => {
        if (httpError(error, dispatch)) return undefined;
        throw error;
      });

    promise.cancel = () => source.cancel();
    return promise as APIPromise<R>;
  }, [dispatch, generator]);

  return {
    ...state, send
  };
}

function usePostRequest<D, R = any, P extends object = object>(generator: APIPostRequestGenerator<D, P, R>): APIPostReturn<D, P, R> {
  // Redux
  const dispatch = useDispatch<AppDispatch>();

  // State
  const [state, setState] = useState<APIState<R>>({ loading: false });

  // Callback
  const send = useCallback((data: D) => {
    setState(old => ({ ...old, loading: true }));

    // Create cancel token
    const source = axios.CancelToken.source();

    // Make request
    const promise: any = generator(data, source)
      .then((res): R => {
        setState({ data: res.data, loading: false });
        return res.data;
      })
      .catch((error): undefined => {
        if (httpError(error, dispatch)) return undefined;
        throw error;
      });

    promise.cancel = () => source.cancel();
    return promise as APIPromise<R>;
  }, [dispatch, generator]);

  return {
    ...state, send
  };
}

// API Hooks
export function useAPIGet<R, P extends object = object> (url: string, params?: P, config: APIGetRequestConfig = {}): APIGetReturn<R> {
  const { load, ...rconfig } = config;

  // Callbacks
  const generator = useCallback((source: CancelTokenSource) =>
    axios.get<R>(url, { ...rconfig, params, cancelToken: source.token }),
    [url, useChanged(params), useChanged(rconfig)] // eslint-disable-line react-hooks/exhaustive-deps
  );

  return useGetRequest(generator, config.load);
}

export function useAPIHead<R, P extends object = object> (url: string, params?: P, config: APIGetRequestConfig = {}): APIGetReturn<R> {
  const { load, ...rconfig } = config;

  // Callbacks
  const generator = useCallback((source: CancelTokenSource) =>
    axios.head<R>(url, { ...rconfig, params, cancelToken: source.token }),
    [url, useChanged(params), useChanged(rconfig)] // eslint-disable-line react-hooks/exhaustive-deps
  );

  return useGetRequest(generator, config?.load);
}

export function useAPIOptions<R, P extends object = object> (url: string, params?: P, config: APIGetRequestConfig = {}): APIGetReturn<R> {
  const { load, ...rconfig } = config;

  // Callbacks
  const generator = useCallback((source: CancelTokenSource) =>
    axios.options<R>(url, { ...rconfig, params, cancelToken: source.token }),
    [url, useChanged(params), useChanged(rconfig)] // eslint-disable-line react-hooks/exhaustive-deps
  );

  return useGetRequest(generator, config?.load);
}

export function useAPIDelete<R = any, P extends object = object> (url: string, params?: P, config?: APIPostRequestConfig): APIDeleteReturn<P, R> {
  // Callbacks
  const generator = useCallback((source: CancelTokenSource, _url?: string, _params?: P) =>
      axios.delete<R>(_url || url, { ...config, params: { ...params, ..._params }, cancelToken: source.token }),
    [url, params, config]
  );

  return useDeleteRequest(generator);
}

export function useAPIPost<D, R = any, P extends object = object> (url: string, params?: P, config?: APIPostRequestConfig): APIPostReturn<D, P, R> {
  // Callbacks
  const generator = useCallback((data: D, source: CancelTokenSource, _url?: string, _params?: P) =>
    axios.post<R>(_url || url, data, { ...config, params: { ...params, ..._params }, cancelToken: source.token }),
    [url, params, config]
  );

  return usePostRequest(generator);
}

export function useAPIPut<D, R = any, P extends object = object> (url: string, params?: P, config?: APIPostRequestConfig): APIPostReturn<D, P, R> {
  // Callbacks
  const generator = useCallback((data: D, source: CancelTokenSource, _url?: string, _params?: P) =>
    axios.put<R>(_url || url, data, { ...config, params: { ...params, ..._params }, cancelToken: source.token }),
    [url, params, config]
  );

  return usePostRequest(generator);
}

export function useAPIPatch<D, R = any, P extends object = object> (url: string, params?: P, config?: APIPostRequestConfig): APIPostReturn<D, P, R> {
  // Callbacks
  const generator = useCallback((data: D, source: CancelTokenSource, _url?: string, _params?: P) =>
    axios.patch<R>(_url || url, data, { ...config, params: { ...params, ..._params }, cancelToken: source.token }),
    [url, params, config]
  );

  return usePostRequest(generator);
}

// Namespaces
const useAPI = {
  get:     useAPIGet,
  delete:  useAPIDelete,
  head:    useAPIHead,
  options: useAPIOptions,
  post:    useAPIPost,
  put:     useAPIPut,
  patch:   useAPIPatch
};

export default useAPI;
