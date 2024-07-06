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

  & input:checked + div {
    text-decoration: line-through;
  }
`;

const Form = styled.form`
  & input {
    min-width: 450px;
    padding: 10px;
    border-radius: 6px;
    border: 1px solid #aaa;
    margin-right: 20px;
    font-size: 20px;
    line-height: 30px;
  }
`;

const Button = styled.button`
  min-width: 100px;
  padding: 10px 20px;
  border-radius: 6px;
  border: none;
  background-color: #22a;
  color: #fff;
  font-size: 20px;
  line-height: 30px;
  cursor: pointer;
  transition: all 200ms ease-in-out;

  &:hover {
    background-color: #008;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 25px;
  right: 25px;  
  width: 40px;
  height: 40px;
  padding: 10px 0;
  border-radius: 6px;
  border: none;
  background-color: #aaa;
  color: #000;
  font-size: 20px;
  line-height: 20px;
  text-align: center;
  cursor: pointer;
  transition: all 200ms ease-in-out;

  &:hover {
    background-color: #999;
  }
`;

const DialogWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 2;
  cursor: pointer;
`;

const DialogModal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  padding: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 700px;
  height: 250px;
  z-index: 3;
  background-color: #99d;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgb(38 44 64 / 10%);
  cursor: auto;
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
        <Dialog onSubmitDialog={onTaskAdded} />
      </div>
    </div>
  );
}

function Dialog({ onSubmitDialog }) {
  const [isVisible, setVisible] = useState(false);

  const handleOpen = () => {
    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
  };

  const onSubmitForm = (value) => {
    handleClose();
    onSubmitDialog(value);
  };

  return (
    <div>
      <Button onClick={handleOpen}>Добавить дело</Button>
      <DialogWrapper onClick={handleClose} style={{display: isVisible ? 'block' : 'none'}}>
        <DialogModal onClick={(e) => e.stopPropagation()}>
          <CloseButton onClick={handleClose}>x</CloseButton>
          <AddForm onSubmit={onSubmitForm} />
        </DialogModal>
      </DialogWrapper>
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
      <Button type='submit'>Добавить</Button>
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