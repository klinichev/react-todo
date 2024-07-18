import styled from 'styled-components';

export const Button = styled.button`
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

export const Form = styled.form`
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