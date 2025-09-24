import React from "react";
import styled from "styled-components";

const StyledFooter = styled.footer`
  background-color: #333;
  bottom: 0;
  color: #fff;
  font-size: 14px;
  height: 36px;
  left: 0;
  line-height: 36px;
  padding: 0 16px;
  position: fixed;
  right: 0;
  text-align: right;
`;

const Copyright = styled.a`
  color: inherit;
`;

export const Footer = () => (
  <StyledFooter>
    &copy; 2025{" "}
    <Copyright
      href="https://iixchzsb7i.feishu.cn/wiki/Otndwji7mix3cukOktGcNzVZnbg"
      target="_blank"
      rel="noreferrer noopener"
    >
      回响笔记
    </Copyright>
  </StyledFooter>
);
