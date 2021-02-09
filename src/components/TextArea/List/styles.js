import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  top: 15.333px;
  left: 0;
  width: 100px;
  background-color: rgba(20, 20, 20, 1);
  z-index: 9;
`;

export const Option = styled.div`
  padding: 5px 10px;
  color: #abb2bf;
  user-select: none;

  &:hover {
    cursor: pointer;
    background-color: #242424;
  }
`;
