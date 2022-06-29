import React, { useState, useMemo } from 'react'
import useObjectState from '../../hooks/useObjectState'
import useLoadData from '../../hooks/useLoadData'
import axios from 'axios'
import { baseApiUrl, showError, showSuccess } from '../../global'
import Table from '../utils/DataTable'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import FormGroup from '../utils/FormGroupControl'

export default function UserAdmin() {
  const [users, loadUsers] = useLoadData('/users')
  const [validated, setValidated] = useState(false)
  const [mode, setMode] = useState('save')
  const initialUser = {
    id: undefined,
    admin: false,
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  }
  const [user, setUser] = useObjectState(initialUser)

  const fields = useMemo(() => {
    const loadUser = (user, mode = 'save') => {
      setMode(mode)
      setUser({ ...user })
    }
    return [
      { key: 'id', label: 'Código', sortable: true },
      { key: 'name', label: 'Nome', sortable: true },
      { key: 'email', label: 'E-mail', sortable: true },
      {
        key: 'admin',
        label: 'Administrador',
        sortable: true,
        formatter: (item) => (item['admin'] ? 'Sim' : 'Não'),
      },
      {
        key: 'actions',
        label: 'Ações',
        formatter: (item) => (
          <div className="d-flex gap-2 flex-wrap">
            <Button variant="warning" onClick={() => loadUser(item)}>
              <i className="fa fa-pencil"></i>
            </Button>
            <Button variant="danger" onClick={() => loadUser(item, 'remove')}>
              <i className="fa fa-trash"></i>
            </Button>
          </div>
        ),
      },
    ]
    // eslint-disable-next-line
  }, [])

  const reset = () => {
    setMode('save')
    setUser(initialUser)
    setValidated(false)
  }

  const submit = () => {
    setValidated(true)
    const method = mode === 'remove' ? 'delete' : user.id ? 'put' : 'post'
    const id = user.id ? `/${user.id}` : ''
    axios[method](`${baseApiUrl}/users${id}`, user)
      .then(() => {
        showSuccess()
        reset()
        loadUsers()
      })
      .catch(showError)
  }

  return (
    <div>
      <Form
        noValidate
        onSubmit={(e) => {
          e.preventDefault()
          submit()
        }}
        onReset={(e) => {
          e.preventDefault()
          reset()
        }}
        validated={validated}
        className="d-grid gap-3">
        <input type="hidden" id="user-id" value={user.id || ''} />
        <Row>
          <FormGroup
            as={Col}
            md={6}
            sm={12}
            controlId="user-name"
            required
            type="text"
            label="Nome:"
            placeholder="Informe o Nome do Usuário..."
            value={user.name}
            readOnly={mode === 'remove'}
            onChange={(e) => setUser({ name: e.target.value })}
          />
          <FormGroup
            as={Col}
            md={6}
            sm={12}
            controlId="user-email"
            required
            type="email"
            label="E-mail:"
            placeholder="Informe o E-mail do Usuário..."
            value={user.email}
            readOnly={mode === 'remove'}
            onChange={(e) => setUser({ email: e.target.value })}
          />
        </Row>
        {mode === 'save' && (
          <>
            <Form.Check
              id="user-admin"
              type="checkbox"
              label="Administrador?"
              checked={user.admin}
              onChange={(e) => setUser({ admin: e.currentTarget.checked })}
            />
            <Row>
              <FormGroup
                as={Col}
                md={6}
                sm={12}
                controlId="user-password"
                required
                type="password"
                label="Senha:"
                placeholder="Informe a Senha do Usuário..."
                value={user.password}
                onChange={(e) => setUser({ password: e.target.value })}
              />
              <FormGroup
                as={Col}
                md={6}
                sm={12}
                controlId="user-password-confirmation"
                required
                type="password"
                label="Confirmação de Senha:"
                placeholder="Confirme a Senha..."
                value={user.confirmPassword}
                onChange={(e) => setUser({ confirmPassword: e.target.value })}
              />
            </Row>
          </>
        )}
        <Row>
          <Col xs={12} className="d-flex gap-2">
            {mode === 'save' ? (
              <Button variant="primary" type="submit">
                Salvar
              </Button>
            ) : (
              <Button variant="danger" type="submit">
                Excluir
              </Button>
            )}
            <Button variant="secondary" type="reset">
              Cancelar
            </Button>
          </Col>
        </Row>
      </Form>
      <hr />
      <Table hover striped responsive items={users} fields={fields} />
    </div>
  )
}
