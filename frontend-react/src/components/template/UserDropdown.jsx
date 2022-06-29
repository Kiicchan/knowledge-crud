import React from 'react'
import styled from 'styled-components'
import Gravatar from 'react-gravatar'
import { setAuth } from '../../store/slices/userSlice'
import { useDispatch } from 'react-redux'
import { userKey } from '../../global'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Dropdown = styled.div`
  height: 100%;
  position: relative;

  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`
const DropdownButton = styled.div`
  display: flex;
  align-items: center;
  color: #fff;
  font-weight: 100;
  height: 100%;
  padding: 0px 20px;
  gap: 10px;

  /* span {
    @media (max-width: 576px) {
      display: none;
    }
  } */

  & img {
    max-width: 37px;
    max-height: 37px;
    border-radius: 5px;
  }
`

const DropdownContent = styled.div`
  position: absolute;
  right: 0px;
  background-color: #f9f9f9;
  min-width: 170px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 10px;
  z-index: 1;

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  visibility: hidden;
  opacity: 0;
  transition: visibility 0s, opacity 0.5s linear;

  ${Dropdown}:hover & {
    visibility: visible;
    opacity: 1;
  }

  a {
    text-decoration: none;
    color: #000;
    padding: 10px;
    cursor: pointer;
    &:hover {
      background-color: #ededed;
    }
  }
`

export default function UserDropdown() {
  const { name, email, admin } = useSelector((state) => state.user.info)
  const dispatch = useDispatch()
  function logout() {
    dispatch(setAuth(null))
    localStorage.removeItem(userKey)
  }
  return (
    <Dropdown>
      <DropdownButton>
        <span className="d-none d-sm-block">{name}</span>
        <Gravatar email={email} alt="User" />
        <i className="fa fa-angle-down"></i>
      </DropdownButton>
      <DropdownContent>
        {admin && (
          <Link to={'/admin'}>
            <i className="fa fa-cogs"></i> Administração
          </Link>
        )}
        <Link to={'/auth'} onClick={logout}>
          <i className="fa fa-sign-out"></i> Sair
        </Link>
      </DropdownContent>
    </Dropdown>
  )
}
