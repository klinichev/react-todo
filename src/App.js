import { useState } from 'react';
import styled from 'styled-components';

const Ul = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 30px;
  font-size: 20px;
  line-height: 30px;
`;

const Li = styled.li`
  display: flex;

  & input {
    margin-right: 10px;
  }
`;

const Form = styled.form`
  font-size: 20px;
  line-height: 30px;

  & input {
    min-width: 300px;
    padding: 6px;
    border-radius: 6px;
    border: 1px solid #aaa;
    margin-right: 10px;
  }

  & button {
    min-width: 100px;
    padding: 6px;
    border-radius: 6px;
    border: none;
    background-color: #22a;
    color: #fff;
    cursor: pointer;
  }
`;

function saveItemIntoStorage(key, value) {
  try {
    console.log(value);
    return window.localStorage.setItem(key, value);
  } catch (e) {
    console.log(e);
  }
}

function getItemFromStorage(key) {
  // return JSON.stringify([{
  //   'value': 'Delo 1',
  //   'isDone': false,
  //   'key': 0
  // }, {
  //   'value': 'Delo 2',
  //   'isDone': false,
  //   'key': 1
  // }]);
  try {
    return window.localStorage.getItem(key);
  } catch (e) {
    console.log(e);
  }
}

// components

export default function App() {
  const [tasksArray, setTasksArray] = useState(JSON.parse(getItemFromStorage('tasks')));

  const onCheckboxValueChanged = (key, newValue) => {
    console.log(key);
    console.log(newValue);
    const arrayToChange = tasksArray.map((item) => {
        if (item.key === key) {
            return {...item, isDone: newValue};
        }
        return item;
    });
    setTasksArray(arrayToChange);
    saveItemIntoStorage('tasks', JSON.stringify(arrayToChange));
  };

  const onTaskAdded = (value) => {
    let newKey = tasksArray[tasksArray.length - 1].key + 1;
    const arrayToChange = [...tasksArray, {
      'value': value, 
      'isDone': false,
      'key': newKey
    }];
    setTasksArray(arrayToChange);
    saveItemIntoStorage('tasks', JSON.stringify(arrayToChange));
  }

  return (
    <div>
      <div>
        <List tasks={tasksArray} onChangeIsDone={onCheckboxValueChanged} />
      </div>
      <div>
        <AddForm onSubmit={onTaskAdded} />
      </div>
    </div>
  );
}

function AddForm({ onSubmit }) {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value !== '') {
      onSubmit(value);
      setValue('');
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <input type='text' placeholder='Введите название нового дела' value={value} onChange={(e) => setValue(e.target.value)} />
      <button type='submit'>Добавить</button>
    </Form>
  );
}

function List({ tasks, onChangeIsDone }) {
  const tasksList = tasks.map((task, index) => {
    return (
      <Task value={task.value} isDone={task.isDone} key={task.key} onChange={(newValue) => onChangeIsDone(task.key, newValue)} />
    );
  });

  return (
    <>
      <Ul>{tasksList}</Ul>
    </>
  );
}

function Task({ value, isDone, onChange }) {
  return (
    <>
      <Li>
        <input type="checkbox" checked={isDone} onChange={(event) => onChange(event.target.checked)} />
        <div>{value}</div>
      </Li>
    </>
  );
}