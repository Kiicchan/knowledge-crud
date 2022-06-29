import React from 'react'
import styled from 'styled-components'
import UserDropdown from './UserDropdown'
import { useSelector, useDispatch } from 'react-redux'
import { toggleMenu } from '../../store/slices/menuSlice'
import { Link } from 'react-router-dom'

const StyledHeader = styled.header`
  grid-area: header;
  background: linear-gradient(to right, #1e469a, #49a7c1);

  display: flex;
  justify-content: center;
  align-items: center;
`
const IconButton = styled.a`
  width: 60px;
  height: 100%;
  color: #fff;
  justify-self: flex-start;
  text-decoration: none;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`

const Title = styled.h1`
  font-size: 1.2rem;
  color: #fff;
  font-weight: 100;
  flex-grow: 1;
  text-align: center;

  a {
    color: #fff;
    text-decoration: none;
  }
`

export default function Header(props) {
  const isMenuVisible = useSelector((state) => state.menu.isMenuVisible)
  const user = useSelector((state) => state.user.info)
  const dispatch = useDispatch()

  return (
    <StyledHeader>
      {user && (
        <IconButton className="toggle" onClick={() => dispatch(toggleMenu())}>
          <i
            className={`fa fa-lg fa-angle-${
              isMenuVisible ? 'left' : 'down'
            }`}></i>
        </IconButton>
      )}
      <Title>
        <Link to={'/'}>{props.title}</Link>
      </Title>
      {user && <UserDropdown />}
    </StyledHeader>
  )
}
