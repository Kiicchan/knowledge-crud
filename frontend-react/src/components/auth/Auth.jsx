import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setAuth } from '../../store/slices/userSlice'
import Logo from '../../assets/logo.png'
import styled from 'styled-components'
import useObjectState from '../../hooks/useObjectState'
import { baseApiUrl, showError, showSuccess, userKey } from '../../global'

function Auth({ className }) {
  const [showSignup, setShowSignup] = useState(false)
  const initialUser = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  }
  const [user, setUser] = useObjectState(initialUser)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  function signUp() {
    axios
      .post(`${baseApiUrl}/signup`, user)
      .then(() => {
        setUser(initialUser)
        setShowSignup(false)
        showSuccess()
      })
      .catch(showError)
  }
  function signIn() {
    axios
      .post(`${baseApiUrl}/signin`, user)
      .then((res) => {
        dispatch(setAuth(res.data))
        localStorage.setItem(userKey, JSON.stringify(res.data))
        navigate('/')
      })
      .catch(showError)
  }
  return (
    <div className={className}>
      <div className="auth-modal">
        <img src={Logo} alt="Logo" width="200" />
        <hr />
        <div className="auth-title">{showSignup ? 'Cadastro' : 'Login'}</div>
        {showSignup && (
          <input
            type="text"
            value={user.name}
            placeholder="Nome"
            name="name"
            onChange={(e) => setUser({ name: e.target.value })}
          />
        )}
        <input
          type="email"
          value={user.email}
          placeholder="E-mail"
          name="email"
          onChange={(e) => setUser({ email: e.target.value })}
        />
        <input
          type="password"
          value={user.password}
          placeholder="Senha"
          name="password"
          onChange={(e) => setUser({ password: e.target.value })}
        />
        {showSignup && (
          <input
            type="password"
            value={user.confirmPassword}
            placeholder="Confirme a senha"
            onChange={(e) => setUser({ confirmPassword: e.target.value })}
          />
        )}
        {showSignup ? (
          <button onClick={signUp}>Registrar</button>
        ) : (
          <button onClick={signIn}>Entrar</button>
        )}
        <a
          href="./auth"
          onClick={(e) => {
            e.preventDefault()
            setShowSignup((state) => !state)
          }}>
          {showSignup ? (
            <span>Já tem cadastro? Acesse o Login!</span>
          ) : (
            <span>Não tem Cadastro? Registre-se aqui!</span>
          )}
        </a>
      </div>
    </div>
  )
}

export default styled(Auth)`
  & {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .auth-modal {
    background-color: #fff;
    width: 350px;
    padding: 35px;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);

    display: flex;
    flex-direction: column;
    align-items: center;

    input {
      border: 1px solid #bbb;
      width: 100%;
      margin-bottom: 15px;
      padding: 3px 8px;
      outline: none;
    }
    button {
      align-self: flex-end;
      background-color: #2460ae;
      color: #fff;
      padding: 5px 15px;
    }
    a {
      margin-top: 35px;
      text-decoration: none;
    }
    hr {
      border: 0;
      width: 100%;
      height: 1px;
      background-image: linear-gradient(
        to right,
        rgba(120, 120, 120, 0),
        rgba(120, 120, 120, 0.75),
        rgba(120, 120, 120, 0)
      );
    }
  }

  .auth-title {
    font-size: 1.2rem;
    font-weight: 100;
    margin-top: 10px;
    margin-bottom: 15px;
  }
`
