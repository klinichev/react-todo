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

export default function CheckList({ tasks, onChangeIsDone }) {
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