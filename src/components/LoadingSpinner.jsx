import React from "react";
import { PacmanLoader } from "react-spinners";
import styled from "styled-components";

export default function LoadingSpinner({ comment }) {
  return (
    <Loading>
      <PacmanLoader />
      {comment}
    </Loading>
  );
}

const Loading = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
  font-size: 22px;
  text-align: center;
`;
