import axios, { AxiosRequestConfig, AxiosInstance, AxiosError, AxiosResponse } from 'axios';

interface ApiClient {
  get: <TResponse>(url: string, config?: AxiosRequestConfig) => Promise<TResponse>;
  post: <TRequest, TResponse>(url: string, data: TRequest, config?: AxiosRequestConfig) => Promise<TResponse>;
  put: <TRequest, TResponse>(url: string, data: TRequest, config?: AxiosRequestConfig) => Promise<TResponse>;
  delete: <TResponse>(url: string, config?: AxiosRequestConfig) => Promise<TResponse>;
}

const createApiClient = (baseURL: string): AxiosInstance => {
  const client = axios.create({
    baseURL,
    headers: { 'Content-Type': 'application/json' },
  });

  client.interceptors.request.use((config) => {
    const token = sessionStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  client.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        console.warn('Unauthorized! Token might be invalid or expired.');
      }
      return Promise.reject(error);
    }
  );

  return client;
};

const handleRequest = async <T>(request: Promise<AxiosResponse<T>>): Promise<T> => {
  try {
    const response = await request;
    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log('Request was cancelled');
    } else {
      console.error(error);
    }
    throw error;
  }
};

const apiClient = (baseURL: string): ApiClient => {
  const client = createApiClient(baseURL);

  return {
    get: <TResponse>(url: string, config?: AxiosRequestConfig) =>
      handleRequest<TResponse>(client.get<TResponse>(url, config)),

    post: <TRequest, TResponse>(url: string, data: TRequest, config?: AxiosRequestConfig) =>
      handleRequest<TResponse>(client.post<TResponse>(url, data, config)),

    put: <TRequest, TResponse>(url: string, data: TRequest, config?: AxiosRequestConfig) =>
      handleRequest<TResponse>(client.put<TResponse>(url, data, config)),

    delete: <TResponse>(url: string, config?: AxiosRequestConfig) =>
      handleRequest<TResponse>(client.delete<TResponse>(url, config)),
  };
};

export default apiClient;
