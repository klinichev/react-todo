import { QueryClient, QueryClientProvider, useMutation, useQuery, useQueryClient } from 'react-query';

import * as api from './api/Queries.js';

import CheckList from './components/CheckList.js';
import Dialog from './components/Dialog.js';

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
  const {isLoading, isError, data, error} = useQuery('tasks', () => api.getItemFromStorage('tasks').then((response) => response));

  const mutation = useMutation((newArray) => api.saveItemIntoStorage('tasks', newArray), {
    onSuccess: () => {
      queryClient.invalidateQueries('tasks');
    },
  });

  const onCheckboxValueChanged = (key, newValue) => {
    console.log(key);
    console.log(newValue);
    const arrayToChange = data.map((item) => {
        if (item.key === key) {
            return {...item, isDone: newValue};
        }
        return item;
    });
    mutation.mutate(arrayToChange);
  };

  const onTaskAdded = (value) => {
    let newKey = data[data.length - 1].key + 1;
    const arrayToChange = [...data, {
      'value': value, 
      'isDone': false,
      'key': newKey
    }];
    mutation.mutate(arrayToChange);
  };

  if (isLoading) return <p>Загрузка...</p>;

  if (isError) return <p>Ошибка: {error.message}</p>;

  return (
    <div>
      <div>
        <CheckList tasks={data} onChangeIsDone={onCheckboxValueChanged} />
      </div>
      <div>
        <Dialog onSubmitDialog={onTaskAdded} />
      </div>
    </div>
  );
}