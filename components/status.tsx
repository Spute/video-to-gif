import styled from "styled-components";
import React from "react";

const Wrapper = styled.div`
  text-align: center;
  font-size: 24px;
  color: coral;
`;

const ConvertingWrapper = styled.div`
  font-size: 32px;
  font-weight: bold;
  color: coral;
  background-color: rgba(255, 255, 255, 0.7);
  padding: 20px 40px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
`;

interface Props {
  children: string | null;
}

export const Status: React.FC<Props> = (props) => {
  const { children } = props;

  if (children == null) {
    return null;
  }

  if (children === "Converting...") {
    return <ConvertingWrapper>{children}</ConvertingWrapper>;
  }

  return <Wrapper>Status: {children}</Wrapper>;
};
