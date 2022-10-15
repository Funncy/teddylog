import React from 'react';
import styled from 'styled-components';

const NavItem = styled.div<{ active: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-right: 20px;
  padding-left: 20px;
  margin-right: 20px;
  margin-left: 20px;
  cursor: pointer;
  //color: #9c9c9c;
  color: ${(props) => (props.active === true ? '#6787ff' : '#9c9c9c')};
`;

interface IBottomNavItem {
  children: JSX.Element[];
  active: boolean;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

function BottomNavItem({ children, active, onClick }: IBottomNavItem) {
  return (
    <NavItem active={active} onClick={onClick}>
      {children}
    </NavItem>
  );
}

export default BottomNavItem;
