import styled from 'styled-components';

export const Ul = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 30px;
  font-size: 20px;
  line-height: 30px;
`;

export const Li = styled.li`
  display: flex;

  & input {
    margin-right: 10px;
  }

  & input:checked + div {
    text-decoration: line-through;
  }
`;