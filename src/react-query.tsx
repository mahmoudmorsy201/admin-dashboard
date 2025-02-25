import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './react-query-init';
import { ReactNode } from 'react';

interface ReactQueryProviderProps {
  children: ReactNode;
}

declare global {
  interface Window {
    queryClient: QueryClient;
  }
}

window.queryClient = queryClient;

export const ReactQueryProvider = ({ children }: ReactQueryProviderProps) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);