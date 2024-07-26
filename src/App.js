import { QueryClient, QueryClientProvider } from 'react-query';

import CheckList from './components/check-list/CheckList.js';
import Dialog from './components/dialog/Dialog.js';
import SimpleForm from './components/simple-form/SimpleForm.js';
import * as mutations from './api/Tasks.js';

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

  if (isError) return <p>Ошибка: {error.message}</p>;

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