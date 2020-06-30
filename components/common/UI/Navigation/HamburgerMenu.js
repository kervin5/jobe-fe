import React from "react";
import styled from "styled-components";

const StyledHamburgerMenu = styled.div`
  &.HamburgerMenu {
    position: ${props => props.position ?? "fixed"};
    top: 12px;
    right: 20px;
    z-index: 1000;
    margin: 0 10px;
    display: flex;
    flex-direction: column;
    cursor: pointer;

    span {
      display: block;
      width: 35px;
      height: 4px;
      background-color: ${props => props.theme.accentColor2};
      border-radius: 5px;
      margin-bottom: 5px;
      transition: 200ms;
    }

    @media (min-width: 900px) {
      display: ${props => (props.visible ? "inline-block" : "none")};
    }

    &.Open {
      span {
        &:nth-child(2) {
          transform: rotate(45deg) scale(0.6);
        }

        &:nth-child(1) {
          transform: rotate(135deg) translate(8px, -5px) scale(0.6);
        }

        &:nth-child(3) {
          display: none;
        }
      }
    }
  }
`;

const HamburgerMenu = ({ open, onChange, visible, position, onClick }) => {
  const handleClick = e => {
    e.preventDefault();
    if (onChange) {
      onChange(!open);
    }
  };

  return (
    <StyledHamburgerMenu
      className={"HamburgerMenu " + (open ? "Open" : "")}
      onClick={onClick ?? handleClick}
      visible={visible}
      position={position}
    >
      <span />
      <span />
      <span />
    </StyledHamburgerMenu>
  );
};

export default HamburgerMenu;
