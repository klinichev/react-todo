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

export const CloseButton = styled.button`
  position: absolute;
  top: 25px;
  right: 25px;  
  width: 40px;
  height: 40px;
  padding: 10px 0;
  border-radius: 6px;
  border: 1px solid #000;
  background-color: #eee;
  color: #000;
  font-size: 20px;
  line-height: 20px;
  text-align: center;
  cursor: pointer;
  transition: all 200ms ease-in-out;

  &:hover {
    background-color: #ddd;
  }

  &::before, 
  &::after {
    position: absolute;
    content: '';
    width: 15px;
    height: 2px;
    left: 12px;
    top: 18px;
    background-color: #000;
    transform: rotate(45deg) scaleY(.6);
  }

  &::after {
    transform: rotate(-45deg) scaleY(.6);
  }
`;

export const DialogWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 2;
  cursor: pointer;
`;

export const DialogModal = styled.div`
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
  background-color: #eee;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgb(38 44 64 / 10%);
  cursor: auto;
`;