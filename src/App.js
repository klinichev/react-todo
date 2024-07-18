import { QueryClient, QueryClientProvider, useQueryClient } from 'react-query';

import CheckList from './components/check-list/CheckList.js';
import Dialog from './components/dialog/Dialog.js';
import SimpleForm from './components/simple-form/SimpleForm.js';
import * as mutations from './api/Mutations.js';

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Todo />
    </QueryClientProvider>
  );
}

function Todo() {
  const queryClient = useQueryClient();

  const { isLoading, isError, data, error } = mutations.useTasks();
  const { checkTask } = mutations.useCheckTask();

  const onCheckBoxValueChanged = (params) => {
    checkTask(params, () => {
      console.log('checked');
      queryClient.invalidateQueries('tasks');
    });
  }

  if (isLoading) return <p>Загрузка...</p>;

  if (isError) return <p>Ошибка: {error.message}</p>;

  return (
    <div>
      <div>
        <CheckList items={data} onChangeIsChecked={onCheckBoxValueChanged} isCheckedKeyName={'isDone'} />
      </div>
      <div>
        <Dialog Content={SimpleForm} />
      </div>
    </div>
  );
}