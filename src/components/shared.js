import styled from "styled-components";

export const BaseBox = styled.div`
  background-color: ${(props) => props.theme.bgColor};
  border: 1px solid ${(props) => props.theme.borderColor};
  width: 100%;
`;

export const FatLink = styled.span`
  font-weight: 600;
  color: rgb(142, 142, 142);
`;

const StyledNotification = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  padding: 20px;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  font-weight: 600;
  background-color: #2ecc71;
  color: ${(props) => props.theme.mudColor};
`;
export const Notification = ({ children }) => (
  <StyledNotification>{children}</StyledNotification>
);

export const FatText = styled.span`
  font-weight: 600;
`;
