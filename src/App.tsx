import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import CheckList from './components/check-list/CheckList.tsx';
import Dialog from './components/dialog/Dialog.tsx';
import SimpleForm from './components/simple-form/SimpleForm.tsx';
import * as mutations from './api/Tasks.ts';

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AppLoader />
    </QueryClientProvider>
  );
}

function AppLoader() {
  const { isLoading, isError, data, error } = mutations.useTasks();

  if (isLoading) return <p>Загрузка...</p>;

  if (isError) return (error instanceof Error) ? <p>Ошибка: {error.message}</p> : <p>Ошибка!</p>;

  return (
    <Todo data={data} />
  );
}

function Todo({ data }) {
  return (
    <div>
      <div>
        <CheckList items={data} />
      </div>
      <div>
        <Dialog Content={SimpleForm} />
      </div>
    </div>
  );
}